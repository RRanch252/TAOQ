#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const slugify = require('slugify');
const { format } = require('date-fns');

async function createContent() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Content type:',
            choices: ['book', 'essay', 'note', 'guide']
        },
        {
            type: 'input',
            name: 'title',
            message: 'Title:',
            validate: input => input.length > 0 || 'Title is required'
        },
        {
            type: 'input',
            name: 'author',
            message: 'Author (if book):',
            when: answers => answers.type === 'book'
        },
        {
            type: 'input',
            name: 'tags',
            message: 'Tags (comma-separated):',
            filter: input => input.split(',').map(tag => tag.trim()).filter(Boolean)
        },
        {
            type: 'input',
            name: 'excerpt',
            message: 'Brief excerpt/description:'
        }
    ]);

    const date = format(new Date(), 'yyyy-MM-dd');
    const slug = slugify(answers.title, { lower: true, strict: true });
    const filename = `${date}-${slug}.md`;
    const filepath = path.join('content', `${answers.type}s`, filename);

    const frontMatter = `---
title: "${answers.title}"${answers.author ? `
author: "${answers.author}"` : ''}
type: "${answers.type}"
date: ${date}
tags: ${JSON.stringify(answers.tags)}
status: "draft"
excerpt: "${answers.excerpt}"
reading_time: 0
---

# ${answers.title}${answers.author ? ` — ${answers.author}` : ''}

## ${answers.type === 'book' ? 'Summary' : 'Overview'}

[Start writing here...]

## Key Points

- Point 1
- Point 2
- Point 3

## ${answers.type === 'book' ? 'Notable Quotes' : 'Thoughts'}

> Quote or thought here

## ${answers.type === 'book' ? 'Personal Reflections' : 'Conclusion'}

[Your reflections or conclusion]

## Related Reading

- [[Related Item 1]]
- [[Related Item 2]]
`;

    // Ensure directory exists
    await fs.ensureDir(path.dirname(filepath));
    
    // Write file
    await fs.writeFile(filepath, frontMatter);
    
    console.log(`\n✅ Created: ${filepath}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit the file: ${filepath}`);
    console.log(`2. Change status to "published" when ready`);
    console.log(`3. Run "npm run build" to update the site`);
}

// Run if called directly
if (require.main === module) {
    createContent().catch(console.error);
}

module.exports = createContent;

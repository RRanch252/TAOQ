const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');

async function generateIndex() {
    console.log('📚 Generating content index...');
    
    const contentDir = './content';
    const outputDir = './public/data';
    const types = ['books', 'essays', 'notes', 'guides'];
    const contentIndex = [];
    
    // Ensure output directory exists
    await fs.ensureDir(outputDir);
    
    // Process each content type
    for (const type of types) {
        const dir = path.join(contentDir, type);
        
        if (!await fs.pathExists(dir)) {
            continue;
        }
        
        const files = await fs.readdir(dir);
        
        for (const file of files) {
            if (!file.endsWith('.md')) continue;
            
            const filepath = path.join(dir, file);
            const content = await fs.readFile(filepath, 'utf-8');
            const { data } = matter(content);
            
            // Skip drafts
            if (data.status !== 'published') continue;
            
            contentIndex.push({
                title: data.title,
                author: data.author || null,
                type: type.slice(0, -1),
                date: data.date,
                tags: data.tags || [],
                excerpt: data.excerpt || '',
                reading_time: data.reading_time || 5,
                url: generateUrl(data.title, type)
            });
        }
    }
    
    // Sort by date
    contentIndex.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Generate tag counts
    const tagCounts = {};
    contentIndex.forEach(item => {
        item.tags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
    });
    
    // Write index file
    const indexData = {
        documents: contentIndex,
        tags: tagCounts,
        total: contentIndex.length,
        generated: new Date().toISOString()
    };
    
    await fs.writeJson(
        path.join(outputDir, 'content-index.json'),
        indexData,
        { spaces: 2 }
    );
    
    console.log(`✅ Generated index with ${contentIndex.length} items`);
}

function generateUrl(title, type) {
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return `/${type}/${slug}/`;
}

// Run if called directly
if (require.main === module) {
    generateIndex().catch(console.error);
}

module.exports = generateIndex;

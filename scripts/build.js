const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const matter = require('gray-matter');

class SiteBuilder {
    constructor() {
        this.srcDir = './src';
        this.contentDir = './content';
        this.outputDir = './public';
        this.contentIndex = [];
    }

    async build() {
        console.log('🏗️  Building site...');
        
        // Clean output directory
        await fs.emptyDir(this.outputDir);
        
        // Copy static files
        await this.copyStaticFiles();
        
        // Process content files
        await this.processContent();
        
        // Generate content index
        await this.generateContentIndex();
        
        console.log('✅ Build complete!');
    }

    async copyStaticFiles() {
        // Copy HTML
        await fs.copy(
            path.join(this.srcDir, 'index.html'),
            path.join(this.outputDir, 'index.html')
        );
        
        // Copy CSS
        await fs.ensureDir(path.join(this.outputDir, 'css'));
        await fs.copy(
            path.join(this.srcDir, 'css'),
            path.join(this.outputDir, 'css')
        );
        
        // Copy JS
        await fs.ensureDir(path.join(this.outputDir, 'js'));
        await fs.copy(
            path.join(this.srcDir, 'js'),
            path.join(this.outputDir, 'js')
        );
    }

    async processContent() {
        const types = ['books', 'essays', 'notes', 'guides'];
        
        for (const type of types) {
            const dir = path.join(this.contentDir, type);
            
            // Check if directory exists
            if (!await fs.pathExists(dir)) {
                console.log(`Creating ${dir} directory...`);
                await fs.ensureDir(dir);
                continue;
            }
            
            const files = await fs.readdir(dir);
            
            for (const file of files) {
                if (file.endsWith('.md')) {
                    await this.processMarkdownFile(path.join(dir, file), type);
                }
            }
        }
    }

    async processMarkdownFile(filepath, type) {
        const content = await fs.readFile(filepath, 'utf-8');
        const { data, content: markdown } = matter(content);
        
        // Skip drafts
        if (data.status !== 'published') return;
        
        // Convert markdown to HTML
        const html = marked.parse(markdown);
        
        // Add to content index
        this.contentIndex.push({
            title: data.title,
            type: type.slice(0, -1), // Remove 's'
            date: data.date,
            tags: data.tags || [],
            excerpt: data.excerpt || '',
            url: this.generateUrl(data.title, type)
        });
        
        // For now, just build the index
        // In a full implementation, you'd generate individual HTML pages
    }

    generateUrl(title, type) {
        const slug = title.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
        return `/${type}/${slug}/`;
    }

    async generateContentIndex() {
        const indexPath = path.join(this.outputDir, 'data');
        await fs.ensureDir(indexPath);
        
        // Sort by date
        this.contentIndex.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        );
        
        // Generate tag counts
        const tags = {};
        this.contentIndex.forEach(item => {
            item.tags.forEach(tag => {
                tags[tag] = (tags[tag] || 0) + 1;
            });
        });
        
        await fs.writeJson(
            path.join(indexPath, 'content-index.json'),
            {
                documents: this.contentIndex,
                tags: tags,
                generated: new Date().toISOString()
            },
            { spaces: 2 }
        );
    }
}

// Run build
if (require.main === module) {
    new SiteBuilder().build().catch(console.error);
}

module.exports = SiteBuilder;

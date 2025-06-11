// Main JavaScript file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize content loading
    loadContent();
    
    // Navigation filtering
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter content
            const filter = link.dataset.filter;
            if (filter && filter !== 'all') {
                filterContent(filter);
            } else if (filter === 'all') {
                showAllContent();
            }
        });
    });
});

async function loadContent() {
    try {
        const response = await fetch('/data/content-index.json');
        const data = await response.json();
        
        displayContent(data.documents);
        buildTagCloud(data.tags);
        updateCount(data.documents.length);
    } catch (error) {
        console.error('Failed to load content:', error);
        // For development, use sample data
        displaySampleContent();
    }
}

function displayContent(documents) {
    const contentList = document.getElementById('contentList');
    const html = documents.map(doc => `
        <li class="content-item" data-type="${doc.type}" data-tags="${doc.tags.join(',')}">
            <a href="${doc.url}" class="content-link">
                <h3 class="content-title">${doc.title}</h3>
                <div class="content-meta">
                    <span class="content-category">${doc.type}</span>
                    <span class="content-date">${formatDate(doc.date)}</span>
                </div>
            </a>
        </li>
    `).join('');
    
    contentList.innerHTML = html;
}

function displaySampleContent() {
    const sampleContent = [
        {
            title: "Thinking in Systems — Donella Meadows",
            type: "book",
            date: "2024-01-15",
            url: "/books/thinking-in-systems/",
            tags: ["systems-thinking", "complexity"]
        },
        {
            title: "The Architecture of Written Thought",
            type: "essay",
            date: "2024-01-20",
            url: "/essays/architecture-of-thought/",
            tags: ["writing", "thinking"]
        },
        {
            title: "Spaced Repetition and the Forgetting Curve",
            type: "note",
            date: "2023-12-10",
            url: "/notes/spaced-repetition/",
            tags: ["learning", "memory"]
        },
        {
            title: "Building a Personal Knowledge Management System",
            type: "guide",
            date: "2023-11-15",
            url: "/guides/pkm-system/",
            tags: ["productivity", "tools"]
        }
    ];
    
    displayContent(sampleContent);
    updateCount(sampleContent.length);
}

function buildTagCloud(tags) {
    const tagCloud = document.getElementById('tagCloud');
    if (!tags) return;
    
    const html = Object.entries(tags)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([tag, count]) => `
            <a href="#" class="tag" data-tag="${tag}">
                ${tag} <span class="tag-count">${count}</span>
            </a>
        `).join('');
    
    tagCloud.innerHTML = html;
}

function filterContent(type) {
    const items = document.querySelectorAll('.content-item');
    items.forEach(item => {
        if (item.dataset.type === type) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
    
    updateCount();
}

function showAllContent() {
    const items = document.querySelectorAll('.content-item');
    items.forEach(item => {
        item.style.display = 'block';
    });
    
    updateCount();
}

function updateCount(count) {
    const countElement = document.querySelector('.section-count');
    if (count !== undefined) {
        countElement.textContent = `${count} items`;
    } else {
        const visibleItems = document.querySelectorAll('.content-item:not([style*="display: none"])');
        countElement.textContent = `${visibleItems.length} items`;
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Focus search with '/'
    if (e.key === '/' && document.activeElement !== document.getElementById('searchInput')) {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
});

// Search functionality
class ContentSearch {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.contentItems = [];
        this.init();
    }

    init() {
        this.searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        
        // Store content items for searching
        setTimeout(() => {
            this.contentItems = Array.from(document.querySelectorAll('.content-item'));
        }, 500);
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase().trim();
        
        if (query === '') {
            this.showAllItems();
            return;
        }

        this.filterItems(query);
    }

    filterItems(query) {
        this.contentItems.forEach(item => {
            const title = item.querySelector('.content-title').textContent.toLowerCase();
            const type = item.dataset.type;
            const tags = item.dataset.tags;
            
            const matches = title.includes(query) || 
                           type.includes(query) || 
                           tags.includes(query);
            
            item.style.display = matches ? 'block' : 'none';
        });

        this.updateCount();
    }

    showAllItems() {
        this.contentItems.forEach(item => {
            item.style.display = 'block';
        });
        this.updateCount();
    }

    updateCount() {
        const visibleItems = this.contentItems.filter(item => 
            item.style.display !== 'none'
        );
        
        const countElement = document.querySelector('.section-count');
        countElement.textContent = `${visibleItems.length} items`;
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ContentSearch();
});

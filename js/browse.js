document.addEventListener('DOMContentLoaded', function() {
    // Filter Functionality
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const clearFiltersBtn = document.querySelector('.clear-filters');
    const filterOptions = document.querySelectorAll('.filter-option input');
    const priceRange = document.getElementById('price-range');
    
    if (applyFiltersBtn && clearFiltersBtn) {
        // Apply filters
        applyFiltersBtn.addEventListener('click', function() {
            // In a real application, this would filter the results based on selected options
            // For now, we'll just show a notification
            showNotification('Filters applied successfully!', 'success');
            
            // Simulate loading
            simulateLoading();
        });
        
        // Clear filters
        clearFiltersBtn.addEventListener('click', function() {
            // Reset all checkboxes
            filterOptions.forEach(option => {
                option.checked = false;
            });
            
            // Reset price range
            if (priceRange) {
                priceRange.value = 1000;
                document.getElementById('price-value').textContent = '₹1000';
            }
            
            showNotification('Filters cleared!', 'info');
            
            // Simulate loading
            simulateLoading();
        });
    }
    
    // Sorting Functionality
    const sortSelect = document.getElementById('sort-by');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            // In a real application, this would sort the results based on the selected option
            // For now, we'll just show a notification
            showNotification(`Sorting by ${this.options[this.selectedIndex].text}`, 'info');
            
            // Simulate loading
            simulateLoading();
        });
    }
    
    // Pagination Functionality
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const pageLinks = document.querySelectorAll('.page-numbers a');
    
    if (paginationBtns.length > 0 && pageLinks.length > 0) {
        // Previous and Next buttons
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Get current active page
                const activePage = document.querySelector('.page-numbers a.active');
                const currentPage = parseInt(activePage.textContent);
                
                // Determine new page
                let newPage;
                if (this.classList.contains('prev')) {
                    newPage = Math.max(1, currentPage - 1);
                } else {
                    newPage = Math.min(8, currentPage + 1); // Assuming 8 is the max page
                }
                
                // Update active page
                pageLinks.forEach(link => {
                    if (parseInt(link.textContent) === newPage) {
                        activePage.classList.remove('active');
                        link.classList.add('active');
                    }
                });
                
                // Simulate loading
                simulateLoading();
            });
        });
        
        // Page number links
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from current active page
                document.querySelector('.page-numbers a.active').classList.remove('active');
                
                // Add active class to clicked page
                this.classList.add('active');
                
                // Simulate loading
                simulateLoading();
            });
        });
    }
    
    // Helper Functions
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', `notification-${type}`);
        notification.textContent = message;
        
        // Add to document
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function simulateLoading() {
        // Add loading class to results
        const results = document.querySelector('.results');
        if (results) {
            results.classList.add('loading');
            
            // Remove loading class after 1 second
            setTimeout(() => {
                results.classList.remove('loading');
            }, 1000);
        }
    }
    
    // Add CSS for notifications and loading
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 4px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            background-color: var(--success-color);
        }
        
        .notification-info {
            background-color: var(--primary-color);
        }
        
        .notification-error {
            background-color: var(--danger-color);
        }
        
        .results.loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        .page-numbers a {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            background-color: white;
            color: var(--text-color);
            font-weight: 500;
            transition: var(--transition);
        }
        
        .page-numbers a:hover, .page-numbers a.active {
            background-color: var(--primary-color);
            color: white;
        }
    `;
    document.head.appendChild(style);
});
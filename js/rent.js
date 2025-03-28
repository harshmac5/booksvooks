document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion Functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.fa-chevron-down');
        
        // Initially hide all answers
        answer.style.maxHeight = '0';
        answer.style.opacity = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'all 0.3s ease';
        
        question.addEventListener('click', function() {
            // Toggle current item
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                faqItem.querySelector('.faq-answer').style.maxHeight = '0';
                faqItem.querySelector('.faq-answer').style.opacity = '0';
                faqItem.querySelector('.fa-chevron-down').style.transform = 'rotate(0deg)';
            });
            
            // Open current item if it was not active
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.opacity = '1';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
    
    // Search Functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = this.value.trim().toLowerCase();
                if (searchTerm) {
                    // In a real application, this would search the database
                    // For now, we'll just redirect to the browse page with a search parameter
                    window.location.href = `browse.html?search=${encodeURIComponent(searchTerm)}&type=rent`;
                }
            }
        });
    }
    
    // Rental Period Selection (for the "Extend Rental" functionality)
    const extendRentalBtns = document.querySelectorAll('.btn-primary');
    
    extendRentalBtns.forEach(btn => {
        if (btn.textContent === 'Extend Rental') {
            btn.addEventListener('click', function() {
                // In a real application, this would open a modal to select extension period
                // For now, we'll just show an alert
                alert('This feature will allow you to extend your rental period. Coming soon!');
            });
        }
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .faq-question {
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 20px;
            background-color: white;
            border-radius: var(--border-radius);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .faq-question:hover {
            background-color: #f9fafb;
        }
        
        .faq-question h3 {
            margin: 0;
            font-size: 1.1rem;
        }
        
        .faq-question i {
            transition: transform 0.3s ease;
        }
        
        .faq-answer {
            padding: 0 20px;
            background-color: white;
            border-radius: 0 0 var(--border-radius) var(--border-radius);
            margin-top: -5px;
            margin-bottom: 15px;
        }
        
        .faq-item.active .faq-question {
            background-color: #eff6ff;
            color: var(--primary-color);
            border-radius: var(--border-radius) var(--border-radius) 0 0;
        }
    `;
    document.head.appendChild(style);
});
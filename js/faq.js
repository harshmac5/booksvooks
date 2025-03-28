document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
    
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Show all items if "all" category is selected
            if (category === 'all') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                // Show only items matching the selected category
                faqItems.forEach(item => {
                    if (item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('faqSearch');
    const searchButton = document.querySelector('.faq-search button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // If search is empty, reset to show all based on current category
            const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
            
            if (activeCategory === 'all') {
                faqItems.forEach(item => {
                    item.style.display = 'block';
                });
            } else {
                faqItems.forEach(item => {
                    if (item.getAttribute('data-category') === activeCategory) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
            return;
        }
        
        // Search in questions and answers
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question span').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
                // Highlight the search term (optional)
                // This is a simple implementation - you might want to use a library for better highlighting
                const questionSpan = item.querySelector('.faq-question span');
                const answerP = item.querySelector('.faq-answer p');
                
                // Reset any previous highlighting
                questionSpan.innerHTML = questionSpan.textContent;
                answerP.innerHTML = answerP.textContent;
                
                // Apply new highlighting
                if (question.includes(searchTerm)) {
                    const regex = new RegExp(searchTerm, 'gi');
                    questionSpan.innerHTML = questionSpan.textContent.replace(regex, match => `<mark>${match}</mark>`);
                }
                
                if (answer.includes(searchTerm)) {
                    const regex = new RegExp(searchTerm, 'gi');
                    answerP.innerHTML = answerP.textContent.replace(regex, match => `<mark>${match}</mark>`);
                }
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    // Feedback system
    const feedbackButtons = document.querySelectorAll('.feedback-yes, .feedback-no');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const feedbackSection = this.parentElement;
            const allButtons = feedbackSection.querySelectorAll('button');
            
            // Remove active class from all buttons
            allButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show thank you message
            const thankYou = document.createElement('span');
            thankYou.textContent = 'Thank you for your feedback!';
            thankYou.style.marginLeft = '10px';
            thankYou.style.color = 'var(--primary-color)';
            
            // Remove any existing thank you message
            const existingThankYou = feedbackSection.querySelector('span:not(:first-child)');
            if (existingThankYou) {
                feedbackSection.removeChild(existingThankYou);
            }
            
            feedbackSection.appendChild(thankYou);
            
            // Here you would typically send this feedback to your server
            console.log('Feedback recorded:', this.classList.contains('feedback-yes') ? 'Helpful' : 'Not helpful');
        });
    });
    
    // Related questions
    const relatedLinks = document.querySelectorAll('.related-question-link');
    
    relatedLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetQuestion = this.getAttribute('data-question');
            
            // Find the matching question
            faqItems.forEach(item => {
                const questionText = item.querySelector('.faq-question span').textContent;
                
                if (questionText === targetQuestion) {
                    // Ensure the item is visible (in case it's filtered out)
                    item.style.display = 'block';
                    
                    // Open the item
                    item.classList.add('active');
                    
                    // Scroll to the item
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Flash effect to highlight the item
                    item.style.backgroundColor = '#f0f9ff';
                    setTimeout(() => {
                        item.style.backgroundColor = '';
                        item.style.transition = 'background-color 1s ease';
                    }, 100);
                }
            });
        });
    });
    
    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});
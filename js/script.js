document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (hamburger.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Book Carousel Functionality
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const bookCarousel = document.querySelector('.book-carousel');
    
    if (prevBtn && nextBtn && bookCarousel) {
        // Set initial position
        let position = 0;
        const cardWidth = 280; // Approximate width of a card including margin
        const visibleCards = Math.floor(bookCarousel.offsetWidth / cardWidth);
        const totalCards = document.querySelectorAll('.book-card').length;
        const maxPosition = Math.max(0, totalCards - visibleCards);
        
        // Update carousel position
        function updateCarousel() {
            bookCarousel.style.transform = `translateX(-${position * cardWidth}px)`;
            
            // Enable/disable buttons based on position
            prevBtn.disabled = position === 0;
            nextBtn.disabled = position >= maxPosition;
            
            // Update button styles
            prevBtn.style.opacity = position === 0 ? '0.5' : '1';
            nextBtn.style.opacity = position >= maxPosition ? '0.5' : '1';
        }
        
        // Initialize carousel
        updateCarousel();
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', function() {
            if (position > 0) {
                position--;
                updateCarousel();
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (position < maxPosition) {
                position++;
                updateCarousel();
            }
        });
        
        // Responsive handling
        window.addEventListener('resize', function() {
            // Recalculate visible cards
            const newVisibleCards = Math.floor(bookCarousel.offsetWidth / cardWidth);
            const newMaxPosition = Math.max(0, totalCards - newVisibleCards);
            
            // Adjust position if needed
            if (position > newMaxPosition) {
                position = newMaxPosition;
            }
            
            // Update carousel
            updateCarousel();
        });
    }
    
    // Scroll Animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .book-card, .step, .testimonial');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Price Range Slider (for browse page)
    const priceRange = document.getElementById('price-range');
    const priceValue = document.getElementById('price-value');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            priceValue.textContent = `₹${this.value}`;
        });
    }
    
    // Sticky Header on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            // Hide header when scrolling down, show when scrolling up
            if (scrollTop > lastScrollTop) {
                header.style.top = '-80px';
            } else {
                header.style.top = '0';
            }
        } else {
            header.classList.remove('sticky');
            header.style.top = '0';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .book-card, .step, .testimonial {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .feature-card.animate, .book-card.animate, .step.animate, .testimonial.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .book-carousel {
            display: flex;
            transition: transform 0.5s ease;
        }
        
        header.sticky {
            background-color: rgba(255, 255, 255, 0.95);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            transition: top 0.3s ease;
        }
    `;
    document.head.appendChild(style);
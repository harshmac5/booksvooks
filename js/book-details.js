document.addEventListener('DOMContentLoaded', function() {
    // Image Gallery Functionality
    function changeImage(src) {
        document.getElementById('main-image').src = src;
        
        // Update active thumbnail
        const thumbnails = document.querySelectorAll('.thumbnail-images img');
        thumbnails.forEach(thumb => {
            thumb.classList.remove('active');
            if (thumb.getAttribute('src') === src) {
                thumb.classList.add('active');
            }
        });
    }
    
    // Make changeImage function available globally
    window.changeImage = changeImage;
    
    // Tabs Functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Price Option Toggle
    const priceOptions = document.querySelectorAll('input[name="price-option"]');
    const rentButton = document.querySelector('.book-actions .btn-primary');
    
    priceOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.id === 'rent-option') {
                rentButton.textContent = 'Rent Now';
            } else if (this.id === 'buy-option') {
                rentButton.textContent = 'Buy Now';
            }
        });
    });
    
    // Wishlist Toggle
    const wishlistBtn = document.querySelector('.btn-icon.wishlist');
    
    if (wishlistBtn) {
        wishlistBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#ef4444';
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
            }
        });
    }
    
    // Share Functionality
    const shareBtn = document.querySelector('.btn-icon.share');
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            // In a real application, this would open a share modal or use the Web Share API
            alert('Share this book with friends!');
        });
    }
    
    // Contact Seller Button
    const contactBtn = document.querySelector('.btn-secondary.btn-lg');
    
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            // In a real application, this would open a messaging interface
            alert('This feature will allow you to message the seller. Coming soon!');
        });
    }
    
    // Add CSS for book details page
    const style = document.createElement('style');
    style.textContent = `
        .book-details-section {
            padding: 60px 0;
        }
        
        .breadcrumbs {
            margin-bottom: 30px;
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .breadcrumbs a {
            color: var(--primary-color);
        }
        
        .book-details-container {
            display: grid;
            grid-template-columns: 350px 1fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        .book-gallery {
            position: relative;
        }
        
        .main-image {
            width: 100%;
            height: 450px;
            border-radius: var(--border-radius);
            overflow: hidden;
            position: relative;
            margin-bottom: 15px;
            box-shadow: var(--box-shadow);
        }
        
        .main-image img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            background-color: white;
        }
        
        .thumbnail-images {
            display: flex;
            gap: 10px;
        }
        
        .thumbnail-images img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: var(--border-radius);
            cursor: pointer;
            border: 2px solid transparent;
            transition: var(--transition);
        }
        
        .thumbnail-images img.active, .thumbnail-images img:hover {
            border-color: var(--primary-color);
        }
        
        .book-info h1 {
            font-size: 2rem;
            margin-bottom: 5px;
        }
        
        .book-author {
            color: #6b7280;
            margin-bottom: 20px;
            font-size: 1.1rem;
        }
        
        .book-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .meta-item {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .book-rating {
            color: var(--accent-color);
            margin-bottom: 25px;
        }
        
        .book-price-options {
            margin-bottom: 25px;
        }
        
        .price-option {
            margin-bottom: 15px;
        }
        
        .price-option input[type="radio"] {
            display: none;
        }
        
        .price-option label {
            display: block;
            padding: 15px;
            border: 2px solid #e5e7eb;
            border-radius: var(--border-radius);
            cursor: pointer;
            transition: var(--transition);
        }
        
        .price-option input[type="radio"]:checked + label {
            border-color: var(--primary-color);
            background-color: rgba(79, 70, 229, 0.05);
        }
        
        .option-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
        }
        
        .option-name {
            font-weight: 600;
            font-size: 1.1rem;
        }
        
        .option-price {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 1.1rem;
        }
        
        .option-details p {
            margin: 5px 0;
            color: #6b7280;
            font-size: 0.9rem;
        }
        
        .book-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .btn-lg {
            padding: 12px 30px;
            font-size: 1rem;
        }
        
        .book-details-tabs {
            margin-bottom: 60px;
        }
        
        .tabs-header {
            display: flex;
            border-bottom: 1px solid #e5e7eb;
            margin-bottom: 25px;
        }
        
        .tab-btn {
            padding: 15px 25px;
            background: none;
            border: none;
            font-family: inherit;
            font-size: 1rem;
            font-weight: 500;
            color: #6b7280;
            cursor: pointer;
            position: relative;
            transition: var(--transition);
        }
        
        .tab-btn:hover {
            color: var(--primary-color);
        }
        
        .tab-btn.active {
            color: var(--primary-color);
        }
        
        .tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: var(--primary-color);
        }
        
        .tab-content {
            display: none;
            padding: 20px 0;
        }
        
        .tab-content.active {
            display: block;
        }
        
        .tab-content h3 {
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .book-topics {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 10px;
            margin-top: 15px;
            padding-left: 20px;
        }
        
        .book-details-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        
        .detail-item {
            display: flex;
            flex-direction: column;
        }
        
        .detail-label {
            font-size: 0.9rem;
            color: #6b7280;
            margin-bottom: 5px;
        }
        
        .detail-value {
            font-weight: 500;
        }
        
        .seller-info {
            background-color: #f9fafb;
            border-radius: var(--border-radius);
            padding: 25px;
            margin-bottom: 30px;
        }
        
        .seller-profile {
            display: flex;
            margin-bottom: 20px;
        }
        
        .seller-profile img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 20px;
        }
        
        .seller-details h3 {
            margin: 0 0 5px;
        }
        
        .seller-institution {
            color: #6b7280;
            margin-bottom: 10px;
        }
        
        .seller-rating {
            color: var(--accent-color);
            margin-bottom: 10px;
        }
        
        .seller-stats {
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .seller-contact {
            display: flex;
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .seller-response {
            display: flex;
            gap: 30px;
        }
        
        .response-stat h4 {
            margin: 0 0 5px;
            font-size: 1.2rem;
            color: var(--primary-color);
        }
        
        .response-stat p {
            margin: 0;
            font-size: 0.9rem;
            color: #6b7280;
        }
        
        .seller-other-books h3 {
            margin-bottom: 20px;
        }
        
        .mini-book-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .mini-book-card {
            background-color: white;
            border-radius: var(--border-radius);
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            transition: var(--transition);
        }
        
        .mini-book-card:hover {
            transform: translateY(-5px);
            box-shadow: var(--box-shadow);
        }
        
        .mini-book-card img {
            width: 100%;
            height: 150px;
            object-fit: cover;
        }
        
        .mini-book-info {
            padding: 10px;
        }
        
        .mini-book-info h4 {
            margin: 0 0 5px;
            font-size: 0.9rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .mini-book-price {
            font-weight: 600;
            color: var(--primary-color);
            margin: 0;
            font-size: 0.9rem;
        }
        
        .reviews-summary {
            display: flex;
            gap: 40px;
            margin-bottom: 30px;
        }
        
        .overall-rating {
            text-align: center;
            min-width: 150px;
        }
        
        .overall-rating h3 {
            font-size: 3rem;
            margin: 0 0 10px;
            color: var(--primary-color);
        }
        
        .stars {
            color: var(--accent-color);
            margin-bottom: 10px;
        }
        
        .rating-breakdown {
            flex-grow: 1;
        }
        
        .rating-bar {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .rating-label {
            width: 60px;
        }
        
        .progress-bar {
            flex-grow: 1;
            height: 8px;
            background-color: #e5e7eb;
            border-radius: 4px;
            margin: 0 15px;
            overflow: hidden;
        }
        
        .progress {
            height: 100%;
            background-color: var(--accent-color);
        }
        
        .rating-count {
            width: 30px;
            text-align: right;
            color: #6b7280;
        }
        
        .reviews-list {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .review-item {
            padding: 20px;
            background-color: #f9fafb;
            border-radius: var(--border-radius);
        }
        
        .reviewer-info {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .reviewer-info img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }
        
        .reviewer-info h4 {
            margin: 0 0 5px;
        }
        
        .review-date {
            font-size: 0.8rem;
            color: #6b7280;
            margin: 0;
        }
        
        .review-rating {
            color: var(--accent-color);
            margin-bottom: 10px;
        }
        
        .review-content p {
            margin: 0;
        }
        
        @media (max-width: 992px) {
            .book-details-container {
                grid-template-columns: 1fr;
            }
            
            .book-gallery {
                max-width: 500px;
                margin: 0 auto;
            }
        }
        
        @media (max-width: 768px) {
            .tabs-header {
                overflow-x: auto;
                white-space: nowrap;
                padding-bottom: 5px;
            }
            
            .tab-btn {
                padding: 15px 15px;
            }
            
            .reviews-summary {
                flex-direction: column;
                gap: 20px;
            }
            
            .book-details-grid {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
});
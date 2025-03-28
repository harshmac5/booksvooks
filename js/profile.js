document.addEventListener('DOMContentLoaded', function() {
    // Profile Tab Navigation
    const profileNavItems = document.querySelectorAll('.profile-nav li');
    const profileTabs = document.querySelectorAll('.profile-tab');
    
    profileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items and tabs
            profileNavItems.forEach(navItem => navItem.classList.remove('active'));
            profileTabs.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked item and corresponding tab
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Listings Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const listingCards = document.querySelectorAll('.listing-card');
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all filter buttons
                filterBtns.forEach(filterBtn => filterBtn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Show/hide listings based on filter
                listingCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const listingTag = card.querySelector('.listing-tag');
                        if (listingTag && listingTag.classList.contains(filter)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Rental Tabs
    const rentalTabs = document.querySelectorAll('.rental-tab');
    const rentalContents = document.querySelectorAll('.rental-content');
    
    if (rentalTabs.length > 0) {
        rentalTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                rentalTabs.forEach(rentalTab => rentalTab.classList.remove('active'));
                rentalContents.forEach(content => content.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                this.classList.add('active');
                const tabId = this.getAttribute('data-rental-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Listing Actions
    const editBtns = document.querySelectorAll('.btn-icon.edit');
    const deleteBtns = document.querySelectorAll('.btn-icon.delete');
    const markSoldBtns = document.querySelectorAll('.btn-icon.mark-sold');
    const markAvailableBtns = document.querySelectorAll('.btn-icon.mark-available');
    
    // Edit button
    editBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const listingCard = this.closest('.listing-card');
            const bookTitle = listingCard.querySelector('h3').textContent;
            alert(`Edit listing: ${bookTitle}\nThis feature will allow you to edit your listing. Coming soon!`);
        });
    });
    
    // Delete button
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const listingCard = this.closest('.listing-card');
            const bookTitle = listingCard.querySelector('h3').textContent;
            
            if (confirm(`Are you sure you want to delete the listing for "${bookTitle}"?`)) {
                // In a real application, this would send a delete request to the server
                // For now, we'll just remove the card from the DOM
                listingCard.remove();
            }
        });
    });
    
    // Mark as sold button
    markSoldBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const listingCard = this.closest('.listing-card');
            const statusElement = listingCard.querySelector('.listing-status');
            
            if (statusElement) {
                statusElement.classList.remove('active');
                statusElement.classList.add('sold');
                statusElement.querySelector('span').textContent = 'Sold';
            }
            
            // Hide the mark sold button and show the mark available button
            this.style.display = 'none';
            const markAvailableBtn = listingCard.querySelector('.btn-icon.mark-available');
            if (markAvailableBtn) {
                markAvailableBtn.style.display = 'flex';
            }
        });
    });
    
    // Mark as available button
    markAvailableBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const listingCard = this.closest('.listing-card');
            const statusElement = listingCard.querySelector('.listing-status');
            
            if (statusElement) {
                statusElement.classList.remove('sold', 'rented');
                statusElement.classList.add('active');
                statusElement.querySelector('span').textContent = 'Active';
            }
            
            // Hide the mark available button and show the mark sold button
            this.style.display = 'none';
            const markSoldBtn = listingCard.querySelector('.btn-icon.mark-sold');
            if (markSoldBtn) {
                markSoldBtn.style.display = 'flex';
            }
        });
    });
    
    // Message Preview Click
    const messagePreviewItems = document.querySelectorAll('.message-preview');
    
    messagePreviewItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all preview items
            messagePreviewItems.forEach(preview => preview.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // In a real application, this would load the conversation
            // For now, we'll just remove the unread message count
            const messageCount = this.querySelector('.message-count');
            if (messageCount) {
                messageCount.remove();
            }
        });
    });
    
    // Message Input
    const messageInput = document.querySelector('.message-input input');
    const sendButton = document.querySelector('.btn-icon.send');
    
    if (messageInput && sendButton) {
        // Send message on Enter key
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Send message on button click
        sendButton.addEventListener('click', sendMessage);
        
        function sendMessage() {
            const message = messageInput.value.trim();
            
            if (message) {
                // In a real application, this would send the message to the server
                // For now, we'll just add it to the message body
                const messageBody = document.querySelector('.message-body');
                
                if (messageBody) {
                    // Create message element
                    const messageElement = document.createElement('div');
                    messageElement.classList.add('message', 'sent');
                    
                    // Create message bubble
                    const bubbleElement = document.createElement('div');
                    bubbleElement.classList.add('message-bubble');
                    
                    // Add message text
                    const textElement = document.createElement('p');
                    textElement.textContent = message;
                    
                    // Add message time
                    const timeElement = document.createElement('span');
                    timeElement.classList.add('message-time');
                    timeElement.textContent = 'Just now';
                    
                    // Append elements
                    bubbleElement.appendChild(textElement);
                    bubbleElement.appendChild(timeElement);
                    messageElement.appendChild(bubbleElement);
                    messageBody.appendChild(messageElement);
                    
                    // Clear input
                    messageInput.value = '';
                    
                    // Scroll to bottom
                    messageBody.scrollTop = messageBody.scrollHeight;
                }
            }
        }
    }
    
    // Settings Form
    const settingsForms = document.querySelectorAll('.settings-form');
    
    settingsForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real application, this would save the settings to the server
            // For now, we'll just show a success message
            alert('Settings saved successfully!');
        });
    });
});
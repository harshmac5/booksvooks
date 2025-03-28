document.addEventListener('DOMContentLoaded', function() {
    // Toggle between rent and sale form fields based on listing type
    const listingTypeRadios = document.querySelectorAll('input[name="listing-type"]');
    const salePriceGroup = document.querySelector('.sale-price-group');
    const rentPriceGroup = document.querySelector('.rent-price-group');
    const rentDepositGroup = document.querySelector('.rent-deposit-group');
    
    if (listingTypeRadios.length > 0) {
        listingTypeRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                // Show/hide price fields based on listing type
                if (this.value === 'sale') {
                    salePriceGroup.classList.remove('hidden');
                    rentPriceGroup.classList.add('hidden');
                    rentDepositGroup.classList.add('hidden');
                    
                    // Make sale price required and rent price not required
                    document.getElementById('book-price').required = true;
                    document.getElementById('book-rent-price').required = false;
                } else if (this.value === 'rent') {
                    salePriceGroup.classList.add('hidden');
                    rentPriceGroup.classList.remove('hidden');
                    rentDepositGroup.classList.remove('hidden');
                    
                    // Make rent price required and sale price not required
                    document.getElementById('book-price').required = false;
                    document.getElementById('book-rent-price').required = true;
                } else if (this.value === 'both') {
                    salePriceGroup.classList.remove('hidden');
                    rentPriceGroup.classList.remove('hidden');
                    rentDepositGroup.classList.remove('hidden');
                    
                    // Make both prices required
                    document.getElementById('book-price').required = true;
                    document.getElementById('book-rent-price').required = true;
                }
            });
        });
    }
    
    // Photo Upload Functionality
    const uploadBox = document.querySelector('.upload-box');
    const photoInput = document.getElementById('book-photos');
    const photoPreview = document.querySelector('.photo-preview');
    
    if (uploadBox && photoInput && photoPreview) {
        // Click on upload box to trigger file input
        uploadBox.addEventListener('click', function() {
            photoInput.click();
        });
        
        // Handle drag and drop
        uploadBox.addEventListener('dragover', function(e) {
            e.preventDefault();
            uploadBox.classList.add('dragover');
        });
        
        uploadBox.addEventListener('dragleave', function() {
            uploadBox.classList.remove('dragover');
        });
        
        uploadBox.addEventListener('drop', function(e) {
            e.preventDefault();
            uploadBox.classList.remove('dragover');
            
            if (e.dataTransfer.files.length) {
                photoInput.files = e.dataTransfer.files;
                updatePhotoPreview();
            }
        });
        
        // Handle file selection
        photoInput.addEventListener('change', updatePhotoPreview);
        
        function updatePhotoPreview() {
            photoPreview.innerHTML = '';
            
            // Limit to 5 photos
            const maxPhotos = 5;
            const files = Array.from(photoInput.files).slice(0, maxPhotos);
            
            files.forEach((file, index) => {
                // Create preview item
                const previewItem = document.createElement('div');
                previewItem.classList.add('preview-item');
                
                // Create image element
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                
                // Create remove button
                const removeBtn = document.createElement('div');
                removeBtn.classList.add('remove-btn');
                removeBtn.innerHTML = '<i class="fas fa-times"></i>';
                removeBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    previewItem.remove();
                    // Note: In a real implementation, we would need to update the file input
                    // This is complex with the File API and would require a more sophisticated solution
                });
                
                // Append elements
                previewItem.appendChild(img);
                previewItem.appendChild(removeBtn);
                photoPreview.appendChild(previewItem);
            });
            
            // Update upload box text based on number of photos
            const uploadText = document.querySelector('.upload-box span');
            const remainingPhotos = maxPhotos - files.length;
            
            if (files.length > 0) {
                uploadText.textContent = `${files.length} photo${files.length > 1 ? 's' : ''} selected (${remainingPhotos} more allowed)`;
            } else {
                uploadText.textContent = 'Add at least 2 photos (Max 5)';
            }
        }
    }
    
    // Form Validation
    const sellForm = document.querySelector('.sell-form');
    
    if (sellForm) {
        sellForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = sellForm.querySelectorAll('[required]');
            
            // Check all required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    showError(field, 'This field is required');
                    isValid = false;
                } else {
                    removeError(field);
                }
            });
            
            // Check if at least 2 photos are uploaded
            const photoInput = document.getElementById('book-photos');
            if (photoInput && photoInput.files.length < 2) {
                const uploadBox = document.querySelector('.upload-box');
                showError(uploadBox, 'Please upload at least 2 photos');
                isValid = false;
            }
            
            if (isValid) {
                // In a real application, this would submit the form to the server
                // For now, we'll just show a success message and redirect
                showNotification('Your book has been listed successfully!', 'success');
                
                // Simulate redirect after 2 seconds
                setTimeout(() => {
                    window.location.href = 'browse.html';
                }, 2000);
            }
        });
    }
    
    // Helper Functions
    function showError(input, message) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        let errorElement = formGroup.querySelector('.error-message');
        
        if (!errorElement) {
            errorElement = document.createElement('p');
            errorElement.classList.add('error-message');
            formGroup.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        input.classList.add('error');
    }
    
    function removeError(input) {
        const formGroup = input.closest('.form-group') || input.parentElement;
        const errorElement = formGroup.querySelector('.error-message');
        
        if (errorElement) {
            formGroup.removeChild(errorElement);
        }
        
        input.classList.remove('error');
    }
    
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
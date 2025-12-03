document.addEventListener('DOMContentLoaded', function() {
    let state = {
        currentImageIndex: 1,
        cartQuantity: 0,
        cartItems: [],
        totalPrice: 0,
        isCartOpen: false,
        isMobileMenuOpen: false,
        isLightboxOpen: false
    };

    // DOM ELEMENTS
    // Header elements
    const hamburgerToggle = document.querySelector('.hamburger-toggle');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenuOverlay = document.querySelector('[data-mobile-menu]');
    const cartBtn = document.querySelector('[data-cart-btn]');
    const cartDropdown = document.querySelector('[data-cart-dropdown]');
    const cartCountBadge = document.querySelector('[data-cart-count]');
    
    // Product gallery elements
    const mainImage = document.querySelector('[data-main-image]');
    const prevBtn = document.querySelector('[data-prev-btn]');
    const nextBtn = document.querySelector('[data-next-btn]');
    const thumbnailBtns = document.querySelectorAll('[data-thumbnail]');
    
    // Product info elements
    const minusBtn = document.querySelector('[data-minus-btn]');
    const plusBtn = document.querySelector('[data-plus-btn]');
    const quantityDisplay = document.querySelector('[data-quantity]');
    const addToCartBtn = document.querySelector('[data-add-to-cart]');
    
    // Cart elements
    const cartContent = document.querySelector('[data-cart-content]');
    const cartEmpty = document.querySelector('.cart-empty');
    const cartFilled = document.querySelector('.cart-filled');
    const cartQuantityDisplay = document.querySelector('[data-cart-quantity]');
    const cartTotalDisplay = document.querySelector('[data-cart-total]');
    const deleteItemBtn = document.querySelector('[data-delete-item]');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Lightbox elements
    const lightboxOverlay = document.querySelector('[data-lightbox]');
    const closeLightboxBtn = document.querySelector('[data-close-lightbox]');
    const lightboxMainImage = document.querySelector('[data-lightbox-image]');
    const lightboxPrevBtn = document.querySelector('[data-lightbox-prev]');
    const lightboxNextBtn = document.querySelector('[data-lightbox-next]');
    const lightboxThumbnails = document.querySelectorAll('[data-lightbox-thumbnail]');
    const mainImageContainer = document.querySelector('.main-image-container');

    // Product Image data 
    const productImages = {
        1: {
            main: 'images/image-product-1.jpg',
            thumbnail: 'images/image-product-1-thumbnail.jpg'
        },
        2: {
            main: 'images/image-product-2.jpg',
            thumbnail: 'images/image-product-2-thumbnail.jpg'
        },
        3: {
            main: 'images/image-product-3.jpg',
            thumbnail: 'images/image-product-3-thumbnail.jpg'
        },
        4: {
            main: 'images/image-product-4.jpg',
            thumbnail: 'images/image-product-4-thumbnail.jpg'
        }
    };

    // UTILITY FUNCTIONS
    function formatPrice(price) {
        return `$${price.toFixed(2)}`;
    }

    function updateCartBadge() {
        cartCountBadge.textContent = state.cartQuantity;
        // Hide badge when cart is empty
        cartCountBadge.style.display = state.cartQuantity > 0 ? 'flex' : 'none';
    }

    function updateQuantityDisplay() {
        quantityDisplay.textContent = state.cartQuantity;
    }

    function updateCartDisplay() {
        if (state.cartQuantity > 0) {
            // Show filled cart state
            cartEmpty.classList.add('hidden');
            cartFilled.classList.remove('hidden');
            
            // Update cart details
            cartQuantityDisplay.textContent = state.cartQuantity;
            state.totalPrice = state.cartQuantity * 125.00;
            cartTotalDisplay.textContent = formatPrice(state.totalPrice);
        } else {
            // Show empty cart state
            cartEmpty.classList.remove('hidden');
            cartFilled.classList.add('hidden');
        }
    }

    function updateImageGallery(index) {
        // Update state
        state.currentImageIndex = index;
        
        // Update main image
        mainImage.src = productImages[index].main;
        mainImage.alt = `Fall Limited Edition Sneakers - View ${index}`;
        
        // Update lightbox image if open
        if (state.isLightboxOpen) {
            lightboxMainImage.src = productImages[index].main;
            lightboxMainImage.alt = `Fall Limited Edition Sneakers - View ${index}`;
        }
        
        // Update thumbnail active states
        thumbnailBtns.forEach(btn => {
            const btnIndex = parseInt(btn.getAttribute('data-thumbnail'));
            if (btnIndex === index) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            }
        });
        
        // Update lightbox thumbnails if open
        if (state.isLightboxOpen) {
            lightboxThumbnails.forEach(btn => {
                const btnIndex = parseInt(btn.getAttribute('data-lightbox-thumbnail'));
                if (btnIndex === index) {
                    btn.classList.add('active');
                    btn.setAttribute('aria-current', 'true');
                } else {
                    btn.classList.remove('active');
                    btn.removeAttribute('aria-current');
                }
            });
        }
    }

    function navigateImage(direction) {
        let newIndex = state.currentImageIndex + direction;
        
        // Handle wrap-around
        if (newIndex < 1) newIndex = 4;
        if (newIndex > 4) newIndex = 1;
        
        updateImageGallery(newIndex);
    }

    // Mobile Menu Functions
    function openMobileMenu() {
        state.isMobileMenuOpen = true;
        mobileMenuOverlay.setAttribute('aria-hidden', 'false');
        hamburgerToggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMobileMenu() {
        state.isMobileMenuOpen = false;
        mobileMenuOverlay.setAttribute('aria-hidden', 'true');
        hamburgerToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Cart Functions
    function openCart() {
        state.isCartOpen = true;
        cartDropdown.setAttribute('aria-hidden', 'false');
    }

    function closeCart() {
        state.isCartOpen = false;
        cartDropdown.setAttribute('aria-hidden', 'true');
    }

    function toggleCart() {
        if (state.isCartOpen) {
            closeCart();
        } else {
            openCart();
            // Close mobile menu if open
            if (state.isMobileMenuOpen) {
                closeMobileMenu();
            }
        }
    }

    // Lightbox Functions
    function openLightbox() {
        state.isLightboxOpen = true;
        lightboxOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Set initial lightbox image
        lightboxMainImage.src = productImages[state.currentImageIndex].main;
        
        // Update lightbox thumbnails
        lightboxThumbnails.forEach(btn => {
            const btnIndex = parseInt(btn.getAttribute('data-lightbox-thumbnail'));
            if (btnIndex === state.currentImageIndex) {
                btn.classList.add('active');
                btn.setAttribute('aria-current', 'true');
            } else {
                btn.classList.remove('active');
                btn.removeAttribute('aria-current');
            }
        });
    }

    function closeLightbox() {
        state.isLightboxOpen = false;
        lightboxOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable scrolling
    }

    // Quantity Functions
    function decreaseQuantity() {
        if (state.cartQuantity > 0) {
            state.cartQuantity--;
            updateQuantityDisplay();
        }
    }

    function increaseQuantity() {
        state.cartQuantity++;
        updateQuantityDisplay();
    }

    function addToCart() {
        if (state.cartQuantity > 0) {
            // Update cart badge
            updateCartBadge();
            
            // Update cart display
            updateCartDisplay();
            
            // Show cart dropdown
            openCart();
            
            // Reset quantity display (optional - you might want to keep it)
            // state.cartQuantity = 0;
            // updateQuantityDisplay();
            
            // Show confirmation message (optional)
            console.log(`${state.cartQuantity} item(s) added to cart!`);
        }
    }

    function deleteCartItem() {
        state.cartQuantity = 0;
        updateCartBadge();
        updateCartDisplay();
        updateQuantityDisplay();
    }

    // EVENT LISTENERS
    // Mobile Menu Events
    hamburgerToggle.addEventListener('click', openMobileMenu);
    closeMenuBtn.addEventListener('click', closeMobileMenu);
    
    // Close mobile menu when clicking outside
    mobileMenuOverlay.addEventListener('click', function(e) {
        if (e.target === mobileMenuOverlay) {
            closeMobileMenu();
        }
    });

    // Cart Events
    cartBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        toggleCart();
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        if (state.isCartOpen && !cartDropdown.contains(e.target) && !cartBtn.contains(e.target)) {
            closeCart();
        }
    });

    // Close cart on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && state.isCartOpen) {
            closeCart();
        }
    });

    // Product Gallery Events
    prevBtn.addEventListener('click', function() {
        navigateImage(-1);
    });

    nextBtn.addEventListener('click', function() {
        navigateImage(1);
    });

    // Thumbnail click events
    thumbnailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-thumbnail'));
            updateImageGallery(index);
        });
    });

    // Quantity Events
    minusBtn.addEventListener('click', decreaseQuantity);
    plusBtn.addEventListener('click', increaseQuantity);

    // Add to Cart Event
    addToCartBtn.addEventListener('click', addToCart);

    // Cart Item Events
    deleteItemBtn.addEventListener('click', deleteCartItem);
    
    checkoutBtn.addEventListener('click', function() {
        alert(`Proceeding to checkout! Total: ${formatPrice(state.totalPrice)}`);
        // In a real app, this would redirect to checkout page
    });

    // Lightbox Events
    mainImageContainer.addEventListener('click', function() {
        // Only open lightbox on desktop
        if (window.innerWidth >= 768) {
            openLightbox();
        }
    });

    closeLightboxBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside
    lightboxOverlay.addEventListener('click', function(e) {
        if (e.target === lightboxOverlay) {
            closeLightbox();
        }
    });

    // Lightbox navigation
    lightboxPrevBtn.addEventListener('click', function() {
        navigateImage(-1);
    });

    lightboxNextBtn.addEventListener('click', function() {
        navigateImage(1);
    });

    // Lightbox thumbnail events
    lightboxThumbnails.forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-lightbox-thumbnail'));
            updateImageGallery(index);
        });
    });

    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && state.isLightboxOpen) {
            closeLightbox();
        }
        
        // Keyboard navigation for lightbox
        if (state.isLightboxOpen) {
            if (e.key === 'ArrowLeft') {
                navigateImage(-1);
            } else if (e.key === 'ArrowRight') {
                navigateImage(1);
            }
        }
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    mainImageContainer.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    mainImageContainer.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            navigateImage(1);
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            navigateImage(-1);
        }
    }

    // INITIALIZATION
    function initializeApp() {
        // Set initial image
        updateImageGallery(1);
        
        // Initialize cart badge
        updateCartBadge();
        
        // Initialize cart display
        updateCartDisplay();
        
        // Initialize quantity display
        updateQuantityDisplay();
        
        // Close dropdowns on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768 && state.isMobileMenuOpen) {
                closeMobileMenu();
            }
        });
        
        console.log('E-commerce page initialized successfully!');
    }

    // Initialize the application
    initializeApp();
});
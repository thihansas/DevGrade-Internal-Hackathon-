// Global variables
let cart = [];
const TAX_RATE = 0.10;

// DOM Elements
let productList, cartItems, emptyCartMessage, cartCount;
let subtotalAmount, taxAmount, totalAmount, checkoutBtn;

// Initialize DOM elements
function initDOMElements() {
    productList = document.getElementById('product-list');
    cartItems = document.getElementById('cart-items');
    emptyCartMessage = document.getElementById('empty-cart-message');
    cartCount = document.getElementById('cart-count');
    subtotalAmount = document.getElementById('subtotal-amount');
    taxAmount = document.getElementById('tax-amount');
    totalAmount = document.getElementById('total-amount');
    checkoutBtn = document.getElementById('checkout-btn');
}

// Initialize the application
function init() {
    initDOMElements();
    displayProducts();
    setupEventListeners();
}

// Display products on the page
function displayProducts() {
    if (!productList) return;
    
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// Set up event listeners
function setupEventListeners() {
    // Add to cart buttons
    if (productList) {
        productList.addEventListener('click', function(e) {
            if (e.target.classList.contains('add-to-cart')) {
                const productId = parseInt(e.target.getAttribute('data-id'));
                addToCart(productId);
            }
        });
    }
    
    // Cart quantity buttons and remove buttons
    if (cartItems) {
        cartItems.addEventListener('click', function(e) {
            if (e.target.classList.contains('quantity-btn')) {
                const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
                if (e.target.textContent === '+') {
                    updateCartItemQuantity(productId, 1);
                } else if (e.target.textContent === '-') {
                    updateCartItemQuantity(productId, -1);
                }
            }
            
            if (e.target.classList.contains('remove-item')) {
                const productId = parseInt(e.target.closest('.cart-item').getAttribute('data-id'));
                removeFromCart(productId);
            }
        });
    }
}

// Add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    updateCart();
}

// Update the quantity of a cart item
function updateCartItemQuantity(productId, change) {
    const cartItem = cart.find(item => item.id === productId);
    if (!cartItem) return;
    
    cartItem.quantity += change;
    
    if (cartItem.quantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    updateCart();
}

// Remove an item from the cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Update the cart display and totals
function updateCart() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartItems) {
            const items = cartItems.querySelectorAll('.cart-item');
            if (items) items.forEach(item => item.remove());
        }
    } else {
        if (emptyCartMessage) emptyCartMessage.style.display = 'none';
        displayCartItems();
    }
    
    updateCartTotals();
    
    if (checkoutBtn) checkoutBtn.disabled = cart.length === 0;
}

function displayCartItems() {
    if (!cartItems) return;
    
    const items = cartItems.querySelectorAll('.cart-item');
    if (items) items.forEach(item => item.remove());
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.setAttribute('data-id', item.id);
        
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn">-</button>
                <span class="quantity-value">${item.quantity}</span>
                <button class="quantity-btn">+</button>
            </div>
            <button class="remove-item">Remove</button>
        `;
        
        cartItems.insertBefore(cartItemElement, emptyCartMessage);
    });
}

// app.js - Fixed updateCartTotals function
function updateCartTotals() {
    // Get references to display elements
    const subtotalAmount = document.getElementById('subtotal-amount');
    const taxAmount = document.getElementById('tax-amount');
    const totalAmount = document.getElementById('total-amount');
    
    // Calculate totals from cart items
    let subtotal = 0;
    
    // Get all cart items
    const cartItems = document.querySelectorAll('.cart-item');
    
    // Sum up the price of all items
    cartItems.forEach(item => {
        const price = parseFloat(item.querySelector('.item-price').textContent.replace('$', ''));
        const quantity = parseInt(item.querySelector('.item-quantity').value);
        subtotal += price * quantity;
    });
    
    // Calculate tax and total
    const taxRate = 0.10;  // 10% tax rate
    const tax = subtotal * taxRate;
    const total = subtotal + tax;
    
    // Update the display elements with formatted currency values - Adding null checks
    if (subtotalAmount) subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    if (taxAmount) taxAmount.textContent = `$${tax.toFixed(2)}`;
    if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`;
    
    // Return values for testing purposes
    return { subtotal, tax, total };
}
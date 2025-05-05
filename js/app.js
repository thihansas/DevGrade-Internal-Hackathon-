// Global variables
let cart = [];
const TAX_RATE = 0.10;

// DOM Elements
const productList = document.getElementById('product-list');
const cartItems = document.getElementById('cart-items');
const emptyCartMessage = document.getElementById('empty-cart-message');
const cartCount = document.getElementById('cart-count');
const subtotalAmount = document.getElementById('subtotal-amount');
const taxAmount = document.getElementById('tax-amount');
const totalAmount = document.getElementById('total-amount');
const checkoutBtn = document.getElementById('checkout-btn');

// Calculator elements
const originalPriceInput = document.getElementById('original-price');
const discountPercentageInput = document.getElementById('discount-percentage');
const calculateBtn = document.getElementById('calculate-btn');
const finalPrice = document.getElementById('final-price');
const savingsAmount = document.getElementById('savings-amount');

// Initialize the application
function init() {
    displayProducts();
    setupEventListeners();
}

// Display products on the page
function displayProducts() {
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
    productList.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });
    
    // Cart quantity buttons and remove buttons
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
    
    // Discount calculator
    calculateBtn.addEventListener('click', calculateDiscount);
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
    cartCount.textContent = totalItems;
    
    // Show/hide empty cart message
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartItems.querySelectorAll('.cart-item').forEach(item => item.remove());
    } else {
        emptyCartMessage.style.display = 'none';
        displayCartItems();
    }
    
    updateCartTotals();
    
    checkoutBtn.disabled = cart.length === 0;
}

function displayCartItems() {
    cartItems.querySelectorAll('.cart-item').forEach(item => item.remove());
    
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

function updateCartTotals() {
    // TODO: Challenge #2 - Calculate cart totals
    // This function should calculate subtotal, tax, and total
    // Update the following elements:
    // - subtotalAmount.textContent
    // - taxAmount.textContent
    // - totalAmount.textContent
    
    // Challenge #2 Solution:
    // Calculate the subtotal by summing up (item price * item quantity) for all items
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Calculate tax based on the subtotal and the TAX_RATE (10%)
    const tax = subtotal * TAX_RATE;
    
    // Calculate total by adding subtotal and tax
    const total = subtotal + tax;
    
    // Update the display elements with formatted currency values
    subtotalAmount.textContent = `$${subtotal.toFixed(2)}`;
    taxAmount.textContent = `$${tax.toFixed(2)}`;
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

// Initialize the app when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
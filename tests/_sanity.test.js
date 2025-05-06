/**
 * @jest-environment jsdom
 */

// _sanity.test.js - Basic sanity test for product display functionality

// Mock product data
const products = [
    { id: 1, name: "Test Product 1", price: 10.99, image: "test1.jpg" },
    { id: 2, name: "Test Product 2", price: 24.99, image: "test2.jpg" },
    { id: 3, name: "Test Product 3", price: 5.49, image: "test3.jpg" }
  ];
  
  describe('E-commerce - Product Display Functionality', () => {
    
    let productList;
    
    beforeEach(() => {
      // Set up the document body
      document.body.innerHTML = `
        <div id="product-list"></div>
      `;
      
      // Initialize DOM elements
      productList = document.getElementById('product-list');
    });
    
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
    
    test('Products load and display correctly', () => {
      // Initial state check
      expect(productList.innerHTML).toBe('');
      
      // Display products
      displayProducts();
      
      // Check if all products are displayed
      const productCards = document.querySelectorAll('.product-card');
      expect(productCards.length).toBe(3);
      
      // Check product information for each product
      const productTitles = document.querySelectorAll('.product-title');
      expect(productTitles[0].textContent).toBe('Test Product 1');
      expect(productTitles[1].textContent).toBe('Test Product 2');
      expect(productTitles[2].textContent).toBe('Test Product 3');
      
      // Check product prices
      const productPrices = document.querySelectorAll('.product-price');
      expect(productPrices[0].textContent).toBe('$10.99');
      expect(productPrices[1].textContent).toBe('$24.99');
      expect(productPrices[2].textContent).toBe('$5.49');
      
      // Check product images
      const productImages = document.querySelectorAll('.product-image');
      expect(productImages[0].getAttribute('src')).toBe('test1.jpg');
      expect(productImages[1].getAttribute('src')).toBe('test2.jpg');
      expect(productImages[2].getAttribute('src')).toBe('test3.jpg');
      
      // Check if add to cart buttons have correct data-id
      const addToCartButtons = document.querySelectorAll('.add-to-cart');
      expect(addToCartButtons[0].getAttribute('data-id')).toBe('1');
      expect(addToCartButtons[1].getAttribute('data-id')).toBe('2');
      expect(addToCartButtons[2].getAttribute('data-id')).toBe('3');
    });
    
    test('Product list should be empty when no products exist', () => {
      // Temporarily save and clear products
      const originalProducts = [...products];
      products.length = 0;
      
      // Display products (should be none)
      displayProducts();
      
      // Check if product list is empty
      const productCards = document.querySelectorAll('.product-card');
      expect(productCards.length).toBe(0);
      
      // Restore products
      while (products.length > 0) {
        products.pop();
      }
      originalProducts.forEach(p => products.push(p));
    });
  });
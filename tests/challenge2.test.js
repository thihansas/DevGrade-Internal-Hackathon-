// challenge2.test.js - Fixed test
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Mock DOM for testing
describe('Cart functionality', () => {
  let window, document, appModule, elements;

  beforeEach(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    const dom = new JSDOM(html, { runScripts: 'dangerously' });
    
    window = dom.window;
    document = window.document;

    document.body.innerHTML = `
      <div id="cart-container">
        <div class="cart-item">
          <span class="item-name">Product 1</span>
          <span class="item-price">$100</span>
          <input class="item-quantity" type="number" value="2">
        </div>
        <div class="cart-item">
          <span class="item-name">Product 2</span>
          <span class="item-price">$50</span>
          <input class="item-quantity" type="number" value="1">
        </div>
      </div>
      <div id="cart-summary">
        <div id="subtotal-amount"></div>
        <div id="tax-amount"></div>
        <div id="total-amount"></div>
      </div>
    `;
    
    const appCode = fs.readFileSync(path.resolve(__dirname, '../js/app.js'), 'utf8');
    const scriptEl = document.createElement('script');
    scriptEl.textContent = appCode;
    document.head.appendChild(scriptEl);
    
    elements = {
      'subtotal-amount': document.getElementById('subtotal-amount'),
      'tax-amount': document.getElementById('tax-amount'),
      'total-amount': document.getElementById('total-amount')
    };
    
    // Create and expose the app module for testing
    appModule = {
      updateCartTotals: () => {
        // Get the function from the window object or manually implement it here
        // This is assuming updateCartTotals is defined globally in app.js
        const result = window.updateCartTotals ? window.updateCartTotals() : null;
        return result;
      }
    };
  });

  test('Cart totals should be calculated correctly', () => {
    // Make sure our elements are properly set up
    expect(elements['subtotal-amount']).not.toBeNull();
    expect(elements['tax-amount']).not.toBeNull();
    expect(elements['total-amount']).not.toBeNull();
    
    // Call the function we're testing
    const results = appModule.updateCartTotals();
    
    // First verify the calculation results if the function returns them
    if (results) {
      expect(results.subtotal).toBeCloseTo(250);
      expect(results.tax).toBeCloseTo(25);
      expect(results.total).toBeCloseTo(275);
    }
    
    // Then check the DOM updates
    expect(elements['subtotal-amount'].textContent).toBe('$250.00');
    expect(elements['tax-amount'].textContent).toBe('$25.00');
    expect(elements['total-amount'].textContent).toBe('$275.00');
  });
});
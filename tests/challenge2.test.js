// You may need to simulate a DOM environment and test updateCartTotals
const { updateCartTotals } = require('../js/app.js');

test('Cart totals should be calculated correctly', () => {
    global.cart = [
        { price: 100, quantity: 2 },
        { price: 50, quantity: 1 },
    ];
    document.body.innerHTML = `
        <span id="subtotal-amount"></span>
        <span id="tax-amount"></span>
        <span id="total-amount"></span>
    `;
    
    updateCartTotals();

    expect(document.getElementById('subtotal-amount').textContent).toBe('$250.00');
    expect(document.getElementById('tax-amount').textContent).toBe('$25.00');
    expect(document.getElementById('total-amount').textContent).toBe('$275.00');
});

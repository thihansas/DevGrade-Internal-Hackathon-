const fs = require('fs');

// Simple test that doesn't require JSDOM
test('Page title should be ShopMaster2025', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const titleMatch = html.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    expect(title).toBe('ShopMaster2025');
});
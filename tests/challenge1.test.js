const fs = require('fs');
const { JSDOM } = require('jsdom');

test('Page title should be ShopMaster2025', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    const dom = new JSDOM(html);
    const title = dom.window.document.querySelector('title').textContent;
    expect(title).toBe('ShopMaster2025');
});

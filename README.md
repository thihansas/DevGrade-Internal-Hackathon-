ShopMaster E-commerce Challenge
This is a half-built e-commerce web application with 5 challenges for you to complete. The project includes HTML, CSS, and JavaScript files for the client-side, as well as a simple Express server for the backend.

Getting Started
Install Node.js if you haven't already (https://nodejs.org)
Install the dependencies for the server:
cd server
npm install
Start the server:
npm start
Open your browser and navigate to http://localhost:3000
The Challenges
You need to complete 5 challenges in this project. Each challenge tests a different aspect of web development. After completing the challenges, you can check your score by clicking the "Checkout" button or pressing Ctrl+Alt+R.

Challenge 1: Site Title Customization
Objective: Change the site title and tagline to make the site your own.

Steps:

Open index.html
Find the site title with the ID site-title
Change the text content to a different title
Success Criteria: The site title is different from the default "ShopMaster"

Challenge 2: Cart Totals Calculation
Objective: Implement the cart totals calculation function.

Steps:

Open js/app.js
Find the updateCartTotals() function
Implement the function to:
Calculate the subtotal (sum of price * quantity for all items)
Calculate the tax (subtotal * TAX_RATE)
Calculate the total (subtotal + tax)
Update the respective elements with the formatted values
Success Criteria: When items are added to the cart, the subtotal, tax, and total amounts are correctly calculated and displayed.

Challenge 3: Discount Calculator
Objective: Implement the discount calculator function.

Steps:

Open js/app.js
Find the calculateDiscount() function
Implement the function to:
Get the original price from the input field
Get the discount percentage from the input field
Calculate the final price after applying the discount
Calculate the savings amount
Update the respective elements with the formatted values
Success Criteria: When values are entered and the Calculate button is clicked, the correct final price and savings amount are displayed.

Challenge 4: Product Filtering
Objective: Implement a product filtering function.

Steps:

Add a search input or filter controls to the products section in index.html
Create a function in js/app.js to filter products based on user input
Update the product display to show only filtered products
Success Criteria: Users can filter/search products, and the product list updates accordingly.

Challenge 5: Local Storage Integration
Objective: Save and load the cart from localStorage.

Steps:

Modify the updateCart() function in js/app.js to save the cart to localStorage
Create functions to:
Save the cart to localStorage whenever it changes
Load the cart from localStorage when the page loads
Update the init() function to load the cart on page load
Success Criteria: When items are added to the cart, they persist even after page refresh.

Scoring
Your progress is tracked in js/score.js. Each completed challenge contributes to your overall score. You can check your score at any time by clicking the "Checkout" button or pressing Ctrl+Alt+R.

API Endpoints
The server provides the following API endpoints:

GET /api/products - Get all products
GET /api/products/:id - Get a single product by ID
POST /api/checkout - Process a checkout (requires items and customer info)
POST /api/discount - Apply a discount code
Sample Discount Codes
WELCOME10 - 10% discount
SPRING25 - 25% discount
FREESHIP - 5% discount (free shipping)
Need Help?
If you get stuck, here are some tips:

Check the browser console for errors
Review the specific requirements for each challenge
Look at the tests in js/score.js to understand what's being checked
Use console.log() to debug your code
Good luck with the challenges!

"# DevGrade-Internal-Hackathon-" 

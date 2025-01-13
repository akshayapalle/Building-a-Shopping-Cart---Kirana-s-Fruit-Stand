// Product Data
const products = [
  {
    name: "Cherry",
    price: 2.5,
    quantity: 0,
    productId: 1,
    image: "images/cherry.jpg",
  },
  {
    name: "Orange",
    price: 1.5,
    quantity: 0,
    productId: 2,
    image: "images/orange.jpg",
  },
  {
    name: "Strawberry",
    price: 3.0,
    quantity: 0,
    productId: 3,
    image: "images/strawberry.jpg",
  },
];

// Cart Array
let cart = [];
let totalPaid = 0; // Track total payments
let remainingBalance = 0; // Global variable to track remaining balance

/**
 * @desc Helper function to get a product by its ID
 * @param {number} productId - The ID of the product to find
 * @param {Array} productList - The list of products to search in
 * @return {Object|null} - Returns the product object if found, else null
 */
function getProductById(productId, productList) {
  return productList.find((product) => product.productId === productId);
}

/**
 * @desc Adds a product to the cart or increases its quantity if already in the cart
 * @param {number} productId - The ID of the product to add
 */
function addProductToCart(productId) {
  const product = getProductById(productId, products);
  if (!product) return;

  const cartItem = cart.find((item) => item.productId === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

/**
 * @desc Increases the quantity of a product in the cart
 * @param {number} productId - The ID of the product to increase quantity
 */
function increaseQuantity(productId) {
  const cartItem = getProductById(productId, cart);
  if (cartItem) {
    cartItem.quantity++;
  }
}

/**
 * @desc Decreases the quantity of a product in the cart
 * @param {number} productId - The ID of the product to decrease quantity
 */
function decreaseQuantity(productId) {
  const cartItem = getProductById(productId, cart);
  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

/**
 * @desc Removes a product from the cart
 * @param {number} productId - The ID of the product to remove
 */
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex((item) => item.productId === productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1); // Use splice to directly remove the product
  }
}

/**
 * @desc Calculates the total cost of all products in the cart
 * @return {number} - The total cost of the cart
 */
function cartTotal() {
  return parseFloat(
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );
}

/**
 * @desc Handles payments, tracks totalPaid and calculates remaining balance
 * @param {number} amount - The amount being paid
 * @return {number} - Returns positive if change is owed, or negative if balance remains
 */
function pay(amount) {
  totalPaid += amount; // Update totalPaid with the current payment
  const total = cartTotal(); // Get the current total of the cart

  let change = totalPaid - total;

  if (change >= 0) {
    clearCart(); // Clear the cart if payment is complete
    remainingBalance = 0;
    totalPaid = 0; // Reset payments after change is given
    return parseFloat(change.toFixed(2)); // Return the change
  } else {
    remainingBalance = parseFloat((-change).toFixed(2)); // Set remaining balance as positive
    return -remainingBalance; // Return the remaining amount as negative
  }
}

/**
 * @desc Clears the cart
 */
function clearCart() {
  cart = [];
}

/**
 * @desc Switches product and cart prices to a new currency
 * @param {string} newCurrency - The target currency (USD, EUR, YEN)
 */
const currencyRates = {
  USD: 1,
  EUR: 0.85,
  YEN: 110,
};
let currentCurrency = "USD";

function switchCurrency(newCurrency) {
  if (!currencyRates[newCurrency]) return;

  const rate = currencyRates[newCurrency] / currencyRates[currentCurrency];
  products.forEach((product) => {
    product.price = parseFloat((product.price * rate).toFixed(2));
  });
  currentCurrency = newCurrency;

  // Update cart prices after switching currency
  cart.forEach((item) => {
    item.price = parseFloat((item.price * rate).toFixed(2));
  });
}

// Example usage for testing
addProductToCart(1); // Add Cherry
addProductToCart(2); // Add Orange

// Initial Cart Total
console.log("Cart Total:", cartTotal()); // Expected: 4.0

// Partial payment example
console.log("Remaining Balance:", pay(2)); // Paying $2, Expected: -2.0
console.log("Remaining Balance:", pay(3)); // Paying $3, Expected: 1.0 (change)

// Switch currency
switchCurrency("EUR");
console.log("Cart in EUR:", cart);

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  clearCart,
  switchCurrency,
};

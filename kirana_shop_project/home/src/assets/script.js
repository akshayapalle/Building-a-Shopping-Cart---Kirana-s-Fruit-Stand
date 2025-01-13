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

// Helper function to get product by ID
function getProductById(productId, productList) {
  return productList.find((product) => product.productId === productId);
}

// Add product to cart
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

// Increase product quantity in cart
function increaseQuantity(productId) {
  const cartItem = getProductById(productId, cart);
  if (cartItem) {
    cartItem.quantity++;
  }
}

// Decrease product quantity in cart
function decreaseQuantity(productId) {
  const cartItem = getProductById(productId, cart);
  if (cartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      removeProductFromCart(productId);
    }
  }
}

// Remove product from cart
function removeProductFromCart(productId) {
  const productIndex = cart.findIndex((item) => item.productId === productId);
  if (productIndex > -1) {
    cart.splice(productIndex, 1); // Use splice to directly remove the product
  }
}

// Calculate total cost of cart
function cartTotal() {
  return parseFloat(
    cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)
  );
}

// Handle payment
function pay(amount) {
  const total = cartTotal();
  totalPaid += amount; // Track total paid
  const balance = parseFloat((totalPaid - total).toFixed(2));

  if (balance >= 0) {
    cart = []; // Clear the cart when payment is complete
    totalPaid = 0; // Reset total paid
    return balance; // Return change
  } else {
    return balance; // Return negative balance indicating amount still owed
  }
}

// Clear cart
function clearCart() {
  cart = [];
}

// Switch currency
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

// Example usage (Commented out to avoid affecting test results)
// addProductToCart(1); // Add Cherry
// addProductToCart(2); // Add Orange
// increaseQuantity(1); // Increase Cherry quantity
// decreaseQuantity(2); // Decrease Orange quantity

// cartTotal(); // Total cost of items in the cart
// pay(10);     // Handle payment with $10
// clearCart();
// switchCurrency("EUR");

// Export for testing purposes
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
 
  
  

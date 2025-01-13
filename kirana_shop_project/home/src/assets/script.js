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
  const total = cartTotal(); // Calculate the current cart total
  
  // Deduct the payment amount from the total
  remainingBalance += amount; // Increment remainingBalance by the amount paid

  let amountOwed = total - remainingBalance;
  let change = 0;
  
  if (remainingBalance >= total) {
    change = parseFloat((remainingBalance - total).toFixed(2)); // Calculate change
    remainingBalance = 0; // Reset remaining balance after overpayment
    return change;
  } else {
    // If still owes money, keep remainingBalance negative
    remainingBalance = -amountOwed;
    return -remainingBalance; // Returning the negative value of owed amount
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

// Example usage for testing
addProductToCart(1); // Add Cherry ($2.5)
addProductToCart(2); // Add Orange ($1.5)

// Log initial cart total
console.log("Cart Total:", cartTotal()); // Expected: 4.0

// Partial payment example (paying $8 for a $10 bill)
let remainingAfterPayment = pay(8); // Paying $8
console.log(`Cash Received: $8`);
console.log(`Remaining Balance: -$${remainingAfterPayment.toFixed(2)}`); // Negative value for remaining balance
console.log("Please pay additional amount.");

// Overpayment example (paying $10 for a $9 bill)
remainingAfterPayment = pay(10); // Paying $10
console.log(`Cash Received: $10`);
console.log(`Remaining Balance: $${remainingAfterPayment.toFixed(2)}`); // Positive value for remaining balance
console.log("Change to be returned.");

// Cart after full payment
console.log("Cart Total after clearing:", cartTotal()); // Expected: 0.0

// Add products again for further tests
addProductToCart(3); // Add Strawberry ($3.0)
console.log("Cart Total with Strawberry:", cartTotal()); // Expected: 3.0

// Switch currency and verify remainingBalance
switchCurrency("EUR");
console.log("Remaining Balance in EUR:", remainingBalance);
console.log("Cart in EUR:", products);

// Display remaining balance with user-friendly message
if (remainingBalance < 0) {
  console.log(`You still owe: -${Math.abs(remainingBalance).toFixed(2)} ${currentCurrency}`);
} else if (remainingBalance > 0) {
  console.log(`Change: ${remainingBalance.toFixed(2)} ${currentCurrency}`);
} else {
  console.log("Payment is complete.");
}

// Export Updated Module
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



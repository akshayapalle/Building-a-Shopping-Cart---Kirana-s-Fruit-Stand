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
  
  // Add product to cart
  function addProductToCart(productId) {
    const product = products.find((p) => p.productId === productId);
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
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity++;
    }
  }
  
  // Decrease product quantity in cart
  function decreaseQuantity(productId) {
    const cartItem = cart.find((item) => item.productId === productId);
    if (cartItem) {
      cartItem.quantity--;
      if (cartItem.quantity === 0) {
        removeProductFromCart(productId);
      }
    }
  }
  
  // Remove product from cart
  function removeProductFromCart(productId) {
    cart = cart.filter((item) => item.productId !== productId);
  }
  
  // Calculate total cost of cart
  function cartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }
  
  // Handle payment
  let balance = 0;
  function pay(amount) {
    const total = cartTotal();
    balance = amount - total;
    return balance;
  }
  
  // Optional: Remove all items from cart
  function clearCart() {
    cart = [];
  }
  
  // Optional: Currency formatting and switcher
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
  
    // Optional: Update cart prices after switching currency
    cart.forEach((item) => {
      item.price = parseFloat((item.price * rate).toFixed(2));
    });
  }
  
  // Example usage:
  addProductToCart(1); // Add Cherry
  addProductToCart(2); // Add Orange
  increaseQuantity(1); // Increase Cherry quantity
  decreaseQuantity(2); // Decrease Orange quantity
  console.log("Cart Total:", cartTotal()); // Display total cost
  console.log("Payment Balance:", pay(10)); // Make payment and show balance
  
  // Clear cart and switch to EUR currency
  clearCart();
  switchCurrency("EUR");
  console.log("Products in EUR:", products);
  
  

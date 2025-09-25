// Product data
const products = [
  { id: 1, name: "Natukodi (Country Chicken)", price: 250 },
  { id: 2, name: "Eggs (12 pcs)", price: 60 }
];

let cart = [];

// DOM elements
const cartSection = document.querySelector('.cart');
const cartItemsDiv = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalAmount = document.getElementById('totalAmount');
const payAmount = document.getElementById('payAmount');
const cartBtn = document.getElementById('cartBtn');
const paymentMethod = document.getElementById('paymentMethod');
const cardDetails = document.getElementById('cardDetails');
const paymentForm = document.getElementById('paymentForm');

// Add product to cart
function addToCart(id) {
  const qty = parseInt(document.getElementById(`qty-${id}`).value);
  const product = products.find(p => p.id === id);
  for (let i = 0; i < qty; i++) {
    cart.push(product);
  }
  updateCart();
}

// Update cart display
function updateCart() {
  cartItemsDiv.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    cartItemsDiv.innerHTML += `
      <p>${item.name} - ₹${item.price} 
      <button onclick="removeFromCart(${index})">Remove</button></p>`;
  });
  totalAmount.textContent = total;
  cartCount.textContent = cart.length;
  payAmount.textContent = total;
}

// Remove product from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}

// Toggle cart visibility
cartBtn.addEventListener('click', () => {
  cartSection.classList.toggle('hidden');
});

// Show/hide card details based on payment method
paymentMethod.addEventListener('change', () => {
  if (paymentMethod.value === 'card') {
    cardDetails.style.display = 'block';
  } else {
    cardDetails.style.display = 'none';
  }
});

// Handle payment form submission
paymentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const address = document.getElementById('address').value;
  const method = paymentMethod.value;

  // Simple card validation if card is selected
  if (method === 'card') {
    const cardNumber = document.getElementById('cardNumber').value;
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    if (!cardNumber || !expiryDate || !cvv) {
      alert("Please enter complete card details!");
      return;
    }
  }

  // For demo, just show an alert
  alert(`Thank you ${name}!\nYour order of ₹${payAmount.textContent} has been placed using ${method}.\nWe will contact you at ${email}.`);

  // Clear cart and reset form
  cart = [];
  updateCart();
  paymentForm.reset();
  cardDetails.style.display = 'none';
});

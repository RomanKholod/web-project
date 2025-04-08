const products = [
  { id: 1, name: 'Apple', price: 1.2, image: 'images/apple.jpg' },
  { id: 2, name: 'Banana', price: 0.8, image: 'images/banana.jpg' },
  { id: 3, name: 'Cherry', price: 2.5, image: 'images/cherry.jpg' },
  { id: 4, name: 'Strawberry', price: 3.0, image: 'images/strawberry.jpg' },
  { id: 5, name: 'Blackberry', price: 1.5, image: 'images/blackberry.jpg' },
  { id: 6, name: 'Grapes', price: 2.0, image: 'images/grapes.jpg' },
  { id: 7, name: 'Orange', price: 1.3, image: 'images/orange.jpg' },
  { id: 8, name: 'Peach', price: 1.8, image: 'images/peach.jpg' },
];

const cart = [];

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const item = cart.find(i => i.id === productId);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  renderCart();
}

function removeFromCart(productId) {
  const itemIndex = cart.findIndex(i => i.id === productId);
  if (itemIndex > -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity--;
    } else {
      cart.splice(itemIndex, 1);
    }
  }
  renderCart();
}

function renderProducts() {
  const carousel = document.getElementById('carousel');
  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    carousel.appendChild(div);
  });
}

function renderCart() {
  const cartModal = document.getElementById('cart');
  const cartItemsContainer = cartModal.querySelector('#cart-items');
  cartItemsContainer.innerHTML = ''; // Clear previous items
  
  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x ${item.quantity}</span>
      <button onclick="removeFromCart(${item.id})">-</button>
      <span>${item.quantity}</span>
      <button onclick="addToCart(${item.id})">+</button>
    `;
    cartItemsContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  document.getElementById('total').textContent = total.toFixed(2);
}

function closeCart() {
  const cartModal = document.getElementById('cart');
  cartModal.classList.remove('open');
}

function showThankYouMessage() {
  alert("Thanks for your purchase!");
  cart.length = 0;  // Clear cart after purchase
  renderCart();
}

// Cart button event listener to open the cart modal
document.querySelector('.burger').addEventListener('click', () => {
  const cartModal = document.getElementById('cart');
  cartModal.classList.toggle('open');
});

// Event listener for Close Cart button
document.getElementById('close-cart').addEventListener('click', closeCart);

// Event listener for Order button
document.getElementById('order-btn').addEventListener('click', () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;

  if (name && email) {
    showThankYouMessage();  // Show thank you message
  } else {
    alert("Please enter your name and email to complete the order.");
  }
});

// Initialize products on page load
renderProducts();

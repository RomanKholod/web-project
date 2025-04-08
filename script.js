const products = [
    { id: 1, name: 'Apple', price: 1.2, image: 'images/apple.jpg' },
    { id: 2, name: 'Banana', price: 0.8, image: 'images/banana.jpg' },
    { id: 3, name: 'Cherry', price: 2.5, image: 'images/cherry.jpg' },
    { id: 4, name: 'Strawberry', price: 3.0, image: 'images/strawberry.jpg' },
    { id: 5, name: 'Blackberry', price: 1.5, image: 'images/blackberry.jpg' },
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
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      total += item.price * item.quantity;
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <span>${item.name} x${item.quantity}</span>
        <div>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
          <button onclick="removeFromCart(${item.id})">-</button>
          <button onclick="addToCart(${item.id})">+</button>
        </div>
      `;
      cartItems.appendChild(div);
    });
    document.getElementById('total').textContent = total.toFixed(2);
  }
  
  function toggleCart(forceShow = false) {
    const cartModal = document.querySelector('.cart');
    if (forceShow) {
      cartModal.classList.add('open');
    } else {
      cartModal.classList.toggle('open');
    }
  }
  
  renderProducts();
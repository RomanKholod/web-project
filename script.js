const products = [
  { id: 1, name: 'Apple', price: 1.2, image: 'images/apple.jpg' },
  { id: 2, name: 'Banana', price: 0.8, image: 'images/banana.jpg' },
  { id: 3, name: 'Cherry', price: 2.5, image: 'images/cherry.jpg' },
  { id: 4, name: 'Strawberry', price: 3.0, image: 'images/strawberry.jpg' },
  { id: 5, name: 'Blackberry', price: 1.5, image: 'images/blackberry.jpg' },
  { id: 6, name: 'Grapes', price: 2.0, image: 'images/grapes.jpg' },
  { id: 7, name: 'Orange', price: 1.3, image: 'images/orange.jpg' },
  { id: 8, name: 'Peach', price: 1.8, image: 'images/peach.jpg' },
  // Add more products here if needed
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

// Dynamic carousel for displaying images
function renderDynamicCarousel() {
  const dynamicCarousel = document.getElementById('dynamic-carousel');
  dynamicCarousel.innerHTML = ''; // Clear existing content

  products.forEach(product => {
    const div = document.createElement('div');
    div.className = 'image-slide';
    div.innerHTML = `<img src="${product.image}" alt="${product.name}" />`;
    dynamicCarousel.appendChild(div);
  });

  // After rendering, adjust the initial slide position
  showSlide();
}

// Carousel navigation logic
let currentSlide = 0;

function showSlide() {
  const slides = document.querySelectorAll('.image-slide');
  const totalSlides = slides.length;
  const dynamicCarousel = document.querySelector('.dynamic-carousel');
  dynamicCarousel.style.transform = `translateX(-${currentSlide * (100 / 4)}%)`; // Adjust width for 4 or 3 items
}

function nextSlide() {
  const slides = document.querySelectorAll('.image-slide');
  const totalSlides = slides.length;
  if (currentSlide < totalSlides - 4) { // Adjust based on 4 visible items at once
    currentSlide++;
  } else {
    currentSlide = 0;
  }
  showSlide();
}

function prevSlide() {
  const slides = document.querySelectorAll('.image-slide');
  const totalSlides = slides.length;
  if (currentSlide > 0) {
    currentSlide--;
  } else {
    currentSlide = totalSlides - 4; // Loop back to last visible set
  }
  showSlide();
}

// Initialize everything
renderProducts();
renderDynamicCarousel();

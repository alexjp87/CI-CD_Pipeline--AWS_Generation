let collisionEnabled = true;
let darkTheme = true;

function createShape(container) {
    const shape = document.createElement('div');
    const size = Math.random() * 50 + 20;
    shape.classList.add('shape');
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.top = `${Math.random() * (container.offsetHeight - size)}px`;
    shape.style.left = `${Math.random() * (container.offsetWidth - size)}px`;
    shape.velocityX = (Math.random() - 0.5) * 4;
    shape.velocityY = (Math.random() - 0.5) * 4;
    shape.size = size;
    container.appendChild(shape);
    return shape;
}

function moveShape(shape, container) {
    const maxWidth = container.offsetWidth;
    const maxHeight = container.offsetHeight;

    let currentLeft = parseFloat(shape.style.left);
    let currentTop = parseFloat(shape.style.top);

    currentLeft += shape.velocityX;
    currentTop += shape.velocityY;

    if (currentLeft <= 0 || currentLeft + shape.offsetWidth >= maxWidth) {
        shape.velocityX *= -1;
    }
    if (currentTop <= 0 || currentTop + shape.offsetHeight >= maxHeight) {
        shape.velocityY *= -1;
    }

    shape.style.left = `${currentLeft}px`;
    shape.style.top = `${currentTop}px`;
}

function detectCollision(shape1, shape2) {
    const rect1 = {
        x: parseFloat(shape1.style.left),
        y: parseFloat(shape1.style.top),
        width: shape1.offsetWidth,
        height: shape1.offsetHeight
    };
    const rect2 = {
        x: parseFloat(shape2.style.left),
        y: parseFloat(shape2.style.top),
        width: shape2.offsetWidth,
        height: shape2.offsetHeight
    };

    const dx = rect1.x - rect2.x;
    const dy = rect1.y - rect2.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (rect1.width / 2 + rect2.width / 2);
}

function handleCollision(shape1, shape2) {
    const tempVx = shape1.velocityX;
    const tempVy = shape1.velocityY;

    shape1.velocityX = shape2.velocityX;
    shape1.velocityY = shape2.velocityY;

    shape2.velocityX = tempVx;
    shape2.velocityY = tempVy;

    // Color change logic on collision
    const h2Elements = document.querySelectorAll('#overlay-container h2');
    const pElements = document.querySelectorAll('#overlay-container p');

    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Generate random color

    h2Elements.forEach(h2 => h2.style.color = randomColor);
    pElements.forEach(p => p.style.color = randomColor);
}

function animateShapes() {
  const container = document.getElementById('container');
  const shapes = [];

  for (let i = 0; i < 3; i++) {
      shapes.push(createShape(container));
  }

  function update() {
      shapes.forEach((shape, index) => {
          moveShape(shape, container);

          if (collisionEnabled) {
              for (let j = index + 1; j < shapes.length; j++) {
                  if (detectCollision(shape, shapes[j])) {
                      handleCollision(shape, shapes[j]);
                  }
              }
          }
      });

      requestAnimationFrame(update);
  }

  update();
}

function toggleCollisions() {
  collisionEnabled = !collisionEnabled;
  const btn = document.getElementById('toggleCollisionBtn');
  btn.textContent = collisionEnabled ? 'Disable Collisions' : 'Enable Collisions';
}

function toggleTheme() {
  darkTheme = !darkTheme;
  const body = document.body;
  const container = document.getElementById('container');
  const shapes = document.querySelectorAll('.shape');
  const toggleCollisionBtn = document.getElementById('toggleCollisionBtn');
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  const changeColorBtn = document.getElementById('changeColorBtn');
  const resetColorBtn = document.getElementById('resetColorBtn');
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navbar = document.querySelector('.navbar'); // Added line for nav bar

  // Toggle between light mode and dark mode
  body.classList.toggle('light-mode');
  container.classList.toggle('light-mode');
  shapes.forEach(shape => shape.classList.toggle('light-mode'));
  toggleCollisionBtn.classList.toggle('light-mode');
  toggleThemeBtn.classList.toggle('light-mode');
  toggleThemeBtn.textContent = darkTheme ? 'Light Mode' : 'Dark Mode';
  changeColorBtn.classList.toggle('light-mode');
  resetColorBtn.classList.toggle('light-mode');

  // Toggle dark mode for hamburger bars
  hamburgerMenu.classList.toggle('dark-mode', !darkTheme);

  // Toggle dark mode for navbar
  navbar.classList.toggle('dark-mode', !darkTheme); // Added line for toggling dark mode on navbar
}

function changeColors() {
const container = document.getElementById('container');
const shapes = document.querySelectorAll('.shape');

const randomBorderColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
container.style.borderColor = randomBorderColor;

shapes.forEach(shape => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    shape.style.backgroundColor = randomColor;
});
}

function resetColors() {
const container = document.getElementById('container');
const shapes = document.querySelectorAll('.shape');

if (darkTheme) {
    // Dark mode reset
    container.style.borderColor = '#f1f1f1';
    shapes.forEach(shape => shape.style.backgroundColor = '#f1f1f1');
} else {
    // Light mode reset
    container.style.borderColor = '#1a1a1a';
    shapes.forEach(shape => shape.style.backgroundColor = '#1a1a1a');
}
}

window.onload = () => {
animateShapes();

// Hamburger Menu Toggle
const hamburgerMenu = document.getElementById('hamburgerMenu');
const fullPageMenu = document.getElementById('fullPageMenu');

hamburgerMenu.addEventListener('click', () => {
    fullPageMenu.classList.toggle('show');
});

document.getElementById('toggleCollisionBtn').addEventListener('click', toggleCollisions);
document.getElementById('toggleThemeBtn').addEventListener('click', toggleTheme);
document.getElementById('changeColorBtn').addEventListener('click', changeColors);
document.getElementById('resetColorBtn').addEventListener('click', resetColors);
};

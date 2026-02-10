// Script.js - Paarees Perfumes Main Logic File
// This file handles: Products, Cart, Filters, UI Rendering, and Utilities.

/* ==========================================================================
   1. PRODUCTS DATA (Saman ki maloomat)
   ========================================================================== */

// Brands and Categories lists
const brands = ['Versace', 'Gucci', 'Dior', 'CK'];
const categories = ['Female', 'Male', 'Common']; 

// All product images filenames
const productImages = [
    'CKFEMALE1.jpg', 'CKFEMALE2.jpg', 'CKFEMALE3.jpg', 'CKFEMALE4.jpg', 'CKFEMALE5.jpg', 'CKFEMALE6.jpg',
    'CKMALE1.jpg', 'CKMALE2.jpg', 'CKMALE3.jpg', 'CKMALE4.png', 'CKMALE6.jpg', 'CKMALE7.png', 'CKMALE8.jpg', 'CKMALE9.jpg', 'CKMALE10.jpg', 'CKMALE11.jpg',
    'DIORFEMALE2.png', 'DIORFEMALE3.jpg', 'DIORFEMALE4.jpg', 'DIORFEMALE6.png', 'DIORFEMALE7.jpg', 'DIORFEMALE8.jpg', 'DIORFEMALE9.jpg',
    'DIORMALE1.jpeg', 'DIORMALE2.jpg', 'DIORMALE3.jpg', 'DIORMALE4.jpg', 'DIORMALE5.png', 'DIORMALE6.png', 'DIORMALE7.jpg', 'DIORMALE8.jpg',
    'GUCCIFEMALE.jpg', 'GUCCIFEMALE1.jpg', 'GUCCIFEMALE2.jpg', 'GUCCIFEMALE3.jpg', 'GUCCIFEMALE5.jpg', 'GUCCIFEMALE6.png',
    'GUCCIMALE1.jpg', 'GUCCIMALE2.png', 'GUCCIMALE3.jpg', 'GUCCIMALE4.jpg', 'GUCCIMALE5.png', 'GUCCIMALE6.png', 'GUCCIMALE7.jpg', 'GUCCIMALE8.jpg', 'GUCCIMALE9.jpg',
    'VERSACEFEMALE1.jpg', 'VERSACEFEMALE2.jpg', 'VERSACEFEMALE3.jpg', 'VERSACEFEMALE4.jpg', 'VERSACEFEMALE5.jpg', 'VERSACEFEMALE6.jpg', 'VERSACEFEMALE7.jpg',
    'VERSACEMALE1.jpg', 'VERSACEMALE2.jpg', 'VERSACEMALE3.jpg', 'VERSACEMALE4.jpg', 'VERSACEMALE5.jpg', 'VERSACEMALE6.jpg', 'VERSACEMALE7.jpg'
];

// This array will hold our final product objects
// Is array mein hamary perfumes ki sari details store hongi
const products = [];
let idCounter = 1;

// Automating product creation from filenames
// Filenames se perfumes ka data khud ba khud banane ka tareeqa
productImages.forEach(filename => {
    let brand = '';
    let category = '';
    
    // Check Brand from filename (FileName se brand check ho raha hai)
    if (filename.startsWith('CK')) brand = 'CK';
    else if (filename.startsWith('DIOR')) brand = 'Dior';
    else if (filename.startsWith('GUCCI')) brand = 'Gucci';
    else if (filename.startsWith('VERSACE')) brand = 'Versace';
    
    // Check Category/Gender (Male hai ya Female)
    if (filename.includes('FEMALE')) category = 'Female';
    else if (filename.includes('MALE')) category = 'Male';
    
    // Random Price and Rating (Farzi qeemat aur rating)
    let randomPrice = Math.floor(Math.random() * 200) + 80;
    let randomRating = (Math.random() * (5 - 4) + 4).toFixed(1);
    
    // Add to products array
    products.push({
        id: idCounter++,
        brand: brand,
        name: `${brand} ${category} Edition`,
        subName: 'Eau De Parfum',
        category: category,
        price: `$${randomPrice}.00`,
        image: `images/${filename}`,
        rating: randomRating
    });
});

/* ==========================================================================
   2. GLOBAL STATE (App ki halat)
   ========================================================================== */

let cart = []; // Shopping cart items
let currentBrand = 'all'; // Currently selected brand filter
let currentCat = 'all';   // Currently selected category filter

// Detect brand from URL (e.g., brands.html?brand=Dior)
try {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    if (brandParam) currentBrand = brandParam;
} catch (e) {
    console.log('URL Search Params error:', e);
}

/* ==========================================================================
   3. UI RENDERING (Cheezein screen par dikhana)
   ========================================================================== */

// Renders the Navigation Bar (Menu bar banata hai)
function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    const path = window.location.pathname;
    const isActive = (page) => path.includes(page) ? 'active' : '';

    navbarContainer.innerHTML = `
    <style>
        @media (min-width: 992px) {
            .dropdown:hover .dropdown-menu { display: block; margin-top: 0; }
        }
        /* Black Hamburger Fix */
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }
        [data-bs-theme="dark"] .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(212, 175, 55, 1)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e") !important;
        }
    </style>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="images/LOGO.png" alt="Paarees Logo" style="height: 50px; width: auto;">
            </a>

            <!-- Icons container: Stays outside hamburger on mobile -->
            <div class="d-flex align-items-center order-lg-last ms-auto">
                <button class="nav-icon-btn px-2" type="button" onclick="toggleTheme()" id="theme-toggle-btn">
                    <i class="fas fa-moon"></i>
                </button>
                <button class="nav-icon-btn px-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                    <i class="fas fa-shopping-bag"></i>
                    <span class="cart-badge" id="cart-count">0</span>
                </button>
                
                <!-- Toggler Button -->
                <button class="navbar-toggler border-0 ms-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>

            <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item"><a class="nav-link ${isActive('index.html')}" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link ${isActive('about.html')}" href="about.html">About Us</a></li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle ${isActive('brands.html')}" href="brands.html" id="navbarDropdown" role="button">Brands</a>
                        <ul class="dropdown-menu animate__animated animate__fadeIn">
                            <li><a class="dropdown-item" href="brands.html?brand=Versace">Versace</a></li>
                            <li><a class="dropdown-item" href="brands.html?brand=Dior">Dior</a></li>
                            <li><a class="dropdown-item" href="brands.html?brand=Gucci">Gucci</a></li>
                            <li><a class="dropdown-item" href="brands.html?brand=CK">CK</a></li>
                            <li><hr class="dropdown-divider bg-secondary opacity-25"></li>
                            <li><a class="dropdown-item" href="brands.html">View All</a></li>
                        </ul>
                    </li>
                    <li class="nav-item"><a class="nav-link ${isActive('gallery.html')}" href="gallery.html">Gallery</a></li>
                    <li class="nav-item"><a class="nav-link ${isActive('contact.html')}" href="contact.html">Location</a></li>
                    <li class="nav-item ms-lg-3 d-none d-lg-block">
                        <a href="brands.html" class="btn-gold">Shop Now</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;
    updateThemeIcon();
}

/* ==========================================================================
   THEME MANAGEMENT (Dark/Light Mode)
   ========================================================================== */

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-bs-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('paarees-theme', newTheme);
    updateThemeIcon();
}

function applyTheme() {
    const savedTheme = localStorage.getItem('paarees-theme') || 'light';
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
}

function updateThemeIcon() {
    const btn = document.getElementById('theme-toggle-btn');
    if (!btn) return;
    
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

// Renders the Footer (Neeche wala hissa)
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-3 col-md-6 mb-5 mb-lg-0">
                    <h5 class="brand-font display-6 mb-4">PAAREES</h5>
                    <p class="small text-muted mb-4">The ultimate destination for luxury fragrances. iconic perfume houses.</p>
                    <div>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h5 class="text-uppercase small mb-4" style="letter-spacing: 2px;">Quick Links</h5>
                    <ul class="list-unstyled">
                        <li><a href="index.html" class="text-muted small text-decoration-none d-block mb-2">Home</a></li>
                        <li><a href="about.html" class="text-muted small text-decoration-none d-block mb-2">About Us</a></li>
                        <li><a href="gallery.html" class="text-muted small text-decoration-none d-block mb-2">Gallery</a></li>
                        <li><a href="contact.html" class="text-muted small text-decoration-none d-block mb-2">Location</a></li>
                        <li><a href="#" onclick="downloadPriceList()" class="text-gold small text-decoration-none d-block mt-3"><i class="fas fa-file-download me-2"></i>Price List</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h5 class="text-uppercase small mb-4" style="letter-spacing: 2px;">Brands</h5>
                    <ul class="list-unstyled">
                        <li><a href="brands.html?brand=Versace" class="text-muted small text-decoration-none d-block mb-2">Versace</a></li>
                        <li><a href="brands.html?brand=Gucci" class="text-muted small text-decoration-none d-block mb-2">Gucci</a></li>
                        <li><a href="brands.html?brand=Dior" class="text-muted small text-decoration-none d-block mb-2">Dior</a></li>
                        <li><a href="brands.html?brand=CK" class="text-muted small text-decoration-none d-block mb-2">Calvin Klein</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-6 mb-4">
                    <h5 class="text-uppercase small mb-4" style="letter-spacing: 2px;">Legal</h5>
                    <ul class="list-unstyled">
                        <li><a href="privacy.html" class="text-muted small text-decoration-none d-block mb-2">Privacy Policy</a></li>
                        <li><a href="terms.html" class="text-muted small text-decoration-none d-block mb-2">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-lg-3 col-md-6">
                    <h5 class="text-uppercase small mb-4" style="letter-spacing: 2px;">Newsletter</h5>
                    <div class="input-group">
                        <input type="email" id="newsletter-email" class="form-control bg-card border-secondary text-main rounded-0" placeholder="EMAIL ADDRESS">
                        <button class="btn btn-gold border-0" onclick="joinNewsletter()">JOIN</button>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-4 mt-5 text-center">
                <p class="small text-muted">&copy; 2026 Paarees Perfumes. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
    `;
}

// Newsletter join with mailto (Newsletter join function)
function joinNewsletter() {
    const emailInput = document.getElementById('newsletter-email');
    const email = emailInput.value.trim();
    
    // Strict Email regex validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if (email === "") {
        showToast("Please enter your email address.", "error");
        emailInput.focus();
    } else if (!emailRegex.test(email)) {
        showToast("Invalid email format. Please use example@mail.com", "error");
        emailInput.focus();
    } else {
        window.location.href = `mailto:info@paareesperfumes.com?subject=Newsletter Join Request&body=I would like to join the newsletter. My email is: ${email}`;
        showToast("Opening mail client...");
        emailInput.value = ""; 
    }
}

// Contact Form Validation (Contact form check karne ka tareeqa)
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('contact-name');
        const email = document.getElementById('contact-email');
        const message = document.getElementById('contact-message');
        let isValid = true;

        // Reset previous errors
        [name, email, message].forEach(el => {
            el.classList.remove('is-invalid');
            if (el.nextElementSibling) el.nextElementSibling.innerText = "";
        });

        // Name validation: ONLY characters and spaces allowed
        const nameRegex = /^[a-zA-Z\s]{3,30}$/;
        if (!nameRegex.test(name.value.trim())) {
            showError(name, "Name must be 3-30 characters and contain only letters.");
            isValid = false;
        }

        // Email validation: Strict Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, "Please enter a valid email address.");
            isValid = false;
        }

        // Message validation
        if (message.value.trim().length < 10) {
            showError(message, "Message must be at least 10 characters.");
            isValid = false;
        }

        if (isValid) {
            const mailtoLink = `mailto:info@paareesperfumes.com?subject=Contact Inquiry from ${name.value.trim()}&body=Name: ${name.value.trim()}%0D%0AEmail: ${email.value.trim()}%0D%0AMessage: ${message.value.trim()}`;
            window.location.href = mailtoLink;
            showToast("Opening mail client...");
            form.reset();
        } else {
            showToast("Please fix the errors in the form.", "error");
        }
    });
}

function showError(input, message) {
    input.classList.add('is-invalid');
    if (input.nextElementSibling) {
        input.nextElementSibling.innerText = message;
        input.nextElementSibling.style.display = 'block';
        input.nextElementSibling.style.color = '#dc3545';
        input.nextElementSibling.style.fontSize = '0.8rem';
        input.nextElementSibling.style.marginTop = '5px';
    }
}

// Renders Filter Buttons (Side bar ke buttons)
function renderFilters() {
    const brandContainer = document.getElementById('brand-filters');
    const catContainer = document.getElementById('cat-filters');
    if(!brandContainer || !catContainer) return;

    // Brand radio buttons
    let brandHTML = `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="brandFilter" value="all" checked onchange="updateFilter('brand','all')"> All Brands</label>`;
    brands.forEach(b => {
        brandHTML += `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="brandFilter" value="${b}" onchange="updateFilter('brand','${b}')"> ${b}</label>`;
    });
    brandContainer.innerHTML = brandHTML;

    // Category radio buttons
    let catHTML = `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="catFilter" value="all" checked onchange="updateFilter('cat','all')"> Common</label>`;
    ['Female', 'Male'].forEach(c => {
        catHTML += `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="catFilter" value="${c}" onchange="updateFilter('cat','${c}')"> ${c}</label>`;
    });
    catContainer.innerHTML = catHTML;

    // Mobile filters copy
    const mobileBrand = document.getElementById('mobile-brand-filters');
    const mobileCat = document.getElementById('mobile-cat-filters');
    if(mobileBrand) mobileBrand.innerHTML = brandHTML;
    if(mobileCat) mobileCat.innerHTML = catHTML;
}

// Main function to show products (Saman dikhane wala main function)
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    const isBrandsPage = window.location.pathname.includes('brands.html');
    grid.innerHTML = ''; 
    
    const isDefaultView = currentBrand === 'all' && currentCat === 'all';

    if (isDefaultView) {
        // Show by Brand Sections
        brands.forEach(brand => {
            const brandProducts = products.filter(p => p.brand === brand);
            if (brandProducts.length === 0) return;

            const section = document.createElement('div');
            section.className = 'mb-5 animate__animated animate__fadeInUp';
            section.innerHTML = `
                <div class="d-flex justify-content-between align-items-end mb-4 border-bottom border-secondary pb-2">
                    <div>
                        <h3 class="text-heading mb-0 brand-font">${brand}</h3>
                        <small class="text-gold text-uppercase">Signature Collection</small>
                    </div>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4" id="brand-grid-${brand}"></div>
            `;
            grid.appendChild(section);

            const brandGrid = document.getElementById(`brand-grid-${brand}`);
            brandProducts.forEach((p, index) => {
                const col = createProductCard(p);
                if (index >= 4 && !isBrandsPage) {
                    col.classList.add('d-none'); 
                    col.classList.add(`hidden-items-${brand}`);
                }
                brandGrid.appendChild(col);
            });

            if (brandProducts.length > 4 && !isBrandsPage) {
                const btnContainer = document.createElement('div');
                btnContainer.className = 'text-center mt-4';
                btnContainer.innerHTML = `<button onclick="toggleBrand('${brand}', this)" class="btn btn-outline-secondary rounded-0 px-5 text-uppercase">Show More ${brand}</button>`;
                section.appendChild(btnContainer);
            }
        });
    } else {
        // Show Filtered Grid
        grid.className = 'row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-3 g-4';
        const filtered = products.filter(p => {
            let matchBrand = (currentBrand === 'all' || p.brand === currentBrand);
            let matchCat = (currentCat === 'all' || p.category === currentCat);
            return matchBrand && matchCat;
        });

        if (filtered.length === 0) {
            grid.innerHTML = '<div class="col-12 text-center text-muted py-5">No items match selection.</div>';
            return;
        }

        filtered.forEach(p => grid.appendChild(createProductCard(p)));
    }
}

// Renders the Full Gallery Page (Pori gallery dikhata hai)
function renderFullGallery() {
    const container = document.getElementById('full-gallery-container');
    if (!container) return;

    if (products.length < 4) {
        container.innerHTML = `<div class="row g-3">${products.map((p, i) => renderGalleryItem(p, i, true)).join('')}</div>`;
        return;
    }

    // Separate last 3 products to ensure they end in a straight line
    const mainProducts = products.slice(0, -3);
    const last3 = products.slice(-3);

    // Distribute main products into 3 columns for staggered look
    const col1 = mainProducts.filter((_, i) => i % 3 === 0);
    const col2 = mainProducts.filter((_, i) => i % 3 === 1);
    const col3 = mainProducts.filter((_, i) => i % 3 === 2);

    container.innerHTML = `
        <div class="lux-gallery mb-3">
            <div class="lux-gallery-column">
                ${col1.map((p, i) => renderGalleryItem(p, i)).join('')}
            </div>
            <div class="lux-gallery-column">
                ${col2.map((p, i) => renderGalleryItem(p, i)).join('')}
            </div>
            <div class="lux-gallery-column">
                ${col3.map((p, i) => renderGalleryItem(p, i)).join('')}
            </div>
        </div>
        
        <!-- Final Row: Perfectly Aligned -->
        <div class="row g-3">
            ${last3.map((p, i) => `
                <div class="col-md-4">
                    ${renderGalleryItem(p, i, true)}
                </div>
            `).join('')}
        </div>
    `;
}

// Helper function to render a single gallery item
function renderGalleryItem(p, index, forceSquare = false) {
    const style = forceSquare ? 'aspect-ratio: 1/1; object-fit: cover;' : '';
    return `
        <div class="lux-gallery-item animate__animated animate__fadeInUp" style="animation-delay: ${0.05 * (index % 10)}s;">
            <img src="${p.image}" alt="${p.name}" loading="lazy" style="width:100%; ${style}">
            <div class="item-info">
                <small class="text-uppercase text-gold" style="letter-spacing: 2px;">${p.brand}</small>
                <h6 class="brand-font mb-0">${p.name}</h6>
            </div>
        </div>
    `;
}

/* ==========================================================================
   4. HELPER FUNCTIONS (Madadgaar Functions)
   ========================================================================== */

// Logic for filter update (Filter badalne ki logic)
function updateFilter(type, value) {
    if(type === 'brand') currentBrand = value;
    if(type === 'cat') currentCat = value;
    renderProducts();
}

// Creates the HTML for a single product card (Ek perfume ka card banata hai)
function createProductCard(p) {
    const div = document.createElement('div');
    div.className = 'col animate__animated animate__fadeInUp';
    div.innerHTML = `
        <div class="product-card">
            <span class="card-badge">${p.brand}</span>
            <div class="card-img-wrapper">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
            </div>
            <div class="card-info">
                <span class="card-brand">${p.category} Collection</span>
                <h5 class="card-title">${p.name}</h5>
                <div class="card-rating">${getStars(p.rating)} <span class="text-muted ms-1">(${p.rating})</span></div>
                <div class="card-price mb-2">${p.price}</div>
                <div class="d-flex gap-2">
                    <button onclick="downloadDetails(${p.id})" class="btn-card flex-grow-1">View Specs</button>
                    <button onclick="addToCart(${p.id})" class="btn-add-cart flex-grow-1" style="margin-top: 10px;">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return div;
}

// Toggle "Show More" items (Ziyada items dikhane ya chupane ke liye)
function toggleBrand(brand, btnElement) {
    const hiddenItems = document.querySelectorAll(`.hidden-items-${brand}`);
    let isExpanding = btnElement.innerText.includes('SHOW MORE'); 

    hiddenItems.forEach(item => {
        if (isExpanding) { item.classList.remove('d-none'); item.classList.add('animate__fadeIn'); }
        else { item.classList.add('d-none'); }
    });
    btnElement.innerText = isExpanding ? `SHOW LESS ${brand.toUpperCase()}` : `SHOW MORE ${brand.toUpperCase()}`;
}

// Generate star icons based on rating (Rating ke mutabiq sitary banata hai)
function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i < rating) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

/* ==========================================================================
   5. CART FUNCTIONS (Shopping Cart ka kaam)
   ========================================================================== */

// Add item to cart (Saman cart mein dalein)
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.qty++;
        showToast(`Increased quantity of ${product.name}`);
    } else {
        cart.push({ ...product, qty: 1 });
        showToast(`Added ${product.name} to cart`);
    }
    updateCartUI();
}

// Change quantity in cart (+ ya - button)
function changeQty(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        if (cart[itemIndex].qty <= 0) cart.splice(itemIndex, 1);
        updateCartUI();
    }
}

// Refresh Cart UI (Cart ki screen update karein)
function updateCartUI() {
    const badge = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if(badge) badge.innerText = totalItems;

    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center text-muted mt-5"><p>Your cart is empty.</p></div>`;
        totalEl.innerText = '$0.00';
        return;
    }

    let html = '<ul class="list-group list-group-flush">';
    let total = 0;
    cart.forEach(item => {
        const priceVal = parseFloat(item.price.replace('$',''));
        const itemTotal = priceVal * item.qty;
        total += itemTotal;
        html += `
            <li class="list-group-item d-flex align-items-center bg-transparent border-secondary ps-0 pe-0">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0 brand-font text-heading">${item.name}</h6>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <div class="btn-group btn-group-sm border border-secondary">
                             <button class="btn btn-outline-secondary border-0" onclick="changeQty(${item.id}, -1)">-</button>
                             <button class="btn btn-outline-secondary border-0 disabled text-dark">${item.qty}</button>
                             <button class="btn btn-outline-secondary border-0" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                        <span class="text-gold">$${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
            </li>
        `;
    });
    container.innerHTML = html + '</ul>';
    totalEl.innerText = '$' + total.toFixed(2);
}

// Checkout function (Order mukammal karein aur cart khali karein)
function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    showToast("Proceeding to Checkout...");
    cart = []; // Empty the cart
    updateCartUI(); // Update UI
}

/* ==========================================================================
   6. UTILITIES (Choti madadgaar cheezein)
   ========================================================================== */

// Download Full Price List as Word Document
function downloadPriceList() {
    showToast("Generating Price List...");
    
    let content = `
        <div style="font-family: 'Times New Roman', serif; padding: 40px;">
            <h1 style="color: #D4AF37; text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">PAAREES PERFUMES</h1>
            <h2 style="text-align: center; color: #333;">Official Price List - 2026</h2>
            <br>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr style="background-color: #f8f9fa;">
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Brand</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Product Name</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Collection</th>
                        <th style="border: 1px solid #ddd; padding: 12px; text-align: right;">Price</th>
                    </tr>
                </thead>
                <tbody>
    `;

    products.forEach(p => {
        content += `
            <tr>
                <td style="border: 1px solid #ddd; padding: 10px;">${p.brand}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${p.name}</td>
                <td style="border: 1px solid #ddd; padding: 10px;">${p.category}</td>
                <td style="border: 1px solid #ddd; padding: 10px; text-align: right; font-weight: bold;">${p.price}</td>
            </tr>
        `;
    });

    content += `
                </tbody>
            </table>
            <br>
            <p style="text-align: center; color: #666; font-style: italic;">All perfumes are 100% authentic imported originals.</p>
            <p style="text-align: center; font-size: 10pt;">&copy; 2026 Paarees Perfumes Paris - Karachi</p>
        </div>
    `;

    const header = "<html><head><meta charset='utf-8'></head><body>";
    const footer = "</body></html>";
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + content + footer);
    
    const fileDownload = document.createElement("a");
    fileDownload.href = source;
    fileDownload.download = `Paarees_Perfumes_Price_List.doc`;
    fileDownload.click();
}

// Download Product Details as Word Document
// Saman ki maloomat Word file mein download karein
function downloadDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    showToast(`Downloading specs for ${product.name}...`);
    const absoluteImgPath = new URL(product.image, window.location.href).href;

    const content = `
        <div style="font-family: Arial; padding: 20px;">
            <h1 style="color: #D4AF37;">${product.name}</h1>
            <p><strong>Brand:</strong> ${product.brand}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <img src="${absoluteImgPath}" width="200">
            <p>100% Authentic Imported Perfume.</p>
        </div>
    `;

    const header = "<html><body>";
    const footer = "</body></html>";
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(header + content + footer);
    
    const fileDownload = document.createElement("a");
    fileDownload.href = source;
    fileDownload.download = `${product.name}_Specs.doc`;
    fileDownload.click();
}

// Show simple popup notification (Chota sa message dikhane ke liye)
function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    const iconEl = document.getElementById('toast-icon');
    const titleEl = document.getElementById('toast-title');
    
    if(!t || !msgEl) return;
    
    msgEl.innerText = msg;
    
    if (type === 'error') {
        t.style.borderLeftColor = '#dc3545';
        if (iconEl) { iconEl.className = 'fas fa-exclamation-circle text-danger me-3 fa-lg'; }
        if (titleEl) { titleEl.innerText = 'Error'; }
    } else {
        t.style.borderLeftColor = 'var(--gold)';
        if (iconEl) { iconEl.className = 'fas fa-check-circle text-warning me-3 fa-lg'; }
        if (titleEl) { titleEl.innerText = 'Success'; }
    }
    
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
}

// Hide the loading screen (Loading screen hatane ke liye)
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0'; 
        setTimeout(() => { preloader.style.display = 'none'; }, 800);
    }
}

// Animation Observer (Scroll par cheezein zahir karne ke liye)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });

/* ==========================================================================
   7. INITIALIZATION (Shuruat)
   ========================================================================== */

// When the page loads (Jab page khul jaye)
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    try {
        renderNavbar();
        renderFooter();
        renderFilters();
        renderProducts();
        renderFullGallery();
        initContactForm();
        
        // Start animation tracking
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    } catch (error) {
        console.error("Initialization error:", error);
    } finally {
        // Handle Preloader logic - ALWAYS hide even if error
        const path = window.location.pathname;
        if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
            setTimeout(hidePreloader, 1000);
        } else {
            hidePreloader();
        }
    }
});

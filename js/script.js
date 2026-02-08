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
    </style>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <a class="navbar-brand" href="index.html">
                <img src="images/LOGO.png" alt="Paarees Logo" style="height: 50px; width: auto;">
            </a>
            <button class="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon" style="filter: invert(0.5);"></span>
            </button>
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
                    <li class="nav-item">
                        <button class="nav-icon-btn" type="button" data-bs-toggle="offcanvas" data-bs-target="#cartOffcanvas">
                            <i class="fas fa-shopping-bag"></i>
                            <span class="cart-badge" id="cart-count">0</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    `;
}

// Renders the Footer (Neeche wala hissa)
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <h5 class="brand-font display-6 mb-4">PAAREES</h5>
                    <p class="small text-muted mb-4">The ultimate destination for luxury fragrances. iconic perfume houses.</p>
                    <div>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-4 mb-4">
                    <h5 class="text-uppercase">Collections</h5>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Best Sellers</a></li>
                        <li><a href="#">Men's Cologne</a></li>
                        <li><a href="#">Women's Parfum</a></li>
                    </ul>
                </div>
                <div class="col-lg-2 col-md-4 mb-4">
                    <h5 class="text-uppercase">Legal</h5>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-uppercase">Newsletter</h5>
                    <div class="input-group">
                        <input type="email" class="form-control bg-card border-secondary text-main rounded-0" placeholder="EMAIL ADDRESS">
                        <button class="btn btn-gold border-0">JOIN</button>
                    </div>
                </div>
            </div>
            <div class="border-top border-secondary pt-4 mt-5 text-center">
                <p class="small text-muted">&copy; 2024 Paarees Perfumes. All Rights Reserved.</p>
            </div>
        </div>
    </footer>
    `;
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

    container.innerHTML = ''; 
    brands.forEach(brand => {
        const brandProducts = products.filter(p => p.brand === brand);
        if (brandProducts.length === 0) return;

        const header = document.createElement('div');
        header.className = 'gallery-brand-header animate__animated animate__fadeInUp';
        header.innerHTML = `<h3 class="brand-font text-heading">${brand}</h3>`;
        container.appendChild(header);

        const row = document.createElement('div');
        row.className = 'row g-3 mb-5';
        brandProducts.forEach((p, index) => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3 animate__animated animate__fadeInUp';
            col.style.animationDelay = `${0.1 * (index % 4)}s`;
            col.innerHTML = `<div class="full-gallery-item"><img src="${p.image}" alt="${p.name}" loading="lazy"></div>`;
            row.appendChild(col);
        });
        container.appendChild(row);
    });
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
    if(!t || !msgEl) return;
    
    msgEl.innerText = msg;
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
    renderNavbar();
    renderFooter();
    renderFilters();
    renderProducts();
    renderFullGallery();
    
    // Start animation tracking
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Handle Preloader logic
    const path = window.location.pathname;
    if (path.includes('index.html') || path === '/' || path.endsWith('/')) {
        setTimeout(hidePreloader, 1500);
    } else {
        hidePreloader();
    }
});

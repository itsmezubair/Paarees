// Script.js - Main JavaScript File

/* =========================================
   1. GLOBAL VARIABLES & DATA
   ========================================= */

const brands = ['Versace', 'Gucci', 'Dior', 'CK'];
const categories = ['Female', 'Male', 'Common']; 
const products = [];

// Exact filenames from the images folder
const productImages = [
    // CK
    'CKFEMALE1.jpg', 'CKFEMALE2.jpg', 'CKFEMALE3.jpg', 'CKFEMALE4.jpg', 'CKFEMALE5.jpg', 'CKFEMALE6.jpg',
    'CKMALE1.jpg', 'CKMALE2.jpg', 'CKMALE3.jpg', 'CKMALE4.png', 'CKMALE6.jpg', 'CKMALE7.png', 'CKMALE8.jpg', 'CKMALE9.jpg', 'CKMALE10.jpg', 'CKMALE11.jpg',
    // Dior
    'DIORFEMALE2.png', 'DIORFEMALE3.jpg', 'DIORFEMALE4.jpg', 'DIORFEMALE6.png', 'DIORFEMALE7.jpg', 'DIORFEMALE8.jpg', 'DIORFEMALE9.jpg',
    'DIORMALE1.jpeg', 'DIORMALE2.jpg', 'DIORMALE3.jpg', 'DIORMALE4.jpg', 'DIORMALE5.png', 'DIORMALE6.png', 'DIORMALE7.jpg', 'DIORMALE8.jpg',
    // Gucci
    'GUCCIFEMALE.jpg', 'GUCCIFEMALE1.jpg', 'GUCCIFEMALE2.jpg', 'GUCCIFEMALE3.jpg', 'GUCCIFEMALE5.jpg', 'GUCCIFEMALE6.png',
    'GUCCIMALE1.jpg', 'GUCCIMALE2.png', 'GUCCIMALE3.jpg', 'GUCCIMALE4.jpg', 'GUCCIMALE5.png', 'GUCCIMALE6.png', 'GUCCIMALE7.jpg', 'GUCCIMALE8.jpg', 'GUCCIMALE9.jpg',
    // Versace
    'VERSACEFEMALE1.jpg', 'VERSACEFEMALE2.jpg', 'VERSACEFEMALE3.jpg', 'VERSACEFEMALE4.jpg', 'VERSACEFEMALE5.jpg', 'VERSACEFEMALE6.jpg', 'VERSACEFEMALE7.jpg',
    'VERSACEMALE1.jpg', 'VERSACEMALE2.jpg', 'VERSACEMALE3.jpg', 'VERSACEMALE4.jpg', 'VERSACEMALE5.jpg', 'VERSACEMALE6.jpg', 'VERSACEMALE7.jpg'
];

let idCounter = 1;

// Generate products based on filenames
productImages.forEach(filename => {
    let brand = '';
    let category = '';
    
    // Determine Brand
    if (filename.startsWith('CK')) brand = 'CK';
    else if (filename.startsWith('DIOR')) brand = 'Dior';
    else if (filename.startsWith('GUCCI')) brand = 'Gucci';
    else if (filename.startsWith('VERSACE')) brand = 'Versace';
    
    // Determine Category (Gender)
    if (filename.includes('FEMALE')) category = 'Female';
    else if (filename.includes('MALE')) category = 'Male';
    
    // Generate Random Price/Rating
    let randomPrice = Math.floor(Math.random() * 200) + 80;
    let randomRating = (Math.random() * (5 - 4) + 4).toFixed(1);
    
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

// Cart State
let cart = [];

// Filter State
// Check URL Params for Brand Filter safely
let currentBrand = 'all';
let currentCat = 'all';

try {
    const urlParams = new URLSearchParams(window.location.search);
    const brandParam = urlParams.get('brand');
    if (brandParam) currentBrand = brandParam;
} catch (e) {
    console.log('URL Search Params not supported or error:', e);
}


/* =========================================
   2. UI RENDERING FUNCTIONS
   ========================================= */

// Function to render the Navbar
function renderNavbar() {
    const navbarContainer = document.getElementById('navbar-container');
    if (!navbarContainer) return;
    
    // Check current page for active class
    const path = window.location.pathname;
    const isActive = (page) => path.includes(page) ? 'active' : '';

    navbarContainer.innerHTML = `
    <style>
        /* Hover Dropdown for Desktop */
        @media (min-width: 992px) {
            .dropdown:hover .dropdown-menu {
                display: block;
                margin-top: 0; /* Remove Bootstrap's margin for smoother transition */
            }
        }
    </style>
    <nav class="navbar navbar-expand-lg fixed-top">
        <div class="container">
            <!-- Brand Logo -->
            <a class="navbar-brand" href="index.html">
                <img src="images/LOGO.png" alt="Paarees Logo" style="height: 50px; width: auto;">
            </a>

            <!-- Mobile Menu Button -->
            <button class="navbar-toggler border-0 ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                <span class="navbar-toggler-icon" style="filter: invert(0.5);"></span>
            </button>

            <!-- Menu Links -->
            <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
                <ul class="navbar-nav align-items-center">
                    <li class="nav-item"><a class="nav-link ${isActive('index.html')}" href="index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link ${isActive('about.html')}" href="about.html">About Us</a></li>
                    
                    <!-- Dropdown for Brands -->
                    <li class="nav-item dropdown">
                        <!-- Main Link goes to brands.html, Dropdown opens on hover via CSS -->
                        <a class="nav-link dropdown-toggle ${isActive('brands.html')}" href="brands.html" id="navbarDropdown" role="button" aria-expanded="false">
                            Brands
                        </a>
                        <ul class="dropdown-menu animate__animated animate__fadeIn" aria-labelledby="navbarDropdown">
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

// Function to render the Footer
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (!footerContainer) return;

    footerContainer.innerHTML = `
    <footer>
        <div class="container">
            <div class="row">
                <!-- Brand Info -->
                <div class="col-lg-4 mb-5 mb-lg-0">
                    <h5 class="brand-font display-6 mb-4">PAAREES</h5>
                    <p class="small text-muted mb-4" style="line-height: 1.8;">
                        The ultimate destination for luxury fragrances. We bridge the gap between discerning customers and the world's most iconic perfume houses.
                    </p>
                    <div>
                        <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
                    </div>
                </div>

                <!-- Collection Links -->
                <div class="col-lg-2 col-md-4 mb-4">
                    <h5 class="text-uppercase letter-spacing-2">Collections</h5>
                    <ul>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Best Sellers</a></li>
                        <li><a href="#">Men's Cologne</a></li>
                        <li><a href="#">Women's Parfum</a></li>
                        <li><a href="#">Gift Sets</a></li>
                    </ul>
                </div>

                <!-- Legal Links -->
                <div class="col-lg-2 col-md-4 mb-4">
                    <h5 class="text-uppercase letter-spacing-2">Legal</h5>
                    <ul>
                        <li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Refund Policy</a></li>
                        <li><a href="#">Shipping Info</a></li>
                    </ul>
                </div>

                <!-- Newsletter -->
                <div class="col-lg-4 col-md-4">
                    <h5 class="text-uppercase letter-spacing-2">Newsletter</h5>
                    <p class="small text-muted">Subscribe for exclusive offers and arrival updates.</p>
                    <div class="input-group">
                        <input type="email" class="form-control bg-card border-secondary text-main rounded-0" placeholder="EMAIL ADDRESS">
                        <button class="btn btn-gold border-0">JOIN</button>
                    </div>
                </div>
            </div>
            
            <!-- Copyright -->
            <div class="border-top border-secondary pt-4 mt-5 text-center">
                <p class="small text-muted mb-0">&copy; 2024 Paarees Perfumes. All Rights Reserved. Crafted for Excellence.</p>
            </div>
        </div>
    </footer>
    `;
}

// Render the Sidebar Filters dynamically
function renderFilters() {
    const brandContainer = document.getElementById('brand-filters');
    const catContainer = document.getElementById('cat-filters');
    
    if(!brandContainer || !catContainer) return;

    // Brand Filters
    let brandHTML = `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="brandFilter" value="all" checked onchange="updateFilter('brand','all')"> All Brands</label>`;
    brands.forEach(b => {
        brandHTML += `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="brandFilter" value="${b}" onchange="updateFilter('brand','${b}')"> ${b}</label>`;
    });
    brandContainer.innerHTML = brandHTML;

    // Category Filters
    let catHTML = ``;
    
    // "Common" option (acts as 'All')
    catHTML += `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="catFilter" value="all" checked onchange="updateFilter('cat','all')"> Common</label>`;

    // Specific Categories
    ['Female', 'Male'].forEach(c => {
        catHTML += `<label class="btn btn-outline-secondary text-start border-0 text-main rounded-0 mb-1"><input type="radio" name="catFilter" value="${c}" onchange="updateFilter('cat','${c}')"> ${c}</label>`;
    });
    catContainer.innerHTML = catHTML;

    // Mobile Filters (Copying content)
    const mobileBrand = document.getElementById('mobile-brand-filters');
    const mobileCat = document.getElementById('mobile-cat-filters');
    if(mobileBrand) mobileBrand.innerHTML = brandHTML;
    if(mobileCat) mobileCat.innerHTML = catHTML;
}

// Main Product Grid Renderer
function renderProducts() {
    const grid = document.getElementById('product-grid');
    if(!grid) return;

    // Check if we are on the dedicated Brands page
    const isBrandsPage = window.location.pathname.includes('brands.html');

    grid.innerHTML = ''; // Clear current products
    
    // Logic: If 'All Brands' is selected, show grouped by brand
    const isDefaultView = currentBrand === 'all' && currentCat === 'all';

    if (isDefaultView) {
        // Show sections for each brand
        brands.forEach(brand => {
            const brandProducts = products.filter(p => p.brand === brand);
            if (brandProducts.length === 0) return;

            // Create Section Header
            const section = document.createElement('div');
            section.className = 'mb-5 animate__animated animate__fadeInUp';
            
            section.innerHTML = `
                <div class="d-flex justify-content-between align-items-end mb-4 border-bottom border-secondary pb-2">
                    <div>
                        <h3 class="text-heading mb-0 brand-font">${brand}</h3>
                        <small class="text-gold text-uppercase" style="letter-spacing: 2px;">Signature Collection</small>
                    </div>
                </div>
                <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4" id="brand-grid-${brand}">
                </div>
            `;
            grid.appendChild(section);

            // Add cards to this section
            const brandGrid = document.getElementById(`brand-grid-${brand}`);
            brandProducts.forEach((p, index) => {
                const col = createProductCard(p);
                // Hide products after 4th ONLY if NOT on brands page
                if (index >= 4 && !isBrandsPage) {
                    col.classList.add('d-none'); 
                    col.classList.add(`hidden-items-${brand}`);
                }
                brandGrid.appendChild(col);
            });

            // "Show More" button if needed (AND not on brands page)
            if (brandProducts.length > 4 && !isBrandsPage) {
                const btnContainer = document.createElement('div');
                btnContainer.className = 'text-center mt-4';
                btnContainer.innerHTML = `
                    <button onclick="toggleBrand('${brand}', this)" class="btn btn-outline-secondary rounded-0 px-5 text-uppercase" style="letter-spacing: 2px; font-size: 0.8rem;">
                        Show More ${brand}
                    </button>
                `;
                section.appendChild(btnContainer);
            }
        });

    } else {
        // Filtered View (Specific Brand or Category)
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

        filtered.forEach(p => {
            grid.appendChild(createProductCard(p));
        });
    }
}

// Full Gallery Renderer
function renderFullGallery() {
    const container = document.getElementById('full-gallery-container');
    if (!container) return;

    container.innerHTML = ''; // Clear

    brands.forEach(brand => {
        const brandProducts = products.filter(p => p.brand === brand);
        if (brandProducts.length === 0) return;

        // Brand Header
        const header = document.createElement('div');
        header.className = 'gallery-brand-header animate__animated animate__fadeInUp';
        header.innerHTML = `<h3 class="brand-font text-heading">${brand}</h3>`;
        container.appendChild(header);

        // Grid Row
        const row = document.createElement('div');
        row.className = 'row g-3 mb-5';
        
        brandProducts.forEach((p, index) => {
            const col = document.createElement('div');
            // Responsive Grid: 2 cols on mobile, 3 on tablet, 4 on desktop
            col.className = 'col-6 col-md-4 col-lg-3 animate__animated animate__fadeInUp';
            col.style.animationDelay = `${0.1 * (index % 4)}s`; // Staggered delay
            
            col.innerHTML = `
                <div class="full-gallery-item">
                    <img src="${p.image}" alt="${p.name}" loading="lazy">
                </div>
            `;
            row.appendChild(col);
        });

        container.appendChild(row);
    });
}

/* =========================================
   3. HELPER FUNCTIONS
   ========================================= */

// Called when user clicks a brand in Navbar (or initially via URL param)
function selectBrand(brand) {
    currentBrand = brand;
    updateUIState(); // Update radio buttons
    renderProducts(); // Refresh grid
    
    // Smooth scroll only if we are on the same page and it has the element
    const shop = document.getElementById('shop');
    if(shop && window.location.pathname.includes('index.html')) {
        shop.scrollIntoView({behavior: 'smooth'});
    }
}

// Called when user clicks a filter radio button
function updateFilter(type, value) {
    if(type === 'brand') currentBrand = value;
    if(type === 'cat') currentCat = value;
    renderProducts();
}

// Update radio buttons to match current selection
function updateUIState() {
    const radios = document.querySelectorAll(`input[name="brandFilter"]`);
    radios.forEach(r => {
        if(r.value === currentBrand) r.checked = true;
        else r.checked = false;
    });
}

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
                <div class="card-rating">
                    ${getStars(p.rating)} <span class="text-muted ms-1">(${p.rating})</span>
                </div>
                <div class="card-price mb-2">${p.price}</div>
                
                <div class="d-flex gap-2">
                    <button onclick="downloadDetails(${p.id})" class="btn-card flex-grow-1">
                        View Specs
                    </button>
                    <button onclick="addToCart(${p.id})" class="btn-add-cart flex-grow-1" style="margin-top: 10px;">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    return div;
}

function toggleBrand(brand, btnElement) {
    const hiddenItems = document.querySelectorAll(`.hidden-items-${brand}`);
    let isExpanding = btnElement.innerText.includes('SHOW MORE'); 

    hiddenItems.forEach(item => {
        if (isExpanding) {
            item.classList.remove('d-none');
            item.classList.add('animate__fadeIn');
        } else {
            item.classList.add('d-none');
        }
    });

    if (isExpanding) {
        btnElement.innerText = `SHOW LESS ${brand.toUpperCase()}`;
    } else {
        btnElement.innerText = `SHOW MORE ${brand.toUpperCase()}`;
    }
}

function getStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        if (i < Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i < rating) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

/* =========================================
   4. CART FUNCTIONS
   ========================================= */

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        // Check if product already exists in cart
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
}

function changeQty(id, change) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        
        if (cart[itemIndex].qty <= 0) {
            removeFromCart(itemIndex);
        } else {
            updateCartUI();
        }
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Update Badge (count total items, not just unique lines)
    const badge = document.getElementById('cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if(badge) badge.innerText = totalItems;

    // Update Offcanvas Content
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');
    
    if (!container || !totalEl) return;

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="text-center text-muted mt-5">
                <i class="fas fa-shopping-bag fa-3x mb-3 opacity-25"></i>
                <p>Your cart is empty.</p>
            </div>`;
        totalEl.innerText = '$0.00';
        return;
    }

    let html = '<ul class="list-group list-group-flush">';
    let total = 0;

    cart.forEach((item, index) => {
        // Parse price (remove $ and convert to float)
        const priceVal = parseFloat(item.price.replace('$',''));
        const itemTotal = priceVal * item.qty;
        total += itemTotal;

        html += `
            <li class="list-group-item d-flex align-items-center bg-transparent border-secondary ps-0 pe-0">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img me-3">
                <div class="flex-grow-1">
                    <h6 class="mb-0 brand-font text-heading" style="font-size: 0.9rem;">${item.name}</h6>
                    <small class="text-muted">${item.brand}</small>
                    <div class="d-flex justify-content-between align-items-center mt-2">
                        <div class="btn-group btn-group-sm border border-secondary" role="group">
                             <button type="button" class="btn btn-outline-secondary border-0 py-0 px-2" onclick="changeQty(${item.id}, -1)">-</button>
                             <button type="button" class="btn btn-outline-secondary border-0 py-0 px-2 disabled text-dark" style="opacity: 1;">${item.qty}</button>
                             <button type="button" class="btn btn-outline-secondary border-0 py-0 px-2" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                        <span class="text-gold">$${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    totalEl.innerText = '$' + total.toFixed(2);
}

function checkout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }
    showToast("Proceeding to Checkout...");
}

/* =========================================
   5. UTILITIES (Downloads, Toast, Loader)
   ========================================= */

function downloadDetails(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    showToast(`Downloading specs for ${product.name}...`);

    // 1. Get Absolute Image Path (Fixes image not showing in Word)
    const absoluteImgPath = new URL(product.image, window.location.href).href;

    // Extended Description
    const longDescription = `
        <p><strong>The Essence of ${product.brand}:</strong></p>
        <p>
            Immerse yourself in the sophisticated world of <strong>${product.brand}</strong> with this exquisite ${product.category} fragrance. 
            Designed for the discerning individual, this scent represents the perfect harmony between modern innovation and timeless tradition. 
            The olfactory journey begins with invigorating top notes that awaken the senses, offering a burst of freshness that sets a confident tone for the day.
        </p>
        <p>
            As the fragrance settles, the heart notes unfold to reveal a complex and captivating character. 
            Delicate floral accords blend seamlessly with aromatic spices, creating a unique signature that is both alluring and mysterious. 
            This middle phase is the soul of the perfume, projecting an aura of elegance that draws others in without being overpowering.
        </p>
        <p>
            The experience concludes with a warm, lingering base. Rich notes of precious woods, amber, and musk provide a sensual foundation that stays with you for hours. 
            Whether worn for a high-stakes business meeting or a romantic evening in Paris, this fragrance adapts to the occasion, enhancing your natural charisma.
            Each bottle is a testament to the master perfumers of France, ensuring that you are not just wearing a scent, but carrying a legacy of luxury.
        </p>
        <p>
            <em>100% Authentic | Imported from Paris | Batch No. ${Math.floor(Math.random() * 100000) + 50000}</em>
        </p>
    `;

    const content = `
        <div style="font-family: 'Calibri', sans-serif; padding: 40px; color: #333;">
            <!-- Header -->
            <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 20px; margin-bottom: 30px;">
                <h1 style="color: #D4AF37; font-size: 28px; margin: 0; text-transform: uppercase;">${product.name}</h1>
                <h3 style="color: #666; font-size: 16px; margin-top: 10px; font-weight: normal;">${product.brand} Collection</h3>
            </div>

            <!-- Image & Key Details Table -->
            <table style="width: 100%; margin-bottom: 30px;">
                <tr>
                    <td style="width: 40%; vertical-align: top; text-align: center;">
                        <img src="${absoluteImgPath}" width="250" style="border: 1px solid #eee; padding: 5px; border-radius: 5px;">
                        <div style="margin-top: 15px;">
                            <span style="font-size: 24px; color: #D4AF37; font-weight: bold;">${product.price}</span>
                        </div>
                    </td>
                    <td style="width: 60%; vertical-align: top; padding-left: 30px;">
                        <h4 style="border-bottom: 1px solid #ddd; padding-bottom: 10px; color: #333;">Product Specifications</h4>
                        <p><strong>Brand:</strong> ${product.brand}</p>
                        <p><strong>Category:</strong> ${product.category} Fragrance</p>
                        <p><strong>Concentration:</strong> ${product.subName}</p>
                        <p><strong>Rating:</strong> ${product.rating} / 5.0 Stars</p>
                        <p><strong>Availability:</strong> In Stock</p>
                        <br>
                        <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #D4AF37;">
                            <i>"A masterpiece of olfactory art, designed to leave a lasting impression."</i>
                        </div>
                    </td>
                </tr>
            </table>

            <!-- Detailed Description -->
            <div style="line-height: 1.6; text-align: justify;">
                <h4 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">About This Fragrance</h4>
                ${longDescription}
            </div>

            <!-- Footer -->
            <div style="margin-top: 50px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #eee; padding-top: 20px;">
                <p>Generated by Paarees Digital Boutique | Paris, France</p>
                <p>www.paareesperfumes.com</p>
            </div>
        </div>
    `;

    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>" + product.name + "</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    // Using .doc extension for maximum compatibility with HTML-based Word files
    fileDownload.download = `${product.name.replace(/\s+/g, '_')}_Specs.doc`;
    fileDownload.click();
    document.body.removeChild(fileDownload);
}

function showToast(msg, type = 'success') {
    const t = document.getElementById('toast');
    if(!t) return;
    
    const msgEl = document.getElementById('toast-msg');
    const titleEl = document.getElementById('toast-title');
    const iconEl = document.getElementById('toast-icon');

    if(msgEl) msgEl.innerText = msg;

    // Reset Classes
    if(iconEl) {
        iconEl.className = 'fas me-3 fa-lg'; // Reset base classes
        if (type === 'error') {
            iconEl.classList.add('fa-exclamation-circle', 'text-danger');
            if(titleEl) titleEl.innerText = 'Error';
        } else {
            iconEl.classList.add('fa-check-circle', 'text-warning');
            if(titleEl) titleEl.innerText = 'Success';
        }
    }

    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 3000);
}

function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    preloader.style.opacity = '0'; 
    setTimeout(() => { preloader.style.display = 'none'; }, 800);
}

// Animation Observer (Fade In effects)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });


/* =========================================
   6. INITIALIZATION & EVENTS
   ========================================= */

function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const msgInput = document.getElementById('contact-message');

    // Helper to show inline error
    const showError = (input, message) => {
        input.classList.add('is-invalid');
        const feedback = input.nextElementSibling;
        if(feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.innerText = message;
        }
    };

    // Helper to clear inline error
    const clearError = (input) => {
        input.classList.remove('is-invalid');
        const feedback = input.nextElementSibling;
        if(feedback && feedback.classList.contains('invalid-feedback')) {
            feedback.innerText = '';
        }
    };

    // Clear errors on input
    [nameInput, emailInput, msgInput].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // Clear all previous errors
        [nameInput, emailInput, msgInput].forEach(clearError);

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = msgInput.value.trim();

        // 1. Validate Name
        if (!name) {
            showError(nameInput, "Name is required.");
            isValid = false;
        } else if (name.length < 3) {
            showError(nameInput, "Name must be at least 3 characters long.");
            isValid = false;
        } else if (/\d/.test(name)) {
            showError(nameInput, "Name cannot contain numbers.");
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError(nameInput, "Name must contain only letters.");
            isValid = false;
        }

        // 2. Validate Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            showError(emailInput, "Email is required.");
            isValid = false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, "Please enter a valid email address.");
            isValid = false;
        }

        // 3. Validate Message
        if (!message) {
            showError(msgInput, "Message is required.");
            isValid = false;
        }

        if (!isValid) {
            return; 
        }

        // Success
        showToast('Customer Service Notified. Opening Mail...', 'success');
        
        setTimeout(() => {
            window.location.href = 'mailto:info@paareesperfumes.com';
            form.reset();
            [nameInput, emailInput, msgInput].forEach(clearError);
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render Dynamic Sections
    renderNavbar();
    renderFooter();
    renderFilters();
    renderProducts();
    renderFullGallery();
    
    // 2. Setup Form Validation
    setupContactForm();

    // 3. Start Animations
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 4. Hide Loader (Only on Homepage)
    const path = window.location.pathname;
    const isHomePage = path.includes('index.html') || path === '/' || path.endsWith('/');

    if (isHomePage) {
        // Show loader on Home (open or refresh)
        setTimeout(hidePreloader, 1500);
    } else {
        // Hide immediately on other pages
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.display = 'none';
        }
    }
});
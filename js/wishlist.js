// ============================================
// THE FOOD HUB — Wishlist (Favorite) System
// Heart Toggle -> Wishlist Drawer -> Add to Cart / Remove
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  const WISHLIST_KEY = 'foodhub_wishlist_items';
  const CART_KEY = 'foodhub_cart_items';

  // ---------- Wishlist state helpers ----------
  function getWishlist() {
    try {
      return JSON.parse(localStorage.getItem(WISHLIST_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveWishlist(list) {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
    updateWishlistBadge(list);
  }

  function updateWishlistBadge(list) {
    document.querySelectorAll('.wishlist-badge').forEach(function (b) {
      b.textContent = list.length;
    });
  }

  function isInWishlist(name) {
    return getWishlist().some(function (i) { return i.name === name; });
  }

  function toggleWishlist(name, price, btn) {
    let list = getWishlist();
    const idx = list.findIndex(function (i) { return i.name === name; });
    if (idx > -1) {
      list.splice(idx, 1);
      if (btn) btn.classList.remove('active');
    } else {
      list.push({ name: name, price: price });
      if (btn) btn.classList.add('active');
    }
    saveWishlist(list);
    renderWishlistDrawer();
  }

  function removeFromWishlist(name) {
    const list = getWishlist().filter(function (i) { return i.name !== name; });
    saveWishlist(list);
    // keep the heart icons on the page in sync
    document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
      if (btn.getAttribute('data-dish') === name) btn.classList.remove('active');
    });
    renderWishlistDrawer();
  }

  // ---------- Cart helpers (shared storage with cart.js) ----------
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function updateCartBadge(cart) {
    const count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    document.querySelectorAll('.cart-badge').forEach(function (b) { b.textContent = count; });
  }

  function addToCartFromWishlist(name, price) {
    const cart = getCart();
    const existing = cart.find(function (i) { return i.name === name; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge(cart);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- Build wishlist drawer DOM (once) ----------
  let overlay = document.querySelector('.wishlist-overlay');
  let drawer = document.querySelector('.wishlist-drawer');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'wishlist-overlay cart-overlay';
    document.body.appendChild(overlay);
  }
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'wishlist-drawer cart-drawer';
    document.body.appendChild(drawer);
  }

  function openWishlistDrawer() {
    if (window.FoodHubDrawer) window.FoodHubDrawer.close();
    overlay.classList.add('open');
    drawer.classList.add('open');
    renderWishlistDrawer();
  }

  function closeWishlistDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }

  overlay.addEventListener('click', closeWishlistDrawer);

  function getMenuHref() {
    const link = document.querySelector('.nav-links a[href*="menu.html"]');
    return link ? link.getAttribute('href') : 'menu.html';
  }

  function renderWishlistDrawer() {
    const list = getWishlist();
    const menuHref = getMenuHref();
    const footerHtml =
      '<div class="cart-drawer-footer"><a href="' + menuHref + '" class="btn btn-outline btn-block">Browse Menu</a></div>';

    if (list.length === 0) {
      drawer.innerHTML =
        '<div class="cart-drawer-header"><h3>Your Wishlist</h3><button class="cart-close" aria-label="Close">×</button></div>' +
        '<div class="cart-drawer-body"><div class="cart-empty"><span><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.8 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></span>Your wishlist is empty.<br>Tap the heart icon on a dish to save it!</div></div>' +
        footerHtml;
      bindHeaderClose();
      return;
    }

    let itemsHtml = '';
    list.forEach(function (item) {
      itemsHtml +=
        '<div class="cart-item wishlist-item" data-name="' + escapeHtml(item.name) + '">' +
          '<div class="cart-item-info"><h4>' + escapeHtml(item.name) + '</h4><span>' + item.price + '</span></div>' +
          '<button class="btn btn-primary wishlist-add-btn">Add to Cart</button>' +
          '<button class="remove-link">Remove</button>' +
        '</div>';
    });

    drawer.innerHTML =
      '<div class="cart-drawer-header"><h3>Your Wishlist</h3><button class="cart-close" aria-label="Close">×</button></div>' +
      '<div class="cart-drawer-body">' + itemsHtml + '</div>' +
      footerHtml;

    bindHeaderClose();

    drawer.querySelectorAll('.wishlist-add-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const row = btn.closest('.wishlist-item');
        const name = row.getAttribute('data-name');
        const priceText = row.querySelector('.cart-item-info span').textContent;
        addToCartFromWishlist(name, priceText);
        removeFromWishlist(name);
      });
    });

    drawer.querySelectorAll('.wishlist-item .remove-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const name = btn.closest('.wishlist-item').getAttribute('data-name');
        removeFromWishlist(name);
      });
    });
  }

  function bindHeaderClose() {
    const closeBtn = drawer.querySelector('.cart-close');
    if (closeBtn) closeBtn.addEventListener('click', closeWishlistDrawer);
  }

  // ---------- Init ----------
  updateWishlistBadge(getWishlist());

  document.querySelectorAll('.wishlist-btn').forEach(function (btn) {
    const name = btn.getAttribute('data-dish');
    const price = btn.getAttribute('data-price') || '$0';
    if (name && isInWishlist(name)) {
      btn.classList.add('active');
    }
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleWishlist(name, price, btn);
    });
  });

  document.querySelectorAll('.wishlist-nav-btn').forEach(function (btn) {
    btn.addEventListener('click', openWishlistDrawer);
  });

  // ---------- Shared API (used by cart.js to close this drawer when cart opens) ----------
  window.FoodHubWishlist = {
    close: closeWishlistDrawer
  };

});

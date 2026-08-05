// ============================================
// THE FOOD HUB — Order / Cart System
// Cart Drawer -> Invoice -> Confirmation
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  const CART_KEY = 'foodhub_cart_items';

  // ---------- State helpers ----------
  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateBadge(cart);
  }

  function updateBadge(cart) {
    const count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    document.querySelectorAll('.cart-badge').forEach(function (b) { b.textContent = count; });
  }

  function parsePrice(priceStr) {
    return parseFloat(String(priceStr).replace(/[^0-9.]/g, '')) || 0;
  }

  function addToCart(name, priceStr) {
    const cart = getCart();
    const existing = cart.find(function (i) { return i.name === name; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: priceStr, qty: 1 });
    }
    saveCart(cart);
  }

  function updateQty(name, delta) {
    let cart = getCart();
    const item = cart.find(function (i) { return i.name === name; });
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(function (i) { return i.name !== name; });
    }
    saveCart(cart);
    renderDrawer();
  }

  function removeItem(name) {
    const cart = getCart().filter(function (i) { return i.name !== name; });
    saveCart(cart);
    renderDrawer();
  }

  // ---------- Build drawer DOM (once) ----------
  let overlay = document.querySelector('.cart-overlay');
  let drawer = document.querySelector('.cart-drawer');

  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    document.body.appendChild(overlay);
  }
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.className = 'cart-drawer';
    document.body.appendChild(drawer);
  }

  function openDrawer() {
    if (window.FoodHubWishlist) window.FoodHubWishlist.close();
    overlay.classList.add('open');
    drawer.classList.add('open');
    renderDrawer();
  }

  function closeDrawer() {
    overlay.classList.remove('open');
    drawer.classList.remove('open');
  }

  overlay.addEventListener('click', closeDrawer);

  function calcTotals(cart) {
    const subtotal = cart.reduce(function (sum, i) { return sum + parsePrice(i.price) * i.qty; }, 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;
    return { subtotal: subtotal, tax: tax, total: total };
  }

  function money(n) { return '$' + n.toFixed(2); }

  // ---------- Render: Cart view ----------
  function renderDrawer() {
    const cart = getCart();

    if (cart.length === 0) {
      drawer.innerHTML =
        '<div class="cart-drawer-header"><h3>Your Order</h3><button class="cart-close" aria-label="Close">×</button></div>' +
        '<div class="cart-drawer-body"><div class="cart-empty"><span><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.68 12.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L22 6.5H6"/></svg></span>Your order list is empty.<br>Add a dish from the menu!</div></div>';
      bindHeaderClose();
      return;
    }

    const totals = calcTotals(cart);

    let itemsHtml = '';
    cart.forEach(function (item) {
      itemsHtml +=
        '<div class="cart-item" data-name="' + escapeHtml(item.name) + '">' +
          '<div class="cart-item-info"><h4>' + escapeHtml(item.name) + '</h4><span>' + item.price + ' each</span></div>' +
          '<div class="qty-control">' +
            '<button class="qty-btn qty-minus" aria-label="Decrease">−</button>' +
            '<span class="qty-value">' + item.qty + '</span>' +
            '<button class="qty-btn qty-plus" aria-label="Increase">+</button>' +
          '</div>' +
          '<button class="remove-link">Remove</button>' +
        '</div>';
    });

    drawer.innerHTML =
      '<div class="cart-drawer-header"><h3>Your Order</h3><button class="cart-close" aria-label="Close">×</button></div>' +
      '<div class="cart-drawer-body">' + itemsHtml + '</div>' +
      '<div class="cart-summary">' +
        '<div class="cart-summary-row"><span>Subtotal</span><span>' + money(totals.subtotal) + '</span></div>' +
        '<div class="cart-summary-row"><span>Tax (10%)</span><span>' + money(totals.tax) + '</span></div>' +
        '<div class="cart-summary-row total"><span>Total</span><span>' + money(totals.total) + '</span></div>' +
      '</div>' +
      '<div class="cart-drawer-footer"><button class="btn btn-primary btn-block" id="checkoutBtn">Checkout &amp; View Invoice</button></div>';

    bindHeaderClose();

    drawer.querySelectorAll('.qty-minus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const name = btn.closest('.cart-item').getAttribute('data-name');
        updateQty(name, -1);
      });
    });
    drawer.querySelectorAll('.qty-plus').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const name = btn.closest('.cart-item').getAttribute('data-name');
        updateQty(name, 1);
      });
    });
    drawer.querySelectorAll('.remove-link').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const name = btn.closest('.cart-item').getAttribute('data-name');
        removeItem(name);
      });
    });

    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', renderInvoice);
  }

  function bindHeaderClose() {
    const closeBtn = drawer.querySelector('.cart-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- Render: Invoice view ----------
  function generateInvoiceNumber() {
    return 'EV-' + Math.floor(100000 + Math.random() * 900000);
  }

  function formatDate() {
    const d = new Date();
    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
  }

  function renderInvoice() {
    const cart = getCart();
    if (cart.length === 0) { renderDrawer(); return; }

    const totals = calcTotals(cart);
    const invoiceNum = generateInvoiceNumber();
    const dateStr = formatDate();

    let linesHtml = '';
    cart.forEach(function (item) {
      linesHtml +=
        '<div class="invoice-row"><span>' + item.qty + ' x ' + escapeHtml(item.name) + '</span><span>' +
        money(parsePrice(item.price) * item.qty) + '</span></div>';
    });

    drawer.innerHTML =
      '<div class="cart-drawer-header"><h3>Your Invoice</h3><button class="cart-close" aria-label="Close">×</button></div>' +
      '<div class="cart-drawer-body">' +
        '<div class="invoice-box" style="margin:20px 0 0;">' +
          '<div class="invoice-row head"><span>Invoice</span><span>#' + invoiceNum + '</span></div>' +
          '<div class="invoice-row"><span>Date</span><span>' + dateStr + '</span></div>' +
          '<div class="invoice-divider"></div>' +
          linesHtml +
          '<div class="invoice-divider"></div>' +
          '<div class="invoice-row"><span>Subtotal</span><span>' + money(totals.subtotal) + '</span></div>' +
          '<div class="invoice-row"><span>Tax (10%)</span><span>' + money(totals.tax) + '</span></div>' +
          '<div class="invoice-row head"><span>Total</span><span>' + money(totals.total) + '</span></div>' +
        '</div>' +
      '</div>' +
      '<div class="invoice-actions">' +
        '<button class="btn btn-primary btn-block" id="confirmOrderBtn">Confirm &amp; Place Order</button>' +
        '<button class="btn btn-outline btn-block" id="backToCartBtn">Back to Order</button>' +
      '</div>';

    bindHeaderClose();
    document.getElementById('confirmOrderBtn').addEventListener('click', renderConfirmation);
    document.getElementById('backToCartBtn').addEventListener('click', renderDrawer);
  }

  // ---------- Render: Confirmation view ----------
  function renderConfirmation() {
    saveCart([]); // clear cart

    drawer.innerHTML =
      '<div class="cart-drawer-header"><h3>Your Invoice</h3><button class="cart-close" aria-label="Close">×</button></div>' +
      '<div class="cart-drawer-body">' +
        '<div class="order-confirm">' +
          '<div class="confirm-icon">✓</div>' +
          '<h3>Order Placed!</h3>' +
          '<p>Thank you. Your order has been sent to the kitchen. It will be ready shortly.</p>' +
        '</div>' +
      '</div>';
    bindHeaderClose();
  }

  // ---------- Toast (used for quick "added" feedback) ----------
  let toastStack = document.querySelector('.toast-stack');
  if (!toastStack) {
    toastStack = document.createElement('div');
    toastStack.className = 'toast-stack';
    document.body.appendChild(toastStack);
  }

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toastStack.appendChild(toast);
    requestAnimationFrame(function () { toast.classList.add('show'); });
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () { toast.remove(); }, 300);
    }, 2500);
  }

  // ---------- Wire up buttons on the page ----------
  updateBadge(getCart());

  document.querySelectorAll('.order-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const dish = btn.getAttribute('data-dish') || 'Item';
      const price = btn.getAttribute('data-price') || '$0';
      addToCart(dish, price);
      const cartIconSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.68 12.39a2 2 0 0 0 2 1.61h8.64a2 2 0 0 0 2-1.61L22 6.5H6"/></svg>';
      showToast(cartIconSvg + ' <strong>' + dish + '</strong> added to your order!');

      const originalText = btn.textContent;
      btn.textContent = 'Added ✓';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = originalText;
        btn.disabled = false;
      }, 1000);
    });
  });

  document.querySelectorAll('.cart-btn').forEach(function (btn) {
    btn.addEventListener('click', openDrawer);
  });

  // ---------- Shared drawer API (used by reservation confirmation, etc.) ----------
  window.FoodHubDrawer = {
    openWithContent: function (html) {
      drawer.innerHTML = html;
      overlay.classList.add('open');
      drawer.classList.add('open');
    },
    close: closeDrawer,
    bindClose: bindHeaderClose,
    money: money
  };

});

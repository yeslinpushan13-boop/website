/* =====================================================
   ZYMOMAX — Cart Manager
   ===================================================== */
const CART_KEY = 'zym_cart';

function getCart() { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }

function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, priceUnit: product.priceUnit, image: product.image, category: product.category, qty });
  }
  saveCart(cart);
  showToast(`${product.name} added to cart 🛒`, 'cart');
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
  renderCart();
}

function clearCart() { localStorage.removeItem(CART_KEY); updateCartBadge(); }

function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.18);
  const shipping = subtotal > 5000 ? 0 : 199;
  const total = subtotal + gst + shipping;
  return { subtotal, gst, shipping, total, itemCount: cart.reduce((s, i) => s + i.qty, 0) };
}

window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQty = updateQty;
window.clearCart = clearCart;
window.getCart = getCart;
window.getCartTotals = getCartTotals;

/* ---- Render Cart Page ---- */
function renderCart() {
  const container = document.getElementById('cart-items');
  const emptyState = document.getElementById('cart-empty');
  const cartMain = document.getElementById('cart-main');
  if (!container) return;

  const cart = getCart();
  const totals = getCartTotals();

  if (cart.length === 0) {
    if (cartMain) cartMain.style.display = 'none';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }
  if (cartMain) cartMain.style.display = '';
  if (emptyState) emptyState.style.display = 'none';

  container.innerHTML = cart.map(item => `
    <tr class="cart-row">
      <td>
        <div class="cart-product">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <div class="cart-product-name">${item.name}</div>
            <div class="cart-product-sub">${item.category}</div>
          </div>
        </div>
      </td>
      <td>${formatINR(item.price)}<span style="font-size:0.75rem;color:var(--muted)"> ${item.priceUnit || ''}</span></td>
      <td>
        <div class="qty-ctrl">
          <button class="qty-btn" onclick="updateQty('${item.id}', -1)">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty('${item.id}', 1)">+</button>
        </div>
      </td>
      <td style="font-weight:700;color:var(--teal)">${formatINR(item.price * item.qty)}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removeFromCart('${item.id}');renderCart()">Remove</button></td>
    </tr>
  `).join('');

  // Update summary
  const el = id => document.getElementById(id);
  if (el('summary-subtotal')) el('summary-subtotal').textContent = formatINR(totals.subtotal);
  if (el('summary-gst')) el('summary-gst').textContent = formatINR(totals.gst);
  if (el('summary-shipping')) el('summary-shipping').textContent = totals.shipping === 0 ? 'FREE' : formatINR(totals.shipping);
  if (el('summary-total')) el('summary-total').textContent = formatINR(totals.total);
  if (el('summary-items')) el('summary-items').textContent = totals.itemCount + ' item(s)';
}

document.addEventListener('DOMContentLoaded', renderCart);

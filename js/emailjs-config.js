/* =====================================================
   ZYMOMAX — EmailJS Configuration & Email Senders
   
   SETUP REQUIRED:
   1. Go to https://www.emailjs.com and create a free account
   2. Create an Email Service (Gmail recommended)
   3. Create 3 email templates (see EMAILJS_SETUP.md)
   4. Replace the placeholder IDs below with your real IDs
   ===================================================== */

// ---- EMAILJS CONFIG (Replace with your real IDs after setup) ----
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',         // From EmailJS Account > API Keys
  serviceId: 'YOUR_SERVICE_ID',         // From Email Services
  templates: {
    order:   'template_order',          // Order notification template ID
    contact: 'template_contact',        // Contact form template ID
    careers: 'template_careers',        // Career application template ID
  }
};

// Initialize EmailJS
(function() {
  if (typeof emailjs !== 'undefined' && EMAILJS_CONFIG.publicKey !== 'YOUR_PUBLIC_KEY') {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }
})();

/* ---- Send Order Email ---- */
async function sendOrderEmail(order) {
  if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('[EmailJS] Not configured. Order would be sent to orders@zymomax.com');
    console.log('Order data:', order);
    return { ok: true, demo: true };
  }
  try {
    const itemsHtml = order.items.map(i =>
      `${i.name} × ${i.qty} = ₹${(i.price * i.qty).toLocaleString('en-IN')}`
    ).join('\n');

    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templates.order, {
      to_email:       'orders@zymomax.com',
      order_id:       order.id,
      customer_name:  order.customer.name,
      customer_email: order.customer.email,
      customer_phone: order.customer.phone,
      shipping_addr:  order.customer.address,
      items_list:     itemsHtml,
      subtotal:       '₹' + order.totals.subtotal.toLocaleString('en-IN'),
      gst:            '₹' + order.totals.gst.toLocaleString('en-IN'),
      shipping:       order.totals.shipping === 0 ? 'FREE' : '₹' + order.totals.shipping.toLocaleString('en-IN'),
      total:          '₹' + order.totals.total.toLocaleString('en-IN'),
      payment_mode:   order.paymentMode || 'Online',
      order_date:     new Date(order.date).toLocaleString('en-IN'),
    });

    // Send confirmation to customer too
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templates.order, {
      to_email:       order.customer.email,
      order_id:       order.id,
      customer_name:  order.customer.name,
      items_list:     itemsHtml,
      total:          '₹' + order.totals.total.toLocaleString('en-IN'),
      order_date:     new Date(order.date).toLocaleString('en-IN'),
    });

    return { ok: true };
  } catch (err) {
    console.error('[EmailJS] Order email failed:', err);
    return { ok: false, err };
  }
}

/* ---- Send Contact Email ---- */
async function sendContactEmail(data) {
  if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('[EmailJS] Not configured. Contact would be sent to info@zymomax.com');
    return { ok: true, demo: true };
  }
  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templates.contact, {
      to_email:    'info@zymomax.com',
      from_name:   data.name,
      from_email:  data.email,
      from_phone:  data.phone || 'N/A',
      subject:     data.subject,
      message:     data.message,
      sent_at:     new Date().toLocaleString('en-IN'),
    });
    return { ok: true };
  } catch (err) {
    console.error('[EmailJS] Contact email failed:', err);
    return { ok: false, err };
  }
}

/* ---- Send Careers Email ---- */
async function sendCareerEmail(data) {
  if (typeof emailjs === 'undefined' || EMAILJS_CONFIG.publicKey === 'YOUR_PUBLIC_KEY') {
    console.warn('[EmailJS] Not configured. Career email would be sent to careers@zymomax.com');
    return { ok: true, demo: true };
  }
  try {
    await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templates.careers, {
      to_email:    'careers@zymomax.com',
      from_name:   data.name,
      from_email:  data.email,
      from_phone:  data.phone,
      position:    data.position,
      experience:  data.experience,
      message:     data.message,
      sent_at:     new Date().toLocaleString('en-IN'),
    });
    return { ok: true };
  } catch (err) {
    console.error('[EmailJS] Careers email failed:', err);
    return { ok: false, err };
  }
}

window.sendOrderEmail = sendOrderEmail;
window.sendContactEmail = sendContactEmail;
window.sendCareerEmail = sendCareerEmail;
window.EMAILJS_CONFIG = EMAILJS_CONFIG;

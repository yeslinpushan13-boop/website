# Zymomax Biotech Website

**Professional website for Zymomax Biotech** — fermentation science & aquatic probiotic startup incubated at DETI@ACE-TBI, Adhiyamaan College of Engineering, Hosur.

🌐 **Live at:** Deployed via Vercel (auto-deploys on push to `main`)

---

## 📋 Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero, Why Us, Products preview, Testimonials |
| About | `about.html` | Mission, Location, Team, Timeline |
| Products | `products.html` | Full catalogue with filter, modals, Add to Cart |
| Cart | `cart.html` | Shopping cart with quantity controls |
| Checkout | `checkout.html` | Address form + Razorpay + order email |
| Login | `login.html` | Login / Register with password strength |
| Account | `account.html` | Dashboard, orders, profile (Amazon-style) |
| Contact | `contact.html` | Form → info@zymomax.com, Map, FAQ |
| Careers | `careers.html` | No vacancies + open application → careers@zymomax.com |

---

## 📧 Email Setup (REQUIRED — EmailJS)

The website uses **EmailJS** (free) to send emails without a backend server.

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up with your Zymomax email

### Step 2: Add Email Service
1. Go to **Email Services** → **Add New Service**
2. Choose **Gmail** (or your email provider)
3. Connect `orders@zymomax.com` (or any Zymomax email with OAuth)
4. Note the **Service ID** (e.g., `service_xxxxxxx`)

### Step 3: Create Email Templates

Create **3 templates** in EmailJS:

#### Template 1: Order Notification (`template_order`)
- **To:** `{{to_email}}`
- **Subject:** `New Order {{order_id}} — Zymomax Biotech`
- **Body:**
```
New Order Received!

Order ID: {{order_id}}
Date: {{order_date}}
Customer: {{customer_name}} ({{customer_email}}, {{customer_phone}})
Shipping To: {{shipping_addr}}

Items:
{{items_list}}

Subtotal: {{subtotal}}
GST: {{gst}}
Shipping: {{shipping}}
TOTAL: {{total}}

Payment: {{payment_mode}}
```

#### Template 2: Contact Form (`template_contact`)
- **To:** `{{to_email}}`
- **Subject:** `Website Enquiry: {{subject}} — from {{from_name}}`
- **Body:**
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Subject: {{subject}}
Sent: {{sent_at}}

Message:
{{message}}
```

#### Template 3: Career Application (`template_careers`)
- **To:** `{{to_email}}`
- **Subject:** `Career Application: {{position}} — {{from_name}}`
- **Body:**
```
New Career Application

Name: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Position: {{position}}
Experience: {{experience}}
Sent: {{sent_at}}

Details:
{{message}}
```

### Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy the **Public Key**

### Step 5: Update the Config File

Open `js/emailjs-config.js` and replace:
```javascript
const EMAILJS_CONFIG = {
  publicKey: 'YOUR_PUBLIC_KEY',     // ← Replace with your key
  serviceId: 'YOUR_SERVICE_ID',     // ← Replace with service ID
  templates: {
    order:   'template_order',      // ← Must match your template ID
    contact: 'template_contact',
    careers: 'template_careers',
  }
};
```

### Step 6: Push & Deploy
```bash
git add js/emailjs-config.js
git commit -m "feat: configure EmailJS"
git push origin main
```
Vercel will auto-deploy within 1–2 minutes!

---

## 💳 Payment Setup (Razorpay)

1. Register at [https://razorpay.com](https://razorpay.com)
2. Get your **Key ID** from Dashboard → Settings → API Keys
3. Open `checkout.html` and replace:
   ```javascript
   key: 'rzp_test_PLACEHOLDER',  // ← Replace with rzp_live_XXXXXX
   ```
4. Push to GitHub → Vercel auto-deploys

---

## 🚀 Deployment

The repo is connected to **Vercel** with auto-deploy on `git push`.

```bash
# Make changes locally
git add .
git commit -m "your message"
git push origin main
# ✅ Vercel deploys automatically in ~1 minute
```

---

## 📁 Project Structure

```
/
├── index.html          Home
├── about.html          About Us
├── products.html       Products & Services
├── cart.html           Shopping Cart
├── checkout.html       Checkout & Payment
├── login.html          Login / Register
├── account.html        User Account Dashboard
├── contact.html        Contact Us
├── careers.html        Careers
├── css/
│   └── styles.css      Complete Design System
├── js/
│   ├── main.js         Navigation, particles, animations
│   ├── auth.js         Login/Register (localStorage)
│   ├── cart.js         Cart management
│   ├── products.js     Product data
│   └── emailjs-config.js  Email configuration
├── images/
│   ├── logo.jpg        Company logo
│   ├── hero.jpg        Hero/lab image
│   └── product.jpg     Product image
└── README.md           This file
```

---

## 📞 Contact Info Used in Website

| Purpose | Email |
|---------|-------|
| General queries | info@zymomax.com |
| Orders | orders@zymomax.com |
| Careers | careers@zymomax.com |

**Location:** DETI@ACE-TBI, Adhiyamaan College of Engineering, Dr MGR Nagar, Hosur – 635 109

---

*Built with ❤️ by Antigravity AI*

# KaShop 🛍️

> A modern e-commerce platform built with React 19 — a full shopping experience with bilingual support (Arabic & English), dark/light mode, and a robust authentication system.

---

## 🌐 Live Demo

🔗 [kashop-mz.onrender.com](https://kashop-mz.onrender.com)

**API Base URL:**
```
https://knowledgeshop.runasp.net/api
```

---

## ✨ Key Features

| Feature | Details |
|---|---|
| 🌍 **Bilingual** | Full Arabic (RTL) + English (LTR) with instant switching |
| 🌙 **Dark / Light Mode** | Dark by default, toggleable from the Navbar |
| 🔐 **Authentication** | Login, register, forgot password, automatic Refresh Token |
| 🛒 **Shopping Cart** | Add, remove, update quantity, checkout via Visa or Cash |
| 🔍 **Full Shop** | Search, filter by category & price, sorting, pagination |
| ⭐ **Reviews** | Users can only review products they have purchased |
| 👤 **Profile** | View info, change email & password, order history |
| 📍 **Contact Page** | Interactive map (Leaflet), FAQ, contact form |
| 📱 **Responsive** | Works on all screen sizes with a mobile Drawer |
| ⚡ **Performance** | Smart caching with TanStack Query|

---

## 🗂️ Project Structure

```
kashop/
├── public/
│   └── vite.svg
├── src/
│   ├── api/                        # Backend communication layer
│   │   ├── axiosInstance.js            # Public requests (no token)
│   │   └── authAxiosInstance.js        # Private requests (Bearer + Refresh)
│   │
│   ├── assets/                     # Images and icons
│   │
│   ├── components/                 # Reusable UI sections
│   │   ├── navbar/
│   │   ├── hero/
│   │   ├── footer/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── features/
│   │   ├── teamSection/
│   │   ├── testimonialsSection/
│   │   ├── newsletterSection/
│   │   ├── aboutHeroSection/
│   │   ├── aboutStorySection/
│   │   └── valuesSection/
│   │
│   ├── hooks/                      # Custom React Hooks (API logic)
│   │   ├── useProducts.jsx
│   │   ├── useProduct.jsx
│   │   ├── useCategories.jsx
│   │   ├── useCart.jsx
│   │   ├── useAddToCart.jsx
│   │   ├── useRemoveFromCart.jsx
│   │   ├── useUpdateCartItem.jsx
│   │   ├── useCheckout.jsx
│   │   ├── useProfile.jsx
│   │   ├── useChangeEmail.jsx
│   │   ├── useChangePassword.jsx
│   │   ├── useAddReview.jsx
│   │   └── useForgotPassword.jsx
│   │
│   ├── Layout/
│   │   └── MainLayout.jsx          # Navbar + Outlet + Footer
│   │
│   ├── pages/                      # Application pages
│   │   ├── Home/
│   │   ├── shop/
│   │   ├── products/               # Product details
│   │   ├── cart/
│   │   ├── profile/                # ProfileInfo + ProfileOrders
│   │   ├── auth/                   # Login + Register
│   │   ├── about/
│   │   ├── contact/
│   │   └── notFound/
│   │
│   ├── store/                      # Global State (Zustand)
│   │   ├── useAuthStore.js             # token + logout
│   │   └── useThemeStore.js            # dark/light mode
│   │
│   ├── ui/                         # Small reusable UI components
│   │   ├── product/ProductCard.jsx
│   │   ├── loader/Loader.jsx
│   │   ├── GlassTextField.jsx
│   │   ├── FeatureCard.jsx
│   │   └── TestimonialCard.jsx
│   │
│   ├── validation/                 # Yup Schemas
│   │   ├── LoginSchema.jsx
│   │   └── RegisterSchema.jsx
│   │
│   ├── App.jsx                     # Providers (Theme, Query, i18n, RTL)
│   ├── main.jsx                    # Entry Point
│   ├── router.jsx                  # All route definitions
│   ├── ProtectedRouter.jsx         # Guards for private pages
│   ├── theme.js                    # MUI Theme (Dark/Light + RTL)
│   └── i18next.jsx                 # EN + AR translations
│
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── .env
```

---

## 🚀 Tech Stack

### ⚛️ Core

| Library | Version | Role |
|---|---|---|
| **React** | ^19.2.0 | UI library — components & state |
| **React DOM** | ^19.2.0 | Renders React into the browser |
| **Vite** | ^7.2.4 | Build tool — extremely fast dev server |

### 🧭 Routing

| Library | Version | Role |
|---|---|---|
| **React Router DOM** | ^7.13.0 | Routes, Navigate, useParams, nested routes |

**Routes & Protection:**
```
/               → Home
/shop           → Shop with filters
/products/:id   → Product details
/about          → About us
/contact        → Contact page
/login          → Login
/register       → Register
/cart           → 🔒 Protected (requires login)
/profile        → 🔒 Protected
/profile/orders → 🔒 Protected (nested route)
```

### 🎨 UI & Styling

| Library | Version | Role |
|---|---|---|
| **MUI (Material UI)** | ^7.3.7 | Full UI component system |
| **@emotion/react** | ^11.14.0 | CSS-in-JS engine powering MUI |
| **@emotion/styled** | ^11.14.1 | Styled components |
| **@emotion/cache** | ^11.14.0 | RTL cache for Arabic support |
| **stylis-plugin-rtl** | ^2.1.1 | Auto-reverses CSS for RTL layouts |
| **Framer Motion** | ^12.38.0 | Animations and transitions |
| **@fontsource/roboto** | ^5.2.9 | Local Roboto font (required by MUI) |
| **@fontsource/sora** | ^5.2.8 | Sora font for headings |

**MUI Components used in this project:**
```
Layout:     AppBar · Toolbar · Container · Grid · Box · Paper · Drawer
Display:    Typography · Avatar · Chip · Badge · Divider · Rating
Input:      TextField · Select · MenuItem · Slider · Button · IconButton
            FormControl · RadioGroup · Radio · FormControlLabel
Feedback:   CircularProgress · Skeleton · Alert · Dialog
Navigation: Link · Menu · List · ListItemButton · Collapse · Pagination
```

### 📡 Data Fetching

| Library | Version | Role |
|---|---|---|
| **TanStack Query** | ^5.90.21 | Caching, loading/error states, mutations |
| **Axios** | ^1.13.4 | HTTP client with interceptors |

**Interceptor System:**
```
axiosInstance      → Automatically injects Accept-Language into every request
authAxiosInstance  → Injects Bearer Token on every request
                     On 401 → auto-fetches a new token and retries the original request
```

### 🗃️ State Management

| Library | Version | Role |
|---|---|---|
| **Zustand** | ^5.0.11 | Lightweight global state |

```javascript
useAuthStore   → token (persisted in localStorage) · setToken · logout
useThemeStore  → mode (dark/light) · toggleTheme
```

### 📝 Forms & Validation

| Library | Version | Role |
|---|---|---|
| **React Hook Form** | ^7.71.1 | High-performance form management |
| **Yup** | ^1.7.1 | Schema-based validation |
| **@hookform/resolvers** | ^5.2.2 | Bridges Yup with React Hook Form |

### 🌍 Internationalization

| Library | Version | Role |
|---|---|---|
| **i18next** | ^25.10.2 | Core translation framework |
| **react-i18next** | ^16.6.0 | React integration for i18next |
| **i18next-browser-languagedetector** | ^8.2.1 | Auto-detects browser language |

### 🗺️ Maps

| Library | Version | Role |
|---|---|---|
| **Leaflet** | ^1.9.4 | Interactive maps library |
| **React Leaflet** | ^5.0.0 | React wrapper for Leaflet |

### 🔔 Notifications

| Library | Version | Role |
|---|---|---|
| **React Toastify** | ^11.0.5 | Toast notification system |

### 🛠️ Dev Dependencies

| Library | Role |
|---|---|
| **ESLint** | Code quality and linting |
| **@vitejs/plugin-react** | React support in Vite |
| **eslint-plugin-react-hooks** | Enforces Rules of Hooks |
| **eslint-plugin-react-refresh** | Validates fast refresh compatibility |

---

## 🔌 API Endpoints

| Endpoint | Method | Description | Auth |
|---|---|---|---|
| `/auth/Account/Login` | POST | User login | ❌ |
| `/auth/Account/Register` | POST | Create account | ❌ |
| `/auth/Account/RefreshToken` | POST | Refresh access token | ❌ |
| `/auth/Account/SendCode` | POST | Send password reset code | ❌ |
| `/auth/Account/ResetPassword` | PATCH | Reset password | ❌ |
| `/Products` | GET | Product list with filters | ❌ |
| `/Products/:id` | GET | Single product details | ❌ |
| `/Products/:id/reviews` | POST | Submit a review | ✅ |
| `/Categories` | GET | Category list | ❌ |
| `/Carts` | GET | Get cart contents | ✅ |
| `/Carts` | POST | Add item to cart | ✅ |
| `/Carts/:id` | PATCH | Update item quantity | ✅ |
| `/Carts/:id` | DELETE | Remove item from cart | ✅ |
| `/Checkouts` | POST | Place an order | ✅ |
| `/Profile` | GET | User info + order history | ✅ |
| `/Profile/change-email` | PATCH | Update email address | ✅ |
| `/Profile/change-password` | PATCH | Update password | ✅ |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd reactProject

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Available Scripts

```bash
npm run dev      # Local dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```

### Environment Variables `.env`

```env
VITE_API_BASE_URL=https://knowledgeshop.runasp.net/api
```

---

## 🏗️ Architectural Patterns

### 1. Custom Hooks Pattern
All API logic is isolated in dedicated hooks:
```javascript
// Clean one-liner usage in any component:
const { data, isLoading, isError } = useProducts({ limit: 8, page: 1 });
const { mutate: addToCart, isPending } = useAddToCart();
```

### 2. Protected Routes
```javascript
// ProtectedRouter checks for a token before rendering the page
<ProtectedRouter>
  <Cart />
</ProtectedRouter>
```

### 3. Outlet Context (Nested Routes)
```javascript
// Profile.jsx passes data down to child pages
<Outlet context={{ data }} />

// ProfileInfo.jsx receives it — no prop drilling
const { data } = useOutletContext();
```

### 4. Dual Emotion Cache for RTL
```javascript
// Arabic  → rtlCache (reverses all CSS directions)
// English → ltrCache (normal)
<CacheProvider value={isRtl ? rtlCache : ltrCache}>
```

### 5. Automatic Refresh Token
```
API request
  ↓
401 Unauthorized
  ↓
POST /auth/Account/RefreshToken
  ↓
Save new access token
  ↓
Retry original request automatically
```

---

## 📱 Responsive Breakpoints

| Breakpoint | Behavior |
|---|---|
| **xs (mobile)** | Mobile Drawer, single-column Grid |
| **sm (tablet)** | Two columns in select sections |
| **md+ (desktop)** | Full Navbar, Shop sidebar, multi-column layouts |

---

## 🎨 Theme & Design Tokens

```javascript
// Primary accent color
primary: "#c026d3"        // Fuchsia purple

// Dark Mode
background.default: "#0f172a"
background.paper:   "#1e293b"

// Light Mode
background.default: "#ffffff"
background.paper:   "#ffffff"

// Typography
body:     "DM Sans"
headings: "Syne"  (fontWeight: 700–800)
buttons:  "Syne"  (textTransform: none)
```

---

## 👨‍💻 Developer

**Marah Zaid**
- 📧 mmzaid000@gmail.com
- 📞 +970 594 061 749
- 📍 Qalqilya, Palestine

---

*Built with React ^19.2.0 · Vite ^7.2.4 · MUI ^7.3.7*
# Gadgets Store

A modern, responsive e-commerce website for electronic gadgets built with React, Vite, and Tailwind CSS.

## Features
- Home with hero, categories, featured products, and newsletter
- Shop with filters (category, price range) and sorting
- Product details with gallery, zoom, ratings, reviews, stock status, and add-to-cart
- Cart with quantity updates, remove, and dynamic totals
- Checkout with Formik + Yup validation and mocked payment selection
- About, Contact (with form), FAQ
- Sticky navigation with search autocomplete and dark mode toggle
- Persistent cart via localStorage
- SEO meta updates per page and accessible, semantic markup

## Tech Stack
- React 19 + Vite
- React Router
- Tailwind CSS
- Formik + Yup

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open the app at the URL printed in the terminal (usually `http://localhost:5173`).

## Project Structure
- `src/components` – Reusable UI and layout components
- `src/pages` – Route pages
- `src/state` – Context providers for cart and theme
- `src/data` – Mock products
- `src/utils` – SEO utilities

## Accessibility & SEO
- Semantic HTML, labels for inputs, alt attributes on images
- Color contrast via Tailwind and dark mode support
- Meta tags for title and description set per page

## Notes
- Payment is mocked; no real transactions occur
- Product data is local and for demo purposes only

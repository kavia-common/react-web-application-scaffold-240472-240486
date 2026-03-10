import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import ProductCard from './components/products/ProductCard';
import CartDrawer from './components/cart/CartDrawer';
import CheckoutModal from './components/checkout/CheckoutModal';
import Button from './components/ui/Button';
import { getProducts } from './services/products';

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   description: string,
 *   priceCents: number,
 *   tag: string
 * }} Product
 */

/**
 * @typedef {{
 *   product: !Product,
 *   quantity: number
 * }} CartItem
 */

/**
 * Converts cart array to total item count.
 * @param {!Array<!CartItem>} items
 * @return {number}
 */
function getCartCount(items) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * PUBLIC_INTERFACE
 * Retro-themed simple e-commerce app (catalog + cart + checkout).
 * @return {React.ReactElement}
 */
function App() {
    const [theme, setTheme] = useState('light');
    const [cartOpen, setCartOpen] = useState(false);
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [cartItems, setCartItems] = useState(/** @type {!Array<!CartItem>} */ ([]));

    const products = useMemo(() => getProducts(), []);
    const cartCount = useMemo(() => getCartCount(cartItems), [cartItems]);

    // Effect to apply theme to document element.
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    /**
     * PUBLIC_INTERFACE
     * Toggles between light/dark themes.
     * @return {void}
     */
    function toggleTheme() {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    /**
     * Adds a product to cart (incrementing quantity if already present).
     * @param {!Product} product
     * @return {void}
     */
    function handleAddToCart(product) {
        setCartItems((prev) => {
            const existing = prev.find((i) => i.product.id === product.id);
            if (existing) {
                return prev.map((i) => (i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
            }
            return prev.concat([{ product, quantity: 1 }]);
        });
        setCartOpen(true);
    }

    /**
     * Increments quantity for a cart item by product id.
     * @param {string} productId
     * @return {void}
     */
    function increment(productId) {
        setCartItems((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, quantity: i.quantity + 1 } : i))
        );
    }

    /**
     * Decrements quantity for a cart item by product id (min 1).
     * @param {string} productId
     * @return {void}
     */
    function decrement(productId) {
        setCartItems((prev) =>
            prev.map((i) =>
                i.product.id === productId ? { ...i, quantity: Math.max(1, i.quantity - 1) } : i
            )
        );
    }

    /**
     * Removes an item from the cart by product id.
     * @param {string} productId
     * @return {void}
     */
    function remove(productId) {
        setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
    }

    /**
     * Opens checkout and closes cart drawer.
     * @return {void}
     */
    function openCheckout() {
        setCartOpen(false);
        setCheckoutOpen(true);
    }

    /**
     * Clears the cart after order placement.
     * @return {void}
     */
    function handleOrderPlaced() {
        setCartItems([]);
        setCartOpen(false);
    }

    const filteredProducts = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) {
            return products;
        }
        return products.filter((p) => {
            return (
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                p.tag.toLowerCase().includes(q)
            );
        });
    }, [products, query]);

    return (
        <div className="App">
            <header className="topbar" aria-label="Store header">
                <div className="topbar-inner">
                    <div className="brand" aria-label="RetroMart brand">
                        <span className="brand-mark" aria-hidden="true">
                            ▣
                        </span>
                        <div className="brand-text">
                            <div className="brand-name">RetroMart</div>
                            <div className="brand-tagline">Simple e-commerce demo</div>
                        </div>
                    </div>

                    <div className="topbar-actions">
                        <label className="search" aria-label="Search products">
                            <span className="search-label">Search</span>
                            <input
                                className="search-input"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Try 'neon' or 'tee'"
                            />
                        </label>

                        <Button
                            variant="secondary"
                            onClick={toggleTheme}
                            ariaLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                            className="topbar-btn"
                        >
                            {theme === 'light' ? 'Dark' : 'Light'}
                        </Button>

                        <Button
                            onClick={() => setCartOpen(true)}
                            ariaLabel="Open cart"
                            className="topbar-btn"
                        >
                            Cart <span className="pill">{cartCount}</span>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="main" aria-label="Store content">
                <section className="hero" aria-label="Store hero">
                    <div className="hero-panel">
                        <h1 className="hero-title">Shop the retro future.</h1>
                        <p className="hero-subtitle">
                            A tiny catalog, a cart drawer, and a checkout modal — all client-side and accessible.
                        </p>
                        <div className="hero-actions">
                            <Button onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}>
                                Browse products
                            </Button>
                            <Button variant="ghost" onClick={() => setCartOpen(true)}>
                                View cart
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="section" id="catalog" aria-label="Product catalog">
                    <div className="section-header">
                        <h2 className="section-title">Catalog</h2>
                        <div className="section-meta">
                            Showing <strong>{filteredProducts.length}</strong> item(s)
                        </div>
                    </div>

                    <div className="grid" role="list" aria-label="Product grid">
                        {filteredProducts.map((product) => (
                            <div role="listitem" key={product.id}>
                                <ProductCard product={product} onAddToCart={handleAddToCart} />
                            </div>
                        ))}
                    </div>
                </section>

                <footer className="footer" aria-label="Footer">
                    <div className="footer-inner">
                        <div className="footer-left">© {new Date().getFullYear()} RetroMart</div>
                        <div className="footer-right">Tip: use the search box to filter products.</div>
                    </div>
                </footer>
            </main>

            <CartDrawer
                open={cartOpen}
                items={cartItems}
                onClose={() => setCartOpen(false)}
                onIncrement={increment}
                onDecrement={decrement}
                onRemove={remove}
                onCheckout={openCheckout}
            />

            <CheckoutModal
                open={checkoutOpen}
                items={cartItems}
                onClose={() => setCheckoutOpen(false)}
                onOrderPlaced={handleOrderPlaced}
            />
        </div>
    );
}

export default App;

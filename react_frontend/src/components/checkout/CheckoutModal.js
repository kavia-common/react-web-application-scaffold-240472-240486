import React, { useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';
import { formatUsdFromCents } from '../../utils/money';

/**
 * @typedef {{
 *   product: { id: string, name: string, priceCents: number },
 *   quantity: number
 * }} CartItem
 */

/**
 * @typedef {{
 *   open: boolean,
 *   items: !Array<!CartItem>,
 *   onClose: function(): void,
 *   onOrderPlaced: function(): void
 * }} CheckoutModalProps
 */

/**
 * Validates email with a simple pattern (good enough for demo UI).
 * @param {string} value
 * @return {boolean}
 */
function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * PUBLIC_INTERFACE
 * Modal checkout form. No backend: simulates placing an order.
 * @param {!CheckoutModalProps} props
 * @return {React.ReactElement|null}
 */
function CheckoutModal(props) {
    const { open, items, onClose, onOrderPlaced } = props;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | success

    const totalCents = useMemo(() => {
        return items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);
    }, [items]);

    useEffect(() => {
        if (open) {
            setStatus('idle');
        }
    }, [open]);

    if (!open) {
        return null;
    }

    const hasItems = items.length > 0;
    const formValid =
        hasItems && name.trim().length >= 2 && address.trim().length >= 6 && isValidEmail(email) && status !== 'submitting';

    /**
     * Handles simulated order submission.
     * @param {!Event} event
     */
    function handleSubmit(event) {
        event.preventDefault();
        if (!formValid) {
            return;
        }
        setStatus('submitting');

        window.setTimeout(() => {
            setStatus('success');
            onOrderPlaced();
        }, 650);
    }

    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Checkout modal">
            <div className="modal">
                <div className="modal-header">
                    <div>
                        <div className="modal-title">Checkout</div>
                        <div className="modal-subtitle">A tiny form with big retro vibes.</div>
                    </div>
                    <Button variant="ghost" onClick={onClose} ariaLabel="Close checkout">
                        Close
                    </Button>
                </div>

                {status === 'success' ? (
                    <div className="modal-success" aria-label="Order placed confirmation">
                        <div className="modal-success-title">Order placed!</div>
                        <div className="modal-success-desc">
                            Thanks, {name || 'friend'}. A confirmation will be sent to <strong>{email || 'your inbox'}</strong>.
                        </div>
                        <Button onClick={onClose} ariaLabel="Back to store">
                            Back to store
                        </Button>
                    </div>
                ) : (
                    <>
                        <div className="order-summary" aria-label="Order summary">
                            <div className="order-summary-title">Order summary</div>
                            <ul className="order-summary-list">
                                {items.map((item) => (
                                    <li key={item.product.id} className="order-summary-item">
                                        <span>
                                            {item.product.name} <span className="muted">× {item.quantity}</span>
                                        </span>
                                        <span className="muted">
                                            {formatUsdFromCents(item.product.priceCents * item.quantity)}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                            <div className="order-summary-total">
                                <span>Total</span>
                                <strong>{formatUsdFromCents(totalCents)}</strong>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="form" aria-label="Checkout form">
                            <label className="field">
                                <span className="label">Email</span>
                                <input
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@retro.mail"
                                    inputMode="email"
                                    autoComplete="email"
                                    aria-invalid={email.length > 0 && !isValidEmail(email)}
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="label">Full name</span>
                                <input
                                    className="input"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Casey Pixel"
                                    autoComplete="name"
                                    required
                                />
                            </label>

                            <label className="field">
                                <span className="label">Address</span>
                                <textarea
                                    className="input textarea"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="123 Neon Ave, Suite 8-bit"
                                    autoComplete="street-address"
                                    required
                                />
                            </label>

                            <div className="form-actions">
                                <Button variant="secondary" onClick={onClose} ariaLabel="Cancel checkout">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={!formValid} ariaLabel="Place order">
                                    {status === 'submitting' ? 'Placing...' : 'Place order'}
                                </Button>
                            </div>

                            {!hasItems ? <div className="form-error">Cart is empty.</div> : null}
                            {email.length > 0 && !isValidEmail(email) ? (
                                <div className="form-error">Enter a valid email address.</div>
                            ) : null}
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default CheckoutModal;

import React from 'react';
import Button from '../ui/Button';
import { formatUsdFromCents } from '../../utils/money';

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   priceCents: number
 * }} ProductLite
 */

/**
 * @typedef {{
 *   product: !ProductLite,
 *   quantity: number
 * }} CartItem
 */

/**
 * @typedef {{
 *   open: boolean,
 *   items: !Array<!CartItem>,
 *   onClose: function(): void,
 *   onIncrement: function(string): void,
 *   onDecrement: function(string): void,
 *   onRemove: function(string): void,
 *   onCheckout: function(): void
 * }} CartDrawerProps
 */

/**
 * PUBLIC_INTERFACE
 * Slide-in cart drawer with a retro look.
 * @param {!CartDrawerProps} props
 * @return {React.ReactElement}
 */
function CartDrawer(props) {
    const { open, items, onClose, onIncrement, onDecrement, onRemove, onCheckout } = props;

    const totalCents = items.reduce((sum, item) => sum + item.product.priceCents * item.quantity, 0);

    return (
        <aside className={`drawer ${open ? 'drawer-open' : ''}`} aria-hidden={!open}>
            <div className="drawer-header">
                <div>
                    <div className="drawer-title">Your Cart</div>
                    <div className="drawer-subtitle">{items.length ? 'Ready to check out?' : 'Empty. Add some goodies.'}</div>
                </div>
                <Button variant="ghost" onClick={onClose} ariaLabel="Close cart">
                    Close
                </Button>
            </div>

            <div className="drawer-body" role="list" aria-label="cart items">
                {items.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-title">No items yet.</div>
                        <div className="empty-state-desc">Hit “Add” on a product to get started.</div>
                    </div>
                ) : (
                    items.map((item) => (
                        <div className="cart-item" key={item.product.id} role="listitem">
                            <div className="cart-item-main">
                                <div className="cart-item-name">{item.product.name}</div>
                                <div className="cart-item-price">
                                    {formatUsdFromCents(item.product.priceCents)} · qty {item.quantity}
                                </div>
                            </div>

                            <div className="cart-item-actions" aria-label={`Quantity controls for ${item.product.name}`}>
                                <Button
                                    variant="secondary"
                                    onClick={() => onDecrement(item.product.id)}
                                    ariaLabel={`Decrease ${item.product.name} quantity`}
                                    disabled={item.quantity <= 1}
                                >
                                    −
                                </Button>
                                <Button
                                    variant="secondary"
                                    onClick={() => onIncrement(item.product.id)}
                                    ariaLabel={`Increase ${item.product.name} quantity`}
                                >
                                    +
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => onRemove(item.product.id)}
                                    ariaLabel={`Remove ${item.product.name} from cart`}
                                >
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="drawer-footer">
                <div className="total-row">
                    <span>Total</span>
                    <strong>{formatUsdFromCents(totalCents)}</strong>
                </div>
                <Button onClick={onCheckout} disabled={items.length === 0} ariaLabel="Proceed to checkout">
                    Checkout
                </Button>
            </div>
        </aside>
    );
}

export default CartDrawer;

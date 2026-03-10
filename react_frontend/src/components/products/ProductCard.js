import React from 'react';
import Button from '../ui/Button';
import { formatUsdFromCents } from '../../utils/money';

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
 *   onAddToCart: function(!Product): void
 * }} ProductCardProps
 */

/**
 * PUBLIC_INTERFACE
 * Displays a single product in a retro-styled card.
 * @param {!ProductCardProps} props
 * @return {React.ReactElement}
 */
function ProductCard(props) {
    const { product, onAddToCart } = props;

    return (
        <article className="card" aria-label={`${product.name} product`}>
            <div className="card-badge" aria-label="category">
                {product.tag}
            </div>
            <h3 className="card-title">{product.name}</h3>
            <p className="card-desc">{product.description}</p>
            <div className="card-row">
                <div className="card-price" aria-label="price">
                    {formatUsdFromCents(product.priceCents)}
                </div>
                <Button onClick={() => onAddToCart(product)} ariaLabel={`Add ${product.name} to cart`}>
                    Add
                </Button>
            </div>
        </article>
    );
}

export default ProductCard;

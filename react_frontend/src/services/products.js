/**
 * @fileoverview In-memory product catalog used by the demo e-commerce UI.
 */

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   description: string,
 *   priceCents: number,
 *   tag: string
 * }} Product
 */

/** @type {!Array<!Product>} */
const PRODUCTS = [
    {
        id: 'crt-101',
        name: 'CRT Pixel Tee',
        description: 'Soft cotton tee with a pixel-perfect retro print.',
        priceCents: 2499,
        tag: 'Apparel',
    },
    {
        id: 'flp-202',
        name: 'Floppy Disk Coasters',
        description: 'Set of 4 coasters that look like classic 3.5" disks.',
        priceCents: 1599,
        tag: 'Home',
    },
    {
        id: 'kbd-303',
        name: 'Clicky Keycap Set',
        description: 'Retro beige keycaps for your favorite keyboard.',
        priceCents: 4999,
        tag: 'Desk',
    },
    {
        id: 'nst-404',
        name: 'Neon Sticker Pack',
        description: 'Cyan + blue neon stickers for laptops and consoles.',
        priceCents: 799,
        tag: 'Accessories',
    },
    {
        id: 'snd-505',
        name: 'Synthwave Tape',
        description: 'A modern album on an old-school cassette shell.',
        priceCents: 1299,
        tag: 'Music',
    },
];

/**
 * PUBLIC_INTERFACE
 * Returns the list of products for the store.
 * @return {!Array<!Product>}
 */
export function getProducts() {
    return PRODUCTS.slice();
}

/**
 * @fileoverview Money formatting helpers.
 */

/**
 * PUBLIC_INTERFACE
 * Formats an integer amount in cents to a USD currency string.
 * @param {number} cents
 * @return {string}
 */
export function formatUsdFromCents(cents) {
    const dollars = cents / 100;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(dollars);
}

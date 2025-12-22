/**
 * Cart Utilities
 * Helper functions for cart operations
 */

/**
 * Calculate cart subtotal
 */
export function calculateSubtotal(cartItems) {
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace("$", ""));
    return total + price * item.quantity;
  }, 0);
}

/**
 * Calculate tax
 */
export function calculateTax(subtotal, taxRate = 0.08) {
  return subtotal * taxRate;
}

/**
 * Calculate shipping
 */
export function calculateShipping(subtotal, freeShippingThreshold = 50) {
  if (subtotal >= freeShippingThreshold) return 0;
  return 9.99;
}

/**
 * Calculate discount
 */
export function calculateDiscount(subtotal, discountPercent = 0) {
  return subtotal * (discountPercent / 100);
}

/**
 * Calculate total
 */
export function calculateTotal(cartItems, options = {}) {
  const {
    taxRate = 0.08,
    shippingCost = null,
    discountPercent = 0,
    freeShippingThreshold = 50,
  } = options;

  const subtotal = calculateSubtotal(cartItems);
  const discount = calculateDiscount(subtotal, discountPercent);
  const subtotalAfterDiscount = subtotal - discount;
  const tax = calculateTax(subtotalAfterDiscount, taxRate);
  const shipping =
    shippingCost !== null
      ? shippingCost
      : calculateShipping(subtotalAfterDiscount, freeShippingThreshold);

  return {
    subtotal: subtotal.toFixed(2),
    discount: discount.toFixed(2),
    tax: tax.toFixed(2),
    shipping: shipping.toFixed(2),
    total: (subtotalAfterDiscount + tax + shipping).toFixed(2),
  };
}

/**
 * Check if cart has item
 */
export function hasItem(cartItems, productId) {
  return cartItems.some((item) => item.id === productId);
}

/**
 * Get item quantity
 */
export function getItemQuantity(cartItems, productId) {
  const item = cartItems.find((item) => item.id === productId);
  return item ? item.quantity : 0;
}

/**
 * Get cart item count
 */
export function getItemCount(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Validate cart item
 */
export function validateCartItem(item) {
  if (!item || !item.id) return false;
  if (!item.price || isNaN(parseFloat(item.price.replace("$", ""))))
    return false;
  if (!item.quantity || item.quantity < 1) return false;
  return true;
}

/**
 * Merge cart items (for sync)
 */
export function mergeCartItems(localCart, serverCart) {
  const merged = [...localCart];

  serverCart.forEach((serverItem) => {
    const existingIndex = merged.findIndex((item) => item.id === serverItem.id);
    if (existingIndex >= 0) {
      // Keep higher quantity
      merged[existingIndex].quantity = Math.max(
        merged[existingIndex].quantity,
        serverItem.quantity
      );
    } else {
      merged.push(serverItem);
    }
  });

  return merged;
}

export default {
  calculateSubtotal,
  calculateTax,
  calculateShipping,
  calculateDiscount,
  calculateTotal,
  hasItem,
  getItemQuantity,
  getItemCount,
  validateCartItem,
  mergeCartItems,
};

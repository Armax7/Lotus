const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/** Sends product to stripe archive so is not longer active.
 *
 * @param {string} prod_id Product id as string.
 * @returns {Object} Updated product data
 */
export async function archiveProduct(prod_id) {
  const updatedProduct = await stripe.products.update(prod_id, {
    active: false,
  });

  return updatedProduct;
}

/** Re-activates a product from stripe archive.
 *
 * @param {string} prod_id Product id as string.
 * @returns {Object} Updated product data
 */
export async function unarchiveProduct(prod_id) {
  const updatedProduct = await stripe.products.update(prod_id, {
    active: true,
  });

  return updatedProduct;
}

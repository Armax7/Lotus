import * as Controllers from "./sync-stripe-supabase_controllers";

export async function handleUpdateAllSpPriceIdsFromStripe(req, res) {
  try {
    const response = await Controllers.updateAllSbPriceIdFromStripe();
    return res.status(200).json(response);
  } catch (response) {
    return res.status(500).json(response.error);
  }
}

export async function handleUpdateSyncSupaProductsToStripe(req, res) {
  try {
    const response = await Controllers.updateArtworksSbToStripe();
    return res.status(200).json(response);
  } catch (response) {
    return res.status(response.error.status).json(response.error);
  }
}

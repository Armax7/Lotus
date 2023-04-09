import { supabase } from "../../lib/supabaseClient";
import { v4 as uuidV4 } from "uuid";

/** Uploads a file into artworks' image bucket
 *
 * @param {*} file Receives an image file.
 * @returns {string} String with stored image's url.
 */
export async function uploadArtworkImage(file) {
  const filename = `${uuidV4()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("imagebuck")
    .upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    });

  const filepath = data.path;

  return filepath;
}

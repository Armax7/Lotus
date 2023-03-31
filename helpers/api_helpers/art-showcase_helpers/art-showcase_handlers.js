import * as Controllers from "./art-showcase_controllers";


export async function handleGet(req, res) {
  try {
    const {id_art} = req.query
    const images = await Controllers.getAllImages(id_art);
    return res.status(200).json(images);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// export async function handlePost(req, res) {
//   try {
//     
//     const postImage = await Controllers.postImage(req.body);
//     return res.status(200).json(postImage);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }



// export async function handleDelete(req, res) {
//   try {
//     let { id } = req.query;
//     const deleteImage = await Controllers.deleteImage(id);
//     return res.status(200).json(deleteImage);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
import * as Controllers from "./authors_controllers";


export async function handleGet(req, res) {
  try {
    const authors = await Controllers.getAllAuthors();
    return res.status(200).json(authors);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

export async function handleGetByAuthorId(req, res) {
  try {
    const {author_id} = req.query
    const author = await Controllers.getAuthorsById(author_id);
    return res.status(200).json(author);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// export async function handlePost(req, res) {
//   try {
//     
//     const postAuthor = await Controllers.postAuthor(req.body);
//     return res.status(200).json(postAuthor);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }



// export async function handleDelete(req, res) {
//   try {
//     let { id } = req.query;
//     const deleteAuthor = await Controllers.deleteAuthor(id);
//     return res.status(200).json(deleteAuthor);
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// }
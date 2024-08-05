const CommentModel = require('../model/Comment');
const  PostModel = require('../model/Post');
const UserModel = require('../model/User'); 

/** POST: http://localhost:8080/api/comment/create 
 * @param : {
  "post" : "post",
  "content": "media file link",
  "author" : "bill"
}
*/
async function create(req, res) {
  try {
    const { post, content, author } = req.body;

    const user = await UserModel.findOne({ username: author });
    if(!user){
        return res.status(404).json({ message: "User not found" });
    }

    const postId = await PostModel.findOne({_id: post });
    if(!postId){
        return res.status(404).json({ message: "User not found" });
    }
    const comment = new CommentModel({
      author: user._id,
      post: post,
      content: content,
    });

    // return save result as a response
    const result = await comment.save();
    res.status(201).send({ msg: 'Comment created Successfully', Comment: result });
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

/** GET: http://localhost:8080/api/comment/postId/ */
async function getPostComments(req, res) {
  const { postId } = req.params;

  try {
    if (!postId) return res.status(400).send({ error: 'Invalid Post' });

    const data = await CommentModel.find({ post: postId }).exec();
    if (!data) return res.status(404).send({ error: "Couldn't Find the Comments for this Posts" });

    res.status(200).json(data);
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

/** GET: http://localhost:8080/api/comment/id */
async function getComment(req, res) {
  const { commentId } = req.params;

  try {
    if (!commentId) return res.status(400).send({ error: 'Invalid Comment' });

    const data = await CommentModel.findOne({ _id: commentId }).exec();
    if (!data) return res.status(404).send({ error: "Couldn't Find the Comment" });

    res.status(200).json(data);
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

/** PUT: http://localhost:8080/api/comment/id 
 * @param: {
  "header" : "<token>"
}
body: { 
    "content": ""
}
*/
async function updateComment(req, res) {
  try {
    const { commentId } = req.params;

    if (!commentId) return res.status(404).send({ error: 'Comment Not Found...!' });

    const body = req.body;

    // update the data
    const data = await CommentModel.updateOne({ _id: commentId }, body).exec();
    if (!data) return res.status(404).send({ error: 'Comment Not Found...!' });

    res.status(200).send({ msg: 'Record Updated...!' });
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

/** DELETE: http://localhost:8080/api/comment/id 
 * @param: {
  "header" : "<token>"
}
*/
async function deleteComment(req, res) {
  try {
    const { commentId } = req.params;

    if (!commentId) return res.status(404).send({ error: 'Comment Not Found...!' });

    // delete the data
    await CommentModel.deleteOne({ _id: commentId }).exec();
    res.status(200).send({ msg: 'Record Deleted...!' });
  } catch (error) {
    console.error(error); // log the error for debugging purposes
    res.status(500).send({ error: 'Internal Server Error' });
  }
}

module.exports = {
  create,
  getPostComments,
  getComment,
  updateComment,
  deleteComment,
};
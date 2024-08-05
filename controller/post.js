const  PostModel = require('../model/Post');
const UserModel = require('../model/User'); 


/** POST: http://localhost:8080/api/post/create 
 * @param : {
  "title" : "title",
  "description" : "description",
  "content": "media file link",
  "author" : "bill"
}
*/
async function create(req, res) {
    try {
      const { title, description, content, author } = req.body;
  
      // Find the user document that corresponds to the author name
      const user = await UserModel.findOne({ username: author });
      //console.log(user);
      if (!user) {
        return res.status(404).send({ error: "Author not found" });
      }
  
      const post = new PostModel({
        author: user._id, // Use the _id of the user document
        title,
        description,
        content
      });
  
      // return save result as a response
      await post.save();
      res.status(201).send({ msg: "Post created Successfully", Post: post });
    } catch (error) {
      console.error(error); // log the error for debugging purposes
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

/** GET: http://localhost:8080/api/post/user123/ */

async function getUserPosts(req, res) {
    const { userId } = req.params;
    try {
        if (!userId) return res.status(400).send({ error: "Invalid Username" });
        const data = await PostModel.find({ author: userId }).exec();
        if (!data) return res.status(404).send({ error: "Couldn't Find the User Posts" });
        return res.status(200).json(data);
    } catch (error) {
        console.error(error); // log the error for debugging purposes
        return res.status(500).send({ error: "Internal Server Error" });
    }
 }

/** GET: http://localhost:8080/api/post/user123/id */
async function getUserPost(req, res) {
    const { userId, postId } = req.params;

    try {
        if (!userId) return res.status(400).send({ error: "Invalid Username" });

        const post = await PostModel.findOne({ author: userId, _id: postId }).exec();
        if (!post) return res.status(404).send({ error: "Couldn't Find the User/Post" });

        return res.status(200).json(post);
    } catch (error) {
        console.error(error); // log the error for debugging purposes
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/**
 * PUT: http://localhost:8080/api/post/update 
 * @param: {
  "header" : "<token>"
}
body: {
    "title" : "", 
    "description" : "",
    "content": "",
    "postId" : "",
}
*/
async function updatePost(req, res) {
    try {
        const { postId } = req.body;
        const body = req.body;
        const post = await PostModel.updateOne({ _id: postId }, body).exec();
        if (!post) return res.status(404).send({ error: "Post Not Found...!" });

        return res.status(200).send({ msg: "Record Updated...!" });
    } catch (error) {
        console.error(error); // log the error for debugging purposes
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/**
 * DELETE: http://localhost:8080/api/post/id 
 * @param: {
  "header" : "<token>"
}
*/
async function deletePost(req, res) {
    try {
        const { postId } = req.params;

        if (!postId) return res.status(404).send({ error: "Post Not Found...!" });

        await PostModel.deleteOne({ _id: postId }).exec();
        return res.status(200).send({ msg: "Record Deleted...!" });
    } catch (error) {
        console.error(error); // log the error for debugging purposes
        return res.status(500).send({ error: "Internal Server Error" });
    }
}
module.exports = {create, getUserPost, getUserPosts, updatePost, deletePost }

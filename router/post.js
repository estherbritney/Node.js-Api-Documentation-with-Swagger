const express =  require("express");
const postRouter = express.Router();
const Auth = require('../middleware/auth');

/** import all controllers */
const {create, getUserPost, getUserPosts, updatePost, deletePost } = require('../controller/post')
/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         description:
 *           type: string
 *           description: The description of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         author:
 *           type: string
 *           description: The ID of the author
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the post was last updated
 */

/**
 * @openapi
 * /api/post/:
 *   post:
 *     tags:
 *       - Post
 *     summary: Create a new post
 *     description: Creates a new post with the provided title, description, content, and author.
 *     requestBody:
 *       description: Post data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               description:
 *                 type: string
 *                 description: The description of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               author:
 *                 type: string
 *                 description: The username of the author
 *     responses:
 *       201:
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Post created Successfully"
 *                 Post:
 *                   $ref: '#/components/schemas/Post'
 *       404:
 *         description: Author not found
 *       500:
 *         description: Internal Server Error
 */
postRouter.route('/').post(create); // create post or content

/**
 * @openapi
 * /api/post/{userId}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get posts by user
 *     description: Retrieves a list of posts created by the specified user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid username
 *       404:
 *         description: User posts not found
 *       500:
 *         description: Internal Server Error
 */
postRouter.route('/:userId').get(getUserPosts); // get all user posts with username

/**
 * @openapi
 * /api/post/{userId}/{postId}:
 *   get:
 *     tags:
 *       - Post
 *     summary: Get a post by user and post ID
 *     description: Retrieves a single post created by the specified user with the specified post ID.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The username of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid username
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
postRouter.route('/:userId/:postId').get(getUserPost); // get a single user post with username and post id

/**
 * @openapi
 * /api/post/update:
 *   put:
 *     tags:
 *       - Post
 *     summary: Update a post
 *     description: Updates a post with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Post data
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - content
 *               - postId
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               description:
 *                 type: string
 *                 description: The description of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               postId:
 *                 type: string
 *                 description: The ID of the post
 *     responses:
 *       200:
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Record Updated...!"
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
postRouter.route('/update').put(updatePost); // is use to update the post

/**
 * @openapi
 * /api/post/{postId}:
 *   delete:
 *     tags:
 *       - Post
 *     summary: Delete a post
 *     description: Deletes a post with the specified ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: The ID of the post
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Record Deleted...!"
 *       404:
 *         description: Post not found
 *       500:
 *         description: Internal Server Error
 */
postRouter.route('/:postId').delete(deletePost); // is use to delete the post



module.exports =  postRouter;
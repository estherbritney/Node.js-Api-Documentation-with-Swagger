const express  = require('express');
const commentRouter = express.Router();


const {getPostComments, getComment, updateComment, deleteComment , create} = require('../controller/comment');
/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         author:
 *           $ref: '#/components/schemas/User'
 *         post:
 *           $ref: '#/components/schemas/Post'
 *         content:
 *           type: string
 *           example: "This is a comment"
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         username:
 *           type: string
 *           example: "bill"
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "60d21b4667d0d8992e610c85"
 *         title:
 *           type: string
 *           example: "Post Title"
 */



/** POST: http://localhost:8080/api/comment/create 
 * @openapi
 * '/api/comment/create':
 *  post:
 *    tags:
 *      - Comment
 *    summary: Create a comment
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - post
 *              - content
 *              - author
 *            properties:
 *              post:
 *                type: string
 *                example: "60d21b4667d0d8992e610c85"
 *              content:
 *                type: string
 *                example: "This is a comment"
 *              author:
 *                type: string
 *                example: "bill"
 *    responses:
 *      201:
 *        description: Comment created successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Comment created Successfully"
 *                Comment:
 *                  $ref: '#/components/schemas/Comment'
 *      404:
 *        description: User or Post not found
 *      500:
 *        description: Internal Server Error
 */


commentRouter.route('/').post(create); // create post or content


/** GET: http://localhost:8080/api/comment/postId/ 
 * @openapi
 * '/api/comment/{postId}':
 *  get:
 *    tags:
 *      - Comment
 *    summary: Get all comments for a post with postID
 *    parameters:
 *      - name: postId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the post
 *    responses:
 *      200:
 *        description: Successfully fetched comments
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Comment'
 *      400:
 *        description: Invalid Post
 *      404:
 *        description: Comments not found
 *      500:
 *        description: Internal Server Error
 */


commentRouter.route('/:postId').get(getPostComments); // get all post's comments


/** GET: http://localhost:8080/api/comment/id 
 * @openapi
 * '/api/comment/{commentId}':
 *  get:
 *    tags:
 *      - Comment
 *    summary: Get a comment by commentID
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the comment
 *    responses:
 *      200:
 *        description: Successfully fetched the comment
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Comment'
 *      400:
 *        description: Invalid Comment
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Internal Server Error
 */


commentRouter.route('/:commentId').get(getComment); // get a single user post with username and post id


/** PUT: http://localhost:8080/api/comment/id 
 * @openapi
 * '/api/comment/{commentId}':
 *  put:
 *    tags:
 *      - Comment
 *    summary: Update a comment by ID
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the comment to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                example: "Updated content"
 *    responses:
 *      200:
 *        description: Successfully updated the comment
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Record Updated...!"
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Internal Server Error
 */
commentRouter.route('/update').put(updateComment); // is use to update the post
/** DELETE: http://localhost:8080/api/comment/id 
 * @openapi
 * '/api/comment/{commentId}':
 *  delete:
 *    tags:
 *      - Comment
 *    summary: Delete a comment by ID
 *    parameters:
 *      - name: commentId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        description: The ID of the comment to delete
 *    responses:
 *      200:
 *        description: Successfully deleted the comment
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                msg:
 *                  type: string
 *                  example: "Record Deleted...!"
 *      404:
 *        description: Comment not found
 *      500:
 *        description: Internal Server Error
 */
commentRouter.route('/:postId').delete(deleteComment); // is use to delete the post

module.exports =  commentRouter;
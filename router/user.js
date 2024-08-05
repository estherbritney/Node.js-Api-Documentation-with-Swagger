const express  = require('express');
const userRouter = express.Router();
const Auth = require('../middleware/auth');

const {deleteUser, login, register, updateUser, getUser, verifyUser } =  require ('../controller/user');


/** POST Methods */
   /**
    * @openapi
    * '/api/user/register':
    *  post:
    *     tags:
    *     - User Controller
    *     summary: Create a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - username
    *              - email
    *              - password
    *            properties:
    *              username:
    *                type: string
    *                default: johndoe 
    *              email:
    *                type: string
    *                default: johndoe@mail.com
    *              password:
    *                type: string
    *                default: johnDoe20!@
    *     responses:
    *      201:
    *        description: Created
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                msg:
    *                  type: string
    *                  example: "User created successfully"
    *      409:
    *        description: Conflict
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                error:
    *                  type: string
    *                  example: "User already exists"
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.route('/register').post(register); // register user

/**
    * @openapi
    * '/api/user/login':
    *  post:
    *     tags:
    *     - User Controller
    *     summary: Login as a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - username
    *              - password
    *            properties:
    *              username:
    *                type: string
    *                default: johndoe
    *              password:
    *                type: string
    *                default: johnDoe20!@
    *     responses:
    *      201:
    *        description: Created
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                msg:
    *                  type: string
    *                  example: "Login successful"
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.route('/login').post(verifyUser, login); // login in app

/**
    * @openapi
    * '/api/user/verify':
    *  post:
    *     tags:
    *     - User Controller
    *     summary: Verify a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - username
    *            properties:
    *              username:
    *                type: string
    *                default: johndoe
    *     responses:
    *      201:
    *        description: Created
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                msg:
    *                  type: string
    *                  example: "User verified successfully"
    *      409:
    *        description: Conflict
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    *        content:
    */
userRouter.route('/verify').post(verifyUser, (req, res) => res.end());

/** GET Methods */
   /**
    * @openapi
    * '/api/user/{username}':
    *  get:
    *     tags:
    *     - User Controller
    *     summary: Get a user by username
    *     parameters:
    *      - name: username
    *        in: path
    *        description: The username of the user
    *        required: true
    *        schema:
    *          type: string
    *     responses:
    *      200:
    *        description: Fetched Successfully
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                user:
    *                  $ref: '#/components/schemas/User'
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.route('/:username').get(getUser); // user with username

/** PUT Methods */
   /**
    * @openapi
    * '/api/user/update':
    *  put:
    *     tags:
    *     - User Controller
    *     summary: Modify a user
    *     requestBody:
    *      required: true
    *      content:
    *        application/json:
    *           schema:
    *            type: object
    *            required:
    *              - userId
    *            properties:
    *              userId:
    *                type: string
    *                default: ''
    *              firstName:
    *                type: string
    *                default: ''
    *              lastName:
    *                type: string
    *                default: ''
    *     responses:
    *      200:
    *        description: Modified
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                msg:
    *                  type: string
    *                  example: "User updated successfully"
    *      400:
    *        description: Bad Request
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.route('/update').put(updateUser); // is use to update the user profile

/** DELETE Methods */
   /**
    * @openapi
    * '/api/user/{userId}':
    *  delete:
    *     tags:
    *     - User Controller
    *     summary: Delete user by Id
    *     parameters:
    *      - name: userId
    *        in: path
    *        description: The unique Id of the user
    *        required: true
    *        schema:
    *          type: string
    *     responses:
    *      200:
    *        description: Removed
    *        content:
    *          application/json:
    *            schema:
    *              type: object
    *              properties:
    *                msg:
    *                  type: string
    *                  example: "User deleted successfully"
    *      400:
    *        description: Bad request
    *      404:
    *        description: Not Found
    *      500:
    *        description: Server Error
    */
userRouter.route('/:userId').delete(deleteUser);

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           example: "12345"
 *         username:
 *           type: string
 *           example: "johndoe"
 *         email:
 *           type: string
 *           example: "johndoe@mail.com"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 */



module.exports = userRouter;
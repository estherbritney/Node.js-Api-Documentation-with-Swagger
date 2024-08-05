const  express = require('express');
const cors = require('cors');
const  morgan =  require( 'morgan');
require('dotenv').config();
const  connectDB =  require('./database/db');
const userRouter  = require('./router/user');
const postRouter =  require('./router/post');
const  commentRouter = require('./router/comment');
const swaggerDocs = require('./swagger');

connectDB();
const app = express();

/** middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by'); 

swaggerDocs(app, 8080);
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

/** api routes */
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)
app.use('/api/comment', commentRouter)



const port = process.env.PORT || 8080;

const start = async () => {
    try {
        const server = app.listen(port);
        server.once('listening', () => {
            console.log(`Server is listening on port ${port}....`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();


const UserModel = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/** POST: http://localhost:8080/api/user/verify
 * @param : {
 * "username": "example123"
 * },
 */

async function verifyUser( req, res, next) {
    try {
        const { username } = req.method == "GET" ? req.params : req.body;
        // check the user existence
        let exist = await UserModel.findOne({ username });
        if (!exist) return res.status(404).send({ error: "Can't find User!" });
        if (exist) {
            const { password, ...responseUser } = exist._doc;
            return res.status(200).send({ msg: "User Verified Successfully", User: responseUser })
        }
        next();
    } catch(error){
        return res.status(404).send({ error: "Authentication Error" });
    }

}

/** POST: http://localhost:8080/api/user/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william"
}
*/

async function register(req, res) {
    try {
        const { username, password, firstName, lastName, email } = req.body;

        const userByUsername = await UserModel.findOne({ username });
        const userByEmail = await UserModel.findOne({ email });

        if (userByUsername) {
            return res.status(400).send({ error: "Username already exists" });
        }

        if (userByEmail) {
            return res.status(400).send({ error: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email
        });

        const result = await user.save();

        res.status(201).send({
             response: 'User Register Successfully',
              userId: `${result._id}` });

    } catch (error) {
        res.status(500).send({ error });
    }
}

/** POST: http://localhost:8080/api/user/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Username not Found" });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.status(400).send({ error: "Password does not Match" });
        }
        // create jwt token
        const token = jwt.sign({
            userId: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "24h" });
        return res.status(200).send({
            msg: "Login Successful...!",
            username: user.username,
            token
        });
    } catch (error) {
        return res.status(500).send({ error });
    }
}


/** GET: http://localhost:8080/api/user/example123 */
 
async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid Username" });
        }
        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(404).send({ error: "Couldn't Find the User" });
        }
        /** remove password from user */
        // mongoose return unnecessary data with object so convert it into json
        const { password,...rest } = Object.assign({}, user.toJSON());
        return res.status(200).send(rest);
    } catch (error) {
        return res.status(500).send({ error: "Cannot Find User Data" });
    }
}


/** PUT: http://localhost:8080/api/user/update 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
async function updateUser(req, res) {
    try {
      const { userId } = req.body;
  
      if (userId) {
        const body = req.body;
  
        // update the data
        const data = await UserModel.updateOne({ _id: userId }, body).exec();
        return res.status(201).send({ msg: "Record Updated...!" });
      } else {
        return res.status(401).send({ error: "User Not Found...!" });
      }
    } catch (error) {
      return res.status(401).send({ error });
    }
  }

/** DELETE: http://localhost:8080/api/user/delete 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/

async function deleteUser(req, res) {
    try {
        // const id = req.query.id;
        const { userId } = req.params;
        if (userId) {
            // update the data
            UserModel.deleteOne({ _id: userId }, function (err, data) {
                if (err) throw err;
                return res.status(201).send({ msg: "Record Deleted...!" });
            })
        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
 }

module.exports = { deleteUser, login, register, updateUser, getUser, verifyUser };
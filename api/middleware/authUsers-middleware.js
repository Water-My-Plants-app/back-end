const Users = require("../models/users-model");
const jwt = require("jsonwebtoken");
const secret = require("../../secret/jwt.secret");


//GET /api/users/:id ---- Middleware
function checkUserID() {
    return (req, res, next) => {
        const { id } = req.params;
        
        Users.getUserById(id)
        .then((user) => {
            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: `no user by ID ${id} found` });
            }
        })
        .catch((err) =>
        res.status(500).json({ message: "500 error, can't get by ID" })
        );
    };
}

//POST /api/auth/register -----> if a property mispelled, then error
function validateRegisterPost() {
    return async (req, res, next) => {
        const user = req.body;
        
        if (!user.username || !user.password) {
            return res.json({ message: "check username and password properties" });
        }
        
        next();
    };
}

//POST /api/auth/login ----->  if a property mispelled, then error
function validateLoginPost() {
    return async (req, res, next) => {
        const credentials = req.body;
        
        if (!credentials.username || !credentials.password) {
            return res.json({ message: "check username and password properties" });
        }
        
        next();
    };
}

// validates incorrect username/password on login
function isValid(user) {
    return Boolean(
        user.username && user.password && typeof user.password === "string"
        );
    }
    
    //GENERATE TOKEN for AUTH---->
    function generateToken(user) {
        const payload = {
            subID: user.id,
    username: user.username,
};

const options = {
    expiresIn: "1d",
};

return jwt.sign(payload, secret.jwtSecret, options);
}

//Middleware to restrict endpoints for users
function restrict() {
    return (req, res, next) => {
        const token = req.headers.authorization;
        if (token) {
            jwt.verify(token, secret.jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: "correct token required" });
                } else {
                    //token is valid here
                    req.decodedToken = decodedToken;
                    next();
                }
            });
        } else {
            res.status(401).json({
                message:
                "token invalid, not logged in, enter correct login credentials",
            });
        }
    };
}

module.exports = {
  checkUserID,
  validateRegisterPost,
  validateLoginPost,
  restrict,
  generateToken,
  isValid,
};
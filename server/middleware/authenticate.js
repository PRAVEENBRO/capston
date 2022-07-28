const jwt = require("jsonwebtoken");



const loginAuthenticate = async (req, res, next) => {
    // console.log(req.headers.authorization, '-------in Auth');

    try {
        if (req.headers['authorization']) {
            const token = req.headers['authorization'].split(' ')[1]
            // console.log(token, "token in loginauth")

            const payload = jwt.verify(token, process.env.SECRET_KEY)
            // console.log(payload,'---------payload in auth');
            if (payload.role === 'user' || payload.role === 'admin') {
                next();
            } else {
                res.status(401).json({
                    error: true,
                    message: "not Authorization",
                    data: null
                })
            }
        }
    } catch (err) {
        next(err)
    }

}

const adminAuthinticate = async (req, res, next) => {

    if (req.headers['authorization']) {
        const token = req.headers['authorization'].split(' ')[1]
        const payload = jwt.verify(token, process.env.SECRET_KEY)
        // console.log(payload);
        if (payload.role === 'admin') {
            next();
        } else {
            res.status(401).json({
                error: true,
                message: "user not  Authorization",
                data: null
            })
        }
    }

}


module.exports = {
    loginAuthenticate, adminAuthinticate
};
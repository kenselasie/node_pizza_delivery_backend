import jwt from 'jsonwebtoken'

export default (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        req.userAuthData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed, Token is invalid'
        })
    }
}
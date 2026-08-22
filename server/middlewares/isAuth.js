import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);

        return res.status(401).json({
            message: "Invalid token",
        });
    }
};
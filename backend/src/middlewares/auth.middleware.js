import { verifyToken } from "../utils/jwt.util.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No Token provided" });
        }

        const token = authHeader.split(" ")[1];

        const decoded = verifyToken(token);

        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Server Error", error: error.message });
    }
};

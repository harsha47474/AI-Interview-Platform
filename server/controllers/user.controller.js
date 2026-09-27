import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                message: "No user id found",
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const addCredits = async (req, res) => {
    try {
        const userId = req.userId;
        const { credits } = req.body;

        if (!userId) {
            return res.status(400).json({ message: "No user id found" });
        }

        const creditsToAdd = Number(credits);
        if (!creditsToAdd || creditsToAdd <= 0) {
            return res.status(400).json({ message: "Invalid credits amount" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.credits = (user.credits || 0) + creditsToAdd;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `${creditsToAdd} credits added successfully!`,
            credits: user.credits,
            user,
        });
    } catch (error) {
        console.error("Add credits error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


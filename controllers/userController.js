import { findUserbyEmail, findUserByPhone, CreateUser, getAllUsers, DeleteUser, getUserById, updateUserById } from "../models/usermodel";
import bcrypt from 'bcrypt';

export const updateMe = async (req, res) => {
    try {
        const userId = req.user.userId;
        const allowedUpdates = ['name', 'email', 'password', 'phone'];
        const updates = Object.keys(req.body);

        const isValid = updates.every(field => allowedUpdates.includes(field));
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid fields in update' });
        }

        const user = await getUserById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedData = {};
        for (let key of updates) {
            updatedData[key] = req.body[key];
        }

        if (req.body.password) {
            updatedData.password = await bcrypt.hash(req.body.password, 10);
        }

        const newUserData = await updateUserById(userId, updatedData);

        delete newUserData.password; // remove before sending
        res.status(200).json({ user: newUserData });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

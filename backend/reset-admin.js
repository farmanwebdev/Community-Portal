const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const resetAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/community-portal");
        console.log("Connected to MongoDB");

        // Find and update admin user
        const hashedPassword = await bcrypt.hash("admin@123", 12);
        const adminUser = await User.findOneAndUpdate(
            { email: "admin@example.com" },
            { password: hashedPassword },
            { new: true }
        );

        if (adminUser) {
            console.log("Admin password reset successfully!");
            console.log("Email: admin@example.com");
            console.log("Password: admin@123");
        } else {
            console.log("Admin user not found. Creating new admin...");
            const newAdmin = await User.create({
                name: "Super Admin",
                email: "admin@example.com",
                password: hashedPassword,
                role: "super-admin"
            });
            console.log("Admin created successfully!");
            console.log("Email: admin@example.com");
            console.log("Password: admin@123");
        }

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

resetAdmin();

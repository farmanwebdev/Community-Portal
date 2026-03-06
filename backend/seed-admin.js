const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/community-portal");
        console.log("Connected to MongoDB");

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email: "admin@example.com" });
        if (existingAdmin) {
            console.log("Admin user already exists!");
            process.exit(0);
        }

        // Create default admin user
        const hashedPassword = await bcrypt.hash("admin@123", 12);
        const adminUser = await User.create({
            name: "Super Admin",
            email: "admin@example.com",
            password: hashedPassword,
            role: "super-admin"
        });

        console.log("Admin user created successfully!");
        console.log("Email: admin@example.com");
        console.log("Password: admin@123");
        console.log("Role: super-admin");

        process.exit(0);
    } catch (error) {
        console.error("Error:", error.message);
        process.exit(1);
    }
};

seedAdmin();

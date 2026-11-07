import mongoose from "mongoose";
import dns from "node:dns";

// Ensure DNS resolution works reliably for SRV records on Windows environments
if (dns.getServers().every(s => s.startsWith("127."))) {
    dns.setServers(["1.1.1.1", "8.8.8.8"]);
}

const connectDB = async () => {
    mongoose.connection.on("connected", () => {
        console.log(`MongoDB connection established to: ${mongoose.connection.host}`);
    });

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB connection error:", err);
    });

    try {
        const uri = process.env.MONGODB_URI;
        await mongoose.connect(uri, { dbName: "ecommerce" });
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};

export default connectDB;
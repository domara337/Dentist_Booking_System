import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Routes
import userRoutes from "./routes/userRoutes.js";
import dentistRoutes from "./routes/dentistRoutes.js";
import availabilityRoutes from "./routes/availabilityRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // enable CORS
app.use(express.json()); // parse JSON request bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/dentists", dentistRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/appointments", appointmentRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

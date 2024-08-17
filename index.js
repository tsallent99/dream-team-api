const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const registerRoutes = require("./routes/register");
const userRoutes = require("./routes/user"); // Asegúrate de que el archivo es correcto
const tournamentRoutes = require("./routes/tournament");
const teamRoutes = require("./routes/team");
const loginRoute = require("./routes/login");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5170;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB
const uri =
  process.env.MONGODB_URI || "mongodb://localhost:27017/dream-team-app";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Usar rutas
app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoute);
app.use("/api/user", userRoutes); // Asegúrate de que esta ruta sea correcta
app.use("/api", tournamentRoutes);
app.use("/api", teamRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

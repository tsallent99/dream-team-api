const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authenticateToken = require("../utils/middlewares/authenticationToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    // Usar req.user._id si el id del usuario está en el token
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err); // Para depuración
    res
      .status(500)
      .json({ message: "Error al obtener la información del usuario" });
  }
});

module.exports = router;

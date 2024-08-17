const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Ruta para el inicio de sesión
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Correo electrónico y contraseña requeridos" });
  }

  try {
    // Buscar el usuario por correo electrónico
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar un token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    // Enviar la respuesta con el token
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
});

module.exports = router;

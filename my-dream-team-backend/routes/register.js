const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// Ruta para registrar un nuevo usuario
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Verificar si el email ya está en uso
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El email ya está en uso" });
    }

    // Crear un nuevo usuario
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Enviar una respuesta exitosa sin token
    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

module.exports = router;

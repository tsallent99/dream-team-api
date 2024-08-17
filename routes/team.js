const express = require("express");
const router = express.Router();
const Team = require("../models/Team");
const authenticateToken = require("../utils/middlewares/authenticationToken");
const Tournament = require("../models/tournament");
const User = require("../models/user");
// Ruta para crear un equipo
router.post("/create-team", authenticateToken, async (req, res) => {
  const { name, balance, players, tournamentId } = req.body;
  console.log(name, balance, players, tournamentId);
  try {
    // Validar datos requeridos
    if (!name || balance === undefined || !players || !tournamentId) {
      return res.status(400).json({ message: "Datos requeridos faltantes" });
    }
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return res.status(404).json({ message: "tournament not found" });
    }
    // Crear el nuevo equipo
    const newTeam = new Team({
      name,
      balance,
      players,
    });

    // Guardar el equipo en la base de datos
    await newTeam.save();
    tournament.teams.push(newTeam.id);
    await tournament.save();
    // Opcional: Puedes asociar el equipo con el usuario que lo creó
    await User.findByIdAndUpdate(req.user.id, {
      $push: { teams: newTeam.id },
    });

    res.status(201).json(newTeam);
  } catch (err) {
    console.error("Error al crear el equipo:", err);
    res.status(500).json({ message: "Error al crear el equipo" });
  }
});

router.get("/get-team", authenticateToken, async (req, res) => {
  const { teamId } = req.query;

  if (!teamId) {
    return res.status(400).json({ message: "ID del equipo no proporcionado" });
  }

  try {
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    res.status(200).json(team);
  } catch (err) {
    console.error("Error al obtener el equipo:", err);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
});

module.exports = router;

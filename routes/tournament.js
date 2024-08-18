const express = require("express");
const router = express.Router();
const Tournament = require("../models/tournament");
const Team = require("../models/Team");
const authenticateToken = require("../utils/middlewares/authenticationToken");
// Ruta para crear un torneo
router.post("/create-tournament", async (req, res) => {
  const { name, associatedLeague, prizePool, startDate, initialBudget } =
    req.body;

  try {
    // Validar datos requeridos
    if (
      !name ||
      !associatedLeague ||
      prizePool === undefined ||
      initialBudget === undefined
    ) {
      return res.status(400).json({ message: "Datos requeridos faltantes" });
    }

    // Crear el nuevo torneo
    const newTournament = new Tournament({
      name,
      associatedLeague,
      prizePool,
      startDate: startDate || new Date(), // Si no se proporciona startDate, usar la fecha actual
      initialBudget,
    });

    // Guardar el torneo en la base de datos
    await newTournament.save();

    res.status(201).json(newTournament);
  } catch (err) {
    console.error("Error al crear el torneo:", err);
    res.status(500).json({ message: "Error al crear el torneo" });
  }
});

router.patch("/add-team", authenticateToken, async (req, res) => {
  const { tournamentId, teamId } = req.body;

  if (!tournamentId || !teamId) {
    return res
      .status(400)
      .json({ message: "ID del torneo o del equipo no proporcionado" });
  }

  try {
    // Verificar si el torneo y el equipo existen
    const tournament = await Tournament.findById(tournamentId);
    const team = await Team.findById(teamId);

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }

    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }

    // Añadir el equipo al torneo
    tournament.teams.push(team.id);
    await tournament.save();

    res.status(200).json({ message: "Equipo añadido al torneo con éxito" });
  } catch (err) {
    console.error("Error al añadir el equipo al torneo:", err);
    res.status(500).json({ message: "Error al añadir el equipo al torneo" });
  }
});

router.get("/get-tournaments", async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (err) {
    console.error("Error al obtener los torneos:", err);
    res.status(500).json({ message: "Error al obtener los torneos" });
  }
});

router.get("get-tournament", async (req, res) => {
  const { tournamentId } = req.body;
  if (!tournamentId) {
    return res.status(400).json({ message: "ID del torneo no proporcionado" });
  }
  try {
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Torneo no encontrado" });
    }
    res.status(200).json(tournament);
  } catch (err) {
    console.error("Error al obtener el torneo:", err);
    res.status(500).json({ message: "Error al obtener el torneo" });
  }
});

router.get("/get-tournaments-by-id", async (req, res) => {
  try {
    const { tournamentIds } = req.body;

    if (!tournamentIds || !Array.isArray(tournamentIds)) {
      return res
        .status(400)
        .json({ message: "Invalid tournament IDs provided" });
    }

    const tournaments = await Tournament.find({ _id: { $in: tournamentIds } });

    if (!tournaments.length) {
      return res
        .status(404)
        .json({ message: "No tournaments found for the provided IDs" });
    }

    res.status(200).json(tournaments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;

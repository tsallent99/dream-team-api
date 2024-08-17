const mongoose = require("mongoose");
const { Schema } = mongoose;
const { playerSchema } = require("./Player");

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    balance: { type: Number, required: true },
    players: [playerSchema], // Reutilizar el esquema de jugador
  },
  { versionKey: false }
);

module.exports = mongoose.model("Team", teamSchema);
module.exports.teamSchema = teamSchema; // Exportar el esquema para reutilización

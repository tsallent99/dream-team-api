const mongoose = require("mongoose");
const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    playerId: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Player", playerSchema);
module.exports.playerSchema = playerSchema; // Exportar solo el esquema para reutilización

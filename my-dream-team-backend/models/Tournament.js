const mongoose = require("mongoose");
const { Schema } = mongoose;
const { teamSchema } = require("./Team");

const tournamentSchema = new Schema(
  {
    name: { type: String, required: true },
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }], // Reutilizar el esquema de equipo
    associatedLeague: { type: Number, required: true },
    startDate: { type: Date, required: true },
    prizePool: { type: Number, required: true },
    market: { type: Schema.Types.ObjectId, ref: "Market" },
    initialBudget: { type: Number, required: true },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Tournament", tournamentSchema);

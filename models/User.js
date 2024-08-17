const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    tournaments: [{ type: Schema.Types.ObjectId, ref: "Tournament" }],
    teams: [{ type: Schema.Types.ObjectId, ref: "Team" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("User", userSchema);

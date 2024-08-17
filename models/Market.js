const mongoose = require("mongoose");
const { Schema } = mongoose;

const marketSchema = new Schema(
  {
    playersForSale: [{ type: Schema.Types.ObjectId, ref: "Player" }],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Market", marketSchema);

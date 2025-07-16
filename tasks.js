const mongoose = require("mongoose");
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  date: { type: Date, required: true },
  maxParticipants: { type: Number, required: true },
  participants: { type: [String], default: [] },
});

module.exports = mongoose.model("Event", SkillSchema);

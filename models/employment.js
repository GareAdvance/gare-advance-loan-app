const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const employmentSchema = new Schema({
  employmentType: { type: String, required: [ true, "Your employment type is required" ], enum: [ "full time", "part time", "contract", "outsourced", "self employed"], default: "self employed" },
  company_name: { type: String, required: true },
  company_address: { type: String, required: true },
  jopPosition: { type: String, required: true },
  userId: { type: ObjectId, ref: "User", required: true },
});

const Employment = mongoose.model("Employment", employmentSchema);

exports.Employment = Employment;
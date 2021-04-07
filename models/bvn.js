const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const BVNSchema = new Schema({
  bvn: { type: Number, required: true, unique: true },
  dateOfBirth: { type: Date, required: true },
  phone: { type: String, required: true, unique: true },
  userId: { type: ObjectId, ref: "User", required: true }
}, { timestamps: true });

const BVN = mongoose.model("BVN", BVNSchema);

exports.BVN = BVN;
const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    goalHours: {
      type: Number,
      required: true,
      min: 1,
    },

    hoursPracticed: {
      type: Number,
      default: 0,
    },

    progress: {
      type: Number,
      default: 0,
    },

    // 🔐 User Reference (Very Important)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true } // ✅ createdAt & updatedAt automatically
);

// 📊 Auto calculate progress before saving
skillSchema.pre("save", function (next) {
  if (this.goalHours > 0) {
    this.progress = Math.min(
      Math.round((this.hoursPracticed / this.goalHours) * 100),
      100
    );
  }
});

module.exports = mongoose.model("Skill", skillSchema);
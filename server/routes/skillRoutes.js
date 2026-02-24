const express = require("express");
const router = express.Router();
const Skill = require('../models/skill');
const auth = require('../middleware/authMiddleware');

// ==============================
// ✅ GET ALL SKILLS (User Specific)
// ==============================
router.get("/", auth, async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ==============================
// ✅ ADD NEW SKILL
// ==============================
router.post("/add", auth, async (req, res) => {
  try {
    const { name, goalHours } = req.body;

    if (!name || !goalHours) {
      return res.status(400).json({ message: "All fields required" });
    }

    const newSkill = new Skill({
      name,
      goalHours,
      hoursPracticed: 0,
      progress: 0,
      user: req.user.id,
    });

    await newSkill.save();

    res.status(201).json(newSkill);
  } catch (err) {
    console.log("ADD SKILL ERROR:", err);
    res.status(500).json({ message: "Server Error" });
  }
});
// ==============================
// ✅ UPDATE PRACTICE HOURS
// ==============================
router.put("/update/:id", auth, async (req, res) => {
  try {
    const { hours } = req.body;

    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.hoursPracticed += hours;

    // Calculate progress
    skill.progress = Math.min(
      Math.round((skill.hoursPracticed / skill.goalHours) * 100),
      100
    );

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

const Practice = require("../models/practice");

router.put("/update/:id", auth, async (req, res) => {
  const { hours } = req.body;

  const skill = await Skill.findById(req.params.id);

  skill.hoursPracticed += hours;

  await skill.save();

  // 🔥 Save practice history
  await Practice.create({
    skill: skill._id,
    user: req.user.id,
    hours,
  });

  res.json(skill);
});

// ==============================
// ✅ EDIT SKILL DETAILS
// ==============================
router.put("/edit/:id", auth, async (req, res) => {
  try {
    const { name, goalHours } = req.body;

    const skill = await Skill.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    skill.name = name;
    skill.goalHours = goalHours;

    // Recalculate progress after goal change
    skill.progress = Math.min(
      Math.round((skill.hoursPracticed / skill.goalHours) * 100),
      100
    );

    await skill.save();
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ==============================
// ✅ DELETE SKILL
// ==============================
router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

function newFunction() {
  console.log(req.user);
}

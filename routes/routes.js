const express = require("express");
const {
  postSkill,
  getData,
  deleteSkills,
  updateskills,
} = require("../controllers/SkillsController");
const {
  postExperience,
  getExperience,
  deleteExperience,
  updateExperience,
} = require("../controllers/ExperienceController");
const {
  getProfile,
  updatprofile,
} = require("../controllers/ProfileController");
const {
  createBlogs,
  getBlogs,
  deleteBlogs,
  updateBlog,
} = require("../controllers/BlogsController");
const {
  createportfolio,
  getAllPortfolio,
  getPortfolio,
  deletePortfolio,
} = require("../controllers/PortfolioController");

const multer = require("multer");

// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const router = express.Router();

//profile
router.get("/profile", getProfile);
router.put("/profile", updatprofile);

//Skills
router.post("/skills", postSkill);
router.get("/skills", getData);
router.delete("/skills", deleteSkills);
router.put("/skills/:id", updateskills);

//Experience
router.post("/experience", postExperience);
router.get("/experience", getExperience);
router.delete("/experience", deleteExperience);
router.put("/experience", updateExperience);

//========
router.post("/blogs", createBlogs);
router.get("/blogs", getBlogs);
router.delete("/blogs", deleteBlogs);
router.post("/blog/update", upload.single("cover"), updateBlog);

// ===Portfolio
router.post("/portfolio", createportfolio);
router.get("/portfolio", getAllPortfolio);
router.get("/portfolio/:id", getPortfolio);
router.delete("/portfolio/", deletePortfolio);
router.get("/", (req, res) => {
  res.send("server is running");
});

//module
module.exports = router;

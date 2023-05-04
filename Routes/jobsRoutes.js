const {
  createJob,
  getAllJobs,
  showStats,
  deleteJob,
  updateJob,
} = require("../Controllers/jobsControllser");

const router = require("express").Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteJob).patch(updateJob);

module.exports = router;

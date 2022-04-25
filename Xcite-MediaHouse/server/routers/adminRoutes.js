const express = require("express");
const {
  acceptJournalist,
  rejectJournalist,
  totalBlogOfWeb,
  totalJounOfWeb,
  totalUserOfWeb,
  getallJoun,
  getallUser,
  getAllAcceptedJoun,
  getAllPendingJoun,
} = require("../controllers/adminController");
const { protectedForAdmin } = require("../middlewares/protectedRoutes");
const router = express.Router();

// For Accepting Journalist as a Confrim Journalist
router.route("/admin/accept/:id").post(protectedForAdmin, acceptJournalist);

// For Accepting Journalist as a Confrim Journalist
router.route("/admin/acceptedjoun").get(getAllAcceptedJoun);
router.route("/admin/pendingjoun").get(getAllPendingJoun);

// For Rejecting Journalist
router.route("/admin/reject/:id").post(protectedForAdmin, rejectJournalist);

// For Getting Total Blog Of Web
router.route("/admin/web/totalBlog").post(protectedForAdmin, totalBlogOfWeb);

// For Getting all Journalist Of Web
router.route("/admin/web/totalJoun").get(getallJoun);

// For Getting all Users Of Web
router.route("/admin/web/totalUserdata").post(getallUser);

// For Getting Total Journalist Of Web
router
  .route("/admin/web/totalJournalist")
  .post(protectedForAdmin, totalJounOfWeb);

// For Getting Total Users Of Web
router.route("/admin/web/totalUser").post(protectedForAdmin, totalUserOfWeb);

module.exports = router;

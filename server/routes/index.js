const express = require("express");
const router = express.Router();

// Subrouters;
const userRouter = require("./user");
const fileRouter = require("./file");

// Mount our subrouters to assemble our apiRouter;
router.use("/users", userRouter);
router.use("/files", fileRouter);

// Export our apiRouter, so that it can be used by our main app in app.js;
module.exports = router;

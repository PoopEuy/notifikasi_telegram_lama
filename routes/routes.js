// import express
import express from "express";

// import page controller
import { Home, About, Contact, botStart } from "../controllers/page.js";
import { getRealtime, getSiteDown } from "../controllers/realtimeController.js";
import {
  getRealtimeLama,
  getSiteDownLama,
} from "../controllers/realtimeLamaController.js";
// init express router
const router = express.Router();

// Home route
router.get("/", Home);

// About route
router.get("/about", About);

// Contact route
router.get("/contact", Contact);

//start Bot
router.get("/botStart", botStart);

//realtime
router.get("/getRealtime", getRealtime);
router.get("/getSiteDown", getSiteDown);
router.get("/getRealtimeLama", getRealtimeLama);
router.get("/getSiteDownLama", getSiteDownLama);

// export default router
export default router;

const express = require("express");
const router = express.Router();
const controller = require("../Controllers/eventController");
router.post("/events", controller.createEvent);
router.post("/register", controller.registerEvent);
router.get("/event/:eventName", controller.getEvents);
router.get("/events/:eventName/participants", controller.getParticipants);
router.delete("/events/:eventName", controller.deleteEvent);
router.get("/events", controller.listAllEvents);
router.get("/register", controller.listAllParticipants);

module.exports = router;

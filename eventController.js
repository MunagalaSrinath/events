const express = require("express");
const Event = require("../models/tasks");
const createEvent = async (req, res) => {
  const { name, date, maxParticipants } = req.body;
  try {
    const exists = await Event.findOne({ name });
    if (exists)
      return res.status(400).json({ message: "Event already exists" });
    const newEvent = new Event({ name, date, maxParticipants });
    await newEvent.save();
    res.status(200).json({ message: "Event successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log(err);
  }
};

const registerEvent = async (req, res) => {
  const { participantName, eventName } = req.body;
  try {
    const event = await Event.findOne({ name: eventName });
    if (!event) return res.status(400).json({ message: "Event not found" });
    if (event.participants.includes(participantName)) {
      return res.status(400).json({ error: "Already registered" });
    }
    if (event.participants.length >= event.maxParticipants) {
      return res.status(400).json({ error: "Event is full" });
    }
    event.participants.push(participantName);
    await event.save();
    res.status(200).json({ message: "Registration successful", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getEvents = async (req, res) => {
  const { eventName } = req.params;
  const event = await Event.findOne({ name: eventName });
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event);
};

const getParticipants = async (req, res) => {
  const { eventName } = req.params;
  const event = await Event.findOne({ name: eventName });
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.json(event.participants);
};
const deleteEvent = async (req, res) => {
  const { eventName } = req.params;
  const event = await Event.findOneAndDelete({ name: eventName });
  if (!event) return res.status(404).json({ error: "Event not found" });
  res.status(200).json({ message: "Event deleted" });
};

const listAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const listAllParticipants = async (req, res) => {
  try {
    const events = await Event.find();
    const allParticipants = events.flatMap((event) =>
      event.participants.map((participant) => ({
        participantName: participant,
        eventName: event.name,
      }))
    );
    res.status(200).json(allParticipants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getParticipants,
  deleteEvent,
  registerEvent,
  listAllEvents,
  listAllParticipants,
};

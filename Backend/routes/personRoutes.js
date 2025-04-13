const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

// GET all people
router.get("/", async (req, res) => {
  const people = await Person.find();
  res.render("index", { people });
});

// POST form
router.get("/new", (req, res) => {
  res.render("form", { person: {}, action: "/person", method: "POST" });
});

// POST new person
router.post("/", async (req, res) => {
  const { name, age, gender, mobile } = req.body;
  await Person.create({ name, age, gender, mobile });
  res.redirect("/person");
});

// EDIT form
router.get("/:id/edit", async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render("form", {
    person,
    action: `/person/${person._id}?_method=PUT`,
    method: "POST",
  });
});

// PUT update
router.put("/:id", async (req, res) => {
  const { name, age, gender, mobile } = req.body;
  await Person.findByIdAndUpdate(req.params.id, { name, age, gender, mobile });
  res.redirect("/person");
});

// DELETE confirmation
router.get("/:id/delete", async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.render("delete", { person });
});

// DELETE person
router.delete("/:id", async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect("/person");
});

// API: Get all people (JSON)
router.get('/api', async (req, res) => {
  const people = await Person.find();
  res.json(people); // ✅ Needed for React frontend
});

// API: Get a single person by ID (JSON)
router.get('/api/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.json(person);
});
// API routes
router.get('/api', async (req, res) => {
  const people = await Person.find();
  res.json(people);
});

router.get('/api/:id', async (req, res) => {
  const person = await Person.findById(req.params.id);
  res.json(person);
});

module.exports = router;

// index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/studentdb")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  department: String
});
const Student = mongoose.model("Student", studentSchema);

// Routes
app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/api/students", async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json(newStudent);
});

// Server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

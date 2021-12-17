const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

let studentList = [];

const updateStudents = () => {
  return JSON.parse(fs.readFileSync("studentsList.json", "utf8"));
};

const addStudent = (students) => {
  fs.writeFileSync("studentsList.json", JSON.stringify(students));
};

app.get("/student/getDetails", (req, res) => {
  res.send(updateStudents());
});

app.post("/student/add", (req, res) => {
  studentList = updateStudents();
  studentList.push(req.body);
  addStudent(studentList);
  res.send({ result: "success" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Listeing on Port", PORT));

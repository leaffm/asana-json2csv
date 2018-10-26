const fs = require("fs");
const Json2csvParser = require("json2csv").Parser;

const data = require("./data.json");

const fields = [
  "TaskID",
  "CreatedAt",
  "CompletedAt",
  "LastModified",
  "Name",
  "Assignee",
  "StartDate",
  "DueDate",
  "ParentTask"
];

let justDate = date => {
  if (!date) return "";

  let d = new Date(date);
  return `${d.getDay()}\/${d.getMonth()}\/${d.getFullYear()}`;
};

let simplify = task => ({
  TaskID: task.gid,
  CreatedAt: justDate(task.created_at),
  CompletedAt: justDate(task.completed_at),
  LastModified: justDate(task.modified_at),
  Name: task.name,
  Assignee: task.assignee ? task.assignee.name : "",
  StartDate: justDate(task.start_on),
  DueDate: justDate(task.due_on),
  ParentTask: task.parent ? task.parent.name : ""
});

let tasks = [];

for (var task of data.data) {
  // parent task
  tasks.push(simplify(task));

  // subtasks
  for (var sub of task.subtasks) {
    tasks.push(simplify(sub));
  }
}

const parser = new Json2csvParser({ fields });
const csv = parser.parse(tasks);

fs.writeFile("out.csv", csv, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("All good!");
});

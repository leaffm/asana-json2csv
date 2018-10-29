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

let simplifyDate = date => {
  if (!date) return "";

  let d = new Date(date);
  return `${d.getDate()}\/${d.getMonth() + 1}\/${d.getFullYear()}`;
};

let simplifyTask = task => ({
  TaskID: task.gid,
  CreatedAt: simplifyDate(task.created_at),
  CompletedAt: simplifyDate(task.completed_at),
  LastModified: simplifyDate(task.modified_at),
  Name: task.name,
  Assignee: task.assignee ? task.assignee.name : "",
  StartDate: simplifyDate(task.start_on),
  DueDate: simplifyDate(task.due_on),
  ParentTask: task.parent ? task.parent.name : ""
});

let generateFileName = () => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ];
  let date = new Date();
  let day = date.getDay();
  let time = date.getHours();

  return `${days[day - 1]}-${date.getDate()}-${
    time < 12 ? "morning" : "afternoon"
  }.csv`;
};

let tasks = [];

for (var task of data.data) {
  // parent task
  tasks.push(simplifyTask(task));

  // subtasks
  for (var sub of task.subtasks) {
    tasks.push(simplifyTask(sub));
  }
}

const parser = new Json2csvParser({ fields });
const csv = parser.parse(tasks);

fs.writeFile(generateFileName(), csv, function(err) {
  if (err) {
    return console.log(err);
  }

  console.log("All good!");
});

import * as fs from "fs";
import * as readline from "readline";
import { todoList } from "./types";
import { startApp } from "../cli";
import kleur from "kleur";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const displayMenu = () => {
  console.log(kleur.bold().underline("\nChoose an action:\n"));
  console.log(kleur.cyan("1. Display Tasks"));
  console.log(kleur.cyan("2. Add Task"));
  console.log(kleur.cyan("3. Mark Task as Completed"));
  console.log(kleur.cyan("4. filter Task"));
  console.log(kleur.cyan("5. Delete Task\n"));
};

export const saveTasks = () => {
  fs.writeFileSync("tasks.json", JSON.stringify(todoList, null, 2));
};

export const displayTasks = () => {
  console.log("\x1Bc");
  if (todoList.length === 0) {
    console.log("No Tasks are found in todo list");
  } else {
    console.log(kleur.inverse("TODO List:\n"));
    todoList.forEach((task, index) => {
      console.log(
        task.completed
          ? kleur.green(
              `${index + 1}. Task: ${task.task}, Date: ${task.date}, ${
                task.completed ? "Status: completed" : "Status: Incomplete"
              }\n`
            )
          : kleur.red(
              `${index + 1}. Task: ${task.task}, Date: ${task.date}, ${
                task.completed ? "Status: completed" : "Status: Incomplete"
              }\n`
            )
      );
    });
  }
};

export const performTaskAction = (action: string, taskIndex: number) => {
  displayTasks();
  rl.question(
    `${kleur.yellow(`Enter the index of the task to ${action}:  `)}`,
    (index: string) => {
      const parsedIndex = parseInt(index) - 1;
      if (parsedIndex >= 0 && parsedIndex < todoList.length) {
        rl.question(
          `\n\n${kleur.bold().underline("Select an option")}\n\n${kleur.cyan(
            `1.${action}\n2.Cancel`
          )}\n`,
          (answer: string) => {
            if (answer === "1") {
              if (action === "delete") {
                todoList.splice(parsedIndex, 1);
              } else if (action === "complete") {
                todoList[parsedIndex].completed = true;
              }
              saveTasks();
              console.log("\x1Bc");
              console.log(`Task ${action}d.`);
              rl.close();
            } else {
              console.log("\x1Bc");
              startApp();
            }
          }
        );
      } else {
        console.log("Invalid task index.");
        startApp();
      }
    }
  );
};

export const performFilterAction = (action: string) => {
  displayTasks();
  if (todoList.length > 0) {
    todoList.filter((task) => {
      if (action === "completed" && task.completed === true) {
        console.log("\x1Bc");
        console.log(
          `${action.charAt(0).toUpperCase() + action.slice(1)} task:\n`,
          task
        );
        startApp();
      } else {
        console.log("\x1Bc");
        console.log(
          `${action.charAt(0).toUpperCase() + action.slice(1)} task:\n`,
          task
        );
        startApp();
      }
    });
  } else {
    startApp();
  }
};

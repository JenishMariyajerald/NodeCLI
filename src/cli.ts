import * as fs from "fs";
import { TodoTask, todoList } from "./utils/types";
import {
  displayMenu,
  saveTasks,
  rl,
  performTaskAction,
  displayTasks,
  performFilterAction,
} from "./utils/constant";
import kleur from "kleur";




const loadTasks = () => {
  try {
    const data = fs.readFileSync("tasks.json", "utf-8");
    return JSON.parse(data) as TodoTask[];
  } catch (error) {
    return [];
  }
};

const addTask = async () => {
  console.log("\x1Bc");
  await rl.question(
    kleur.yellow("Enter task date (YYYY-MM-DD): "),
    async (date: string) => {
      await rl.question(
        kleur.yellow("Enter task name: "),
        async (task: string) => {
          await rl.question(
            `\n\n${kleur.green("1.Add")}\n${kleur.red("2.Cancel")}\n\n`,
            async (answer: string) => {
              if (answer === "1") {
                todoList.push({ date, task, completed: false });
                saveTasks();
                console.log("\x1Bc");
                console.log("Task added.");
                await rl.close();
              } else {
                console.log("\x1Bc");
                2;
                console.log("Task Canceled.");
                startApp();
              }
            }
          );
        }
      );
    }
  );
};

const completeTask = () => {
  displayTasks();
  performTaskAction("completed", 0);
};
const filterTask = async () => {
  console.log("\x1Bc");
  await rl.question(
    `\n\n${kleur
      .bold()
      .underline("Select an option to filter:")}\n\n${kleur.cyan(
      "1.Sort by completed\n2.Sort by incomplete"
    )}\n\n`,
    (answer: string) => {
      if (answer === "1") {
        performFilterAction("completed");
      }
      if (answer === "2") {
        performFilterAction("incomplete");
      }
    }
  );
};

const deleteTask = () => {
  displayTasks();
  performTaskAction("delete", 0);
};
// console.log("\x1Bc");
console.log(
  kleur.italic().bold().blue("\nWelcome to the TODO List CLI App!\n")
);

export const startApp = async () => {
  await displayMenu();
  await rl.question("Enter your choice: ", (answer: string) => {
    if (answer === "1") {
      displayTasks();
      startApp();
    } else if (answer === "2") {
      addTask();
    } else if (answer === "3") {
      completeTask();
    } else if (answer === "4") {
      filterTask();
    } else if (answer === "5") {
      deleteTask();
    } else {
      console.log("Invalid choice.");
      startApp();
    }
  });
};
const loadedTasks = loadTasks();
todoList.push(...loadedTasks);
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApp = void 0;
const fs = __importStar(require("fs"));
const types_1 = require("./utils/types");
const constant_1 = require("./utils/constant");
const kleur_1 = __importDefault(require("kleur"));
const loadTasks = () => {
    try {
        const data = fs.readFileSync("tasks.json", "utf-8");
        return JSON.parse(data);
    }
    catch (error) {
        return [];
    }
};
const addTask = async () => {
    console.log("\x1Bc");
    await constant_1.rl.question(kleur_1.default.yellow("Enter task date (YYYY-MM-DD): "), async (date) => {
        await constant_1.rl.question(kleur_1.default.yellow("Enter task name: "), async (task) => {
            await constant_1.rl.question(`\n\n${kleur_1.default.green("1.Add")}\n${kleur_1.default.red("2.Cancel")}\n\n`, async (answer) => {
                if (answer === "1") {
                    types_1.todoList.push({ date, task, completed: false });
                    (0, constant_1.saveTasks)();
                    console.log("\x1Bc");
                    console.log("Task added.");
                    await constant_1.rl.close();
                }
                else {
                    console.log("\x1Bc");
                    2;
                    console.log("Task Canceled.");
                    (0, exports.startApp)();
                }
            });
        });
    });
};
const completeTask = () => {
    (0, constant_1.displayTasks)();
    (0, constant_1.performTaskAction)("completed", 0);
};
const filterTask = async () => {
    console.log("\x1Bc");
    await constant_1.rl.question(`\n\n${kleur_1.default
        .bold()
        .underline("Select an option to filter:")}\n\n${kleur_1.default.cyan("1.Sort by completed\n2.Sort by incomplete")}\n\n`, (answer) => {
        if (answer === "1") {
            (0, constant_1.performFilterAction)("completed");
        }
        if (answer === "2") {
            (0, constant_1.performFilterAction)("incomplete");
        }
    });
};
const deleteTask = () => {
    (0, constant_1.displayTasks)();
    (0, constant_1.performTaskAction)("delete", 0);
};
// console.log("\x1Bc");
console.log(kleur_1.default.italic().bold().blue("\nWelcome to the TODO List CLI App!\n"));
const startApp = async () => {
    await (0, constant_1.displayMenu)();
    await constant_1.rl.question("Enter your choice: ", (answer) => {
        if (answer === "1") {
            (0, constant_1.displayTasks)();
            (0, exports.startApp)();
        }
        else if (answer === "2") {
            addTask();
        }
        else if (answer === "3") {
            completeTask();
        }
        else if (answer === "4") {
            filterTask();
        }
        else if (answer === "5") {
            deleteTask();
        }
        else {
            console.log("Invalid choice.");
            (0, exports.startApp)();
        }
    });
};
exports.startApp = startApp;
const loadedTasks = loadTasks();
types_1.todoList.push(...loadedTasks);
(0, exports.startApp)();

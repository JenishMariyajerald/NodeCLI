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
exports.performFilterAction = exports.performTaskAction = exports.displayTasks = exports.saveTasks = exports.displayMenu = exports.rl = void 0;
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const types_1 = require("./types");
const index_1 = require("../index");
const kleur_1 = __importDefault(require("kleur"));
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
const displayMenu = () => {
    console.log(kleur_1.default.bold().underline("\nChoose an action:\n"));
    console.log(kleur_1.default.cyan("1. Display Tasks"));
    console.log(kleur_1.default.cyan("2. Add Task"));
    console.log(kleur_1.default.cyan("3. Mark Task as Completed"));
    console.log(kleur_1.default.cyan("4. filter Task"));
    console.log(kleur_1.default.cyan("5. Delete Task\n"));
};
exports.displayMenu = displayMenu;
const saveTasks = () => {
    fs.writeFileSync("tasks.json", JSON.stringify(types_1.todoList, null, 2));
};
exports.saveTasks = saveTasks;
const displayTasks = () => {
    console.log("\x1Bc");
    if (types_1.todoList.length === 0) {
        console.log("No Tasks are found in todo list");
    }
    else {
        console.log(kleur_1.default.inverse("TODO List:\n"));
        types_1.todoList.forEach((task, index) => {
            console.log(task.completed
                ? kleur_1.default.green(`${index + 1}. Task: ${task.task}, Date: ${task.date}, ${task.completed ? "Status: completed" : "Status: Incomplete"}\n`)
                : kleur_1.default.red(`${index + 1}. Task: ${task.task}, Date: ${task.date}, ${task.completed ? "Status: completed" : "Status: Incomplete"}\n`));
        });
    }
};
exports.displayTasks = displayTasks;
const performTaskAction = (action, taskIndex) => {
    (0, exports.displayTasks)();
    exports.rl.question(`${kleur_1.default.yellow(`Enter the index of the task to ${action}:  `)}`, (index) => {
        const parsedIndex = parseInt(index) - 1;
        if (parsedIndex >= 0 && parsedIndex < types_1.todoList.length) {
            exports.rl.question(`\n\n${kleur_1.default.bold().underline("Select an option")}\n\n${kleur_1.default.cyan(`1.${action}\n2.Cancel`)}\n`, (answer) => {
                if (answer === "1") {
                    if (action === "delete") {
                        types_1.todoList.splice(parsedIndex, 1);
                    }
                    else if (action === "complete") {
                        types_1.todoList[parsedIndex].completed = true;
                    }
                    (0, exports.saveTasks)();
                    console.log("\x1Bc");
                    console.log(`Task ${action}d.`);
                    exports.rl.close();
                }
                else {
                    console.log("\x1Bc");
                    (0, index_1.startApp)();
                }
            });
        }
        else {
            console.log("Invalid task index.");
            (0, index_1.startApp)();
        }
    });
};
exports.performTaskAction = performTaskAction;
const performFilterAction = (action) => {
    (0, exports.displayTasks)();
    if (types_1.todoList.length > 0) {
        types_1.todoList.filter((task) => {
            if (action === "completed" && task.completed === true) {
                console.log("\x1Bc");
                console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} task:\n`, task);
                (0, index_1.startApp)();
            }
            else {
                console.log("\x1Bc");
                console.log(`${action.charAt(0).toUpperCase() + action.slice(1)} task:\n`, task);
                (0, index_1.startApp)();
            }
        });
    }
    else {
        (0, index_1.startApp)();
    }
};
exports.performFilterAction = performFilterAction;

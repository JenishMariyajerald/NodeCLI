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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToDoApp = void 0;
var readlineSync = __importStar(require("readline-sync"));
var ToDoApp = /** @class */ (function () {
    function ToDoApp() {
        this.todos = [];
        this.currentId = 1;
    }
    ToDoApp.prototype.start = function () {
        while (true) {
            this.showMenu();
            var choice = readlineSync.question('Select an option: ');
            switch (choice) {
                case '1':
                    this.addTodo();
                    break;
                case '2':
                    this.listTodos();
                    break;
                case '3':
                    this.markTodoAsDone();
                    break;
                case '4':
                    this.quit();
                    break;
                default:
                    console.log('Invalid choice. Please try again.');
            }
        }
    };
    ToDoApp.prototype.showMenu = function () {
        console.log('\nTODO App Menu:');
        console.log('1. Add Todo');
        console.log('2. List Todos');
        console.log('3. Mark Todo as Done');
        console.log('4. Quit');
    };
    ToDoApp.prototype.showInputBox = function (label) {
        var topBorder = "\u250C".concat('─'.repeat(label.length + 2), "\u2510");
        // Display the label
        console.log("\n".concat(label));
        // Display the top border
        console.log(topBorder);
        // Create the input box
        var inputBox = "\u2502 ".concat(' '.repeat(label.length), " \u2502");
        // Display the input box
        console.log(inputBox);
        // Create the bottom border
        var bottomBorder = "\u2514".concat('─'.repeat(label.length + 2), "\u2518");
        // Display the bottom border
        console.log(bottomBorder);
        // Read user input
        var userInput = readlineSync.question('│ ');
        // Clear the console and display the input inside the box
        console.clear();
        console.log(topBorder);
        console.log(inputBox);
        console.log("\u2502 ".concat(userInput, " \u2502"));
        console.log(bottomBorder);
        return userInput;
    };
    ToDoApp.prototype.addTodo = function () {
        var task = this.showInputBox('Enter a new task:');
        var date = this.showInputBox('Enter a new date:');
        this.todos.push({ id: this.currentId, task: task, date: date, done: false });
        this.currentId++;
        console.log('Task added.');
    };
    ToDoApp.prototype.listTodos = function () {
        console.log('\nTODO List:');
        this.todos.forEach(function (todo) {
            console.log("".concat(todo.id, ". [").concat(todo.done ? 'x' : ' ', "] ").concat(todo.task, " ").concat(todo.date));
        });
    };
    ToDoApp.prototype.markTodoAsDone = function () {
        var id = parseInt(readlineSync.question('Enter the ID of the task to mark as done: '));
        var todo = this.todos.find(function (todo) { return todo.id === id; });
        if (todo) {
            todo.done = true;
            console.log('Task marked as done.');
        }
        else {
            console.log('Task not found.');
        }
    };
    ToDoApp.prototype.quit = function () {
        console.log('Goodbye!');
        process.exit(0);
    };
    return ToDoApp;
}());
exports.ToDoApp = ToDoApp;

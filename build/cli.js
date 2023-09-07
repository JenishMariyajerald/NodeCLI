"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// // src/cli.ts
const commander_1 = require("commander");
commander_1.program
    .version('0.0.1');
commander_1.program.parse(process.argv);
//   .option('-g, --greet <name>', 'Greet the user by name')
//   .option('-f, --file <file>', 'Specify a file to process')
//   .option('-t.d, --description', 'Show the application description')
//   .description('A simple TypeScript Node.js CLI application')
// program.parse(process.argv);
// if (program.description) {
//   console.log(program.description());
// }
// program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     console.log('clone command called');
//   });
commander_1.program
    .command('clone <source> [destination]')
    .description('clone a repository into a newly created directory')
    .action((source, destination) => {
    console.log('clone command called');
});
// Command implemented using stand-alone executable file, indicated by adding description as second parameter to `.command`.
// Returns `this` for adding more commands.
commander_1.program
    .command('start <service>', 'start named service')
    .command('stop [service]', 'stop named service, or all if no name supplied');
// Command prepared separately.
// Returns `this` for adding more commands.

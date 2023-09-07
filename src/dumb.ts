// // src/cli.ts
import commander from 'commander';

const program = new commander.Command();

program.version('1.0.0')
.description('This is an interactive TODO list command Line Node JS application')

program
  .command('say <message>')
  .description('Say something interesting')
  .alias('s')
  .action(function (message) {
    console.log(message);
  });

// program
//   .option('-d, --do <task>', 'Do something with a task argument')
//   .action(function (task:any) {
//     console.log("doing",task);
//   });

program.parse(process.argv);



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
// program
//   .command('clone <source> [destination]')
//   .description('clone a repository into a newly created directory')
//   .action((source, destination) => {
//     console.log('clone command called');
//   });

// Command implemented using stand-alone executable file, indicated by adding description as second parameter to `.command`.
// Returns `this` for adding more commands.
// program
//   .command('start <service>', 'start named service')
//   .command('stop [service]', 'stop named service, or all if no name supplied');

// Command prepared separately.
// Returns `this` for adding more commands.

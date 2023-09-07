
import commander from 'commander';
import { startApp } from './cli';
const program = new commander.Command();

program.version('1.0.0')
.description('This is an interactive TODO list command Line Node JS application')

program
  .command('app')
  .description('Start the application')
  .alias('run')
  .action(function() {
    startApp();

  });


program.parse(process.argv);




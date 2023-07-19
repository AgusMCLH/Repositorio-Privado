import { Command } from 'commander';

const program = new Command();

program
  .version('0.0.1')
  .option('-p, --port <port>', 'Puerto para el servidor', 8080);

program.parse(process.argv);
console.log(program.opts());

export default program;

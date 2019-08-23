const app = require("./src/app.js");
const chalk = require("chalk");

app.listen(9000, () => {
  console.log(chalk.green("listen to port 9000"));
});

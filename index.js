const { program } = require("commander");
const fs = require("fs");
const FILE_PATH = "./expenses.json";
const path = "./expenses.json"; // Path to your expenses file
const Table = require("cli-table");
const chalk = require("chalk");
function updateExpense(id, newDescription, newAmount) {
  const expenses = JSON.parse(fs.readFileSync(path, "utf8"));

  // Find the expense with the matching ID
  const expenseIndex = expenses.findIndex((exp) => exp.id === parseInt(id));
  if (expenseIndex === -1) {
    console.log("Expense not found");
    return;
  }

  // Update the fields if new values are provided
  if (newDescription) {
    expenses[expenseIndex].description = newDescription;
  }
  if (newAmount) {
    expenses[expenseIndex].amount = parseFloat(newAmount);
  }

  // Save the updated expenses list back to the file
  fs.writeFileSync(path, JSON.stringify(expenses, null, 2));
  console.log(`Expense (ID: ${id}) updated successfully.`);
}
//Function for summarizing all expenses
function summarizeExpenses() {
  const expenses = readExpenses();
  const total = expenses.reduce((acc, exp) => acc + exp.amount, 0);
  console.log(`Total expenses: $${total}`);
}
//function to summarize expenses based on month given
function summarizeExpensesByMonth(month) {
  const expenses = readExpenses();
  const filteredExpenses = expenses.filter((exp) => {
    const expenseDate = new Date(exp.date);
    return expenseDate.getMonth() + 1 === parseInt(month);
  });
  const total = filteredExpenses.reduce((acc, exp) => acc + exp.amount, 0);
  console.log(`Total expenses for month ${month}: $${total}`);
}
/**
 * Reads the expense file and returns the contents as an array of objects.
 * @returns {Array<Object>} The array of expense objects.
 */
const readExpenses = () => {
  // If the file does not exist, return an empty array.
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }

  // Read the file and convert the string to a JSON object.
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};
// Function to write to the expense file
const writeExpenses = (expenses) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2));
};
// Set the version of the app
program.version("1.0.0");
// Define the basic structure for the "add" command
program
  .command("add")
  .description("Add a new expense")
  .option("--description <desc>", "Expense description")
  .option("--amount <amount>", "Expense amount")
  .action((options) => {
    const expenses = readExpenses();
    const newExpense = {
      id: expenses.length + 1,
      description: options.description,
      amount: parseFloat(options.amount),
      date: new Date().toISOString().split("T")[0],
    };
    expenses.push(newExpense);
    writeExpenses(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
  });
//Delete command
program
  .command("delete")
  .description("Delete an expense")
  .option("--id <ID>", "ID description")
  .action((options) => {
    let expenses = readExpenses();
    expenses = expenses.filter((exp) => exp.id !== parseInt(options.id));
    writeExpenses(expenses);
    console.log(`Expense with id: ${options.id} deleted successfully`);
  });
//Update command
program
  .command("update")
  .option("--id <id>", "ID of the expense to update")
  .option("--description <desc>", "New description for the expense")
  .option("--amount <amount>", "New amount for the expense")
  .action((options) => {
    const { id, description, amount } = options;
    updateExpense(id, description, amount);
  });

// List commands
program
  .command("list")
  .description("Shows the list of expenses")
  .action(() => {
    const expenses = readExpenses();
    const table = new Table({
      head: [
        chalk.cyan("ID"),
        chalk.cyan("Date"),
        chalk.cyan("Description"),
        chalk.cyan("Amount"),
      ],
      colWidths: [5, 20, 30, 10],
    });

    expenses.forEach((exp) => {
      table.push([
        chalk.yellow(exp.id.toString().padStart(5, "")),
        chalk.green(exp.date),
        chalk.blue(exp.description),
        chalk.red(`$${exp.amount.toFixed(2)}`),
      ]);
    });

    console.log(table.toString());
  });
//Summarizing command
program
  .command("summarize")
  .description("Summarizes all expenses")
  .action(() => {
    summarizeExpenses();
  });
//command for summary of expenses of particular month given
program
  .command("summarize-month")
  .description("Summarizes expenses for a specific month")
  .option("--month <month>", "Month (1-12)")
  .action((options) => {
    summarizeExpensesByMonth(options.month);
  });

// Handle unknown commands
program.on("command:*", () => {
  console.error(`Invalid command: ${program.args.join(" ")}`);
  program.help();
});

// Parse the input arguments
program.parse(process.argv);

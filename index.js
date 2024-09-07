const { program } = require("commander");
const fs = require("fs");
const FILE_PATH = "./expenses.json";
const path = "./expenses.json"; // Path to your expenses file

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

//Function to read expense file
const readExpenses = () => {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
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
    console.log("ID  Date       Description  Amount");
    expenses.forEach((exp) => {
      console.log(
        `${exp.id}  ${exp.date}   ${exp.description}         ${exp.amount}`
      );
    });
  });
// Parse the input arguments
program.parse(process.argv);

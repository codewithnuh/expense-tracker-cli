Here’s a README tailored for your **Expense Tracker CLI App**:

---

<div align="center">
  <br />
      <img src="https://img.shields.io/badge/Node.js-76D04B?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
      <img src="https://img.shields.io/badge/CLI-blue?style=for-the-badge&logo=terminal&logoColor=white" alt="CLI" />
      <img src="https://img.shields.io/badge/Commander.js-red?style=for-the-badge&logo=npm&logoColor=white" alt="Commander.js" />
  <br />
  <h3 align="center">Expense Tracker CLI App</h3>
</div>

## 📋 Table of Contents

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## 🤖 Introduction

The **Expense Tracker CLI App** is a command-line tool that allows users to manage their personal expenses. You can easily add, update, delete, and list expenses directly from your terminal, as well as summarize expenses by month or in total. This simple, yet powerful, CLI application is built using Node.js and the Commander.js library, with data stored in a JSON file.

## ⚙️ Tech Stack

- **Node.js**: Back-end runtime environment
- **Commander.js**: Command-line interfaces made easy
- **CLI-Table**: Beautiful table rendering in terminal
- **Chalk**: Colorful terminal output
- **FS (File System)**: For reading and writing the expenses JSON file

## 🔋 Features

👉 **Add Expenses**  
Easily add a new expense by providing a description and amount.

👉 **List Expenses**  
View all expenses in a structured table format with ID, Date, Description, and Amount fields.

👉 **Update Expenses**  
Modify an existing expense by specifying its ID and providing new values for description or amount.

👉 **Delete Expenses**  
Remove an expense by its ID, keeping your expense records clean and up to date.

👉 **Summarize Total Expenses**  
View the total sum of all recorded expenses.

👉 **Summarize Expenses by Month**  
Filter expenses by a specific month and view the total.

## 🤸 Quick Start

Follow these steps to set up the project locally on your machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/codewithnuh/expense-tracker-cli
   ```
   
2. Navigate into the project directory:
   ```bash
   cd expense-tracker-cli
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

### Usage

To use the Expense Tracker CLI, run the following commands:

- **Add an expense**:
  ```bash
  node index.js add --description "Lunch" --amount 12.50
  ```

- **List all expenses**:
  ```bash
  node index.js list
  ```

- **Update an expense**:
  ```bash
  node index.js update --id 1 --description "Dinner" --amount 15.75
  ```

- **Delete an expense**:
  ```bash
  node index.js delete --id 1
  ```

- **Summarize all expenses**:
  ```bash
  node index.js summarize
  ```

- **Summarize expenses for a specific month**:
  ```bash
  node index.js summarize-month --month 9
  ```

Enjoy tracking your expenses with the **Expense Tracker CLI App**!
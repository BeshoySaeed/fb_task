## Issue Tracker Frontend Task

This task is designed to assess your Angular skills and ability to build maintainable front-end components.

**Project Setup**

1. **Clone/Download:** Clone or download the starter project code.
2. **Install Dependencies:** Navigate to the project directory in your terminal and run `npm install`.

**Running the Application**

1. **Start the Mock API Server:** In a separate terminal window, run `npm run server` (This assumes you have JSON Server set up).
2. **Start Angular Development Server:** In the original terminal, run `npm start`. The application should open in your browser (typically at http://localhost:4200)

**Task Requirements**

**Core Features**

- **Fetch and Display Issues:** The `IssueListComponent` should fetch data from the mock API and display a list of issues.
- **Update Issue Status:** Implement the ability to update the status of an issue (e.g., with a dropdown), and send the update request to the mock API.

**Additional Features**

- **Implement Filters:** Add filter controls to allow filtering the issue list by status, assignee, or other relevant criteria.
- **Add New Issue:** Create a mechanism (form or similar) for users to add new issues. Submitted issues should be sent to the mock API.
- **Field Visibility:** Provide a means for the user to select which fields of an issue are displayed in the list (title, assignee, priority, etc.)

**Evaluation Considerations**

- **Code Structure and Maintainability**
- **Effective Use of Angular Concepts (State Management, etc.)**
- **Error Handling and API Interactions**
- **Attention to UI/UX details**
- **Completeness of Features and Functionality**

**Resources**

- **Mock API Documentation (JSON Server):** [https://www.npmjs.com/package/json-server](https://www.npmjs.com/package/json-server)

**Notes**

- Feel free to use a state management library (NgRx or other) if you deem it appropriate.
- Focus on the core features first. Additional features are excellent ways to demonstrate your skills further.

**Please include brief comments within your code to explain your design choices and reasoning**

Let me know if you'd like any of these sections expanded or have more specific requirements you want to add!

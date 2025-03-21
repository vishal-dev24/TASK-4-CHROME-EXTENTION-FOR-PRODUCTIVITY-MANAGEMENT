# Task-4 CHROME EXTENSION FOR PRODUCTIVITY MANAGEMENT

**COMPANY** : CODTECH IT SOLUTIONS

**NAME**: VISHAL MALVIYA

**INTERN ID**: CT04WY75

**DOMAIN** : MERN STACK DEVELOPER

**DURATION** : 4 WEEKS

**MENTOR** : NEELA SANTOSH

---

## Productivity Tracker Chrome Extension

### Overview

This project is a Chrome Extension for Productivity Management, designed to help users track their time spent on different websites, block distracting sites, and generate productivity reports.

The extension leverages React (Vite) for the frontend and a Chrome extension API for tracking and site blocking functionalities.

Backend functionalities, such as storing user preferences, generating reports, and syncing data across devices, are planned to be implemented using the MERN (MongoDB, Express.js, React.js, Node.js) stack.

---

## Features

- **Time Tracking**: Monitors the time spent on different websites.

- **Blocking Distracting Sites**: Users can block specific websites to avoid distractions.

- **Daily Reports**: Generates a report of the websites visited and time spent.

- **Real-Time Monitoring**: Uses content scripts and background scripts to track activity in real time.

- **Sync Data Across Devices (Planned)**: Store productivity reports and settings using a backend database.

---

## Technologies Used

- **Frontend**: React (Vite) + JavaScript

- **Backend (Planned)**: Node.js, Express.js, MongoDB

- **Chrome Extension APIs**: Tabs, Storage, Messaging

- **Editor & Development Environment**: Visual Studio Code (VS Code)

- **Package Manager**: npm

---

## Project Structure

```
productivity-chrome-extension/
│── dist/                 # Build output directory
│── node_modules/         # Node.js dependencies
│── public/               # Chrome Extension files
│   ├── background.js     # Background script for time tracking
│   ├── content.js        # Content script for site blocking
│   ├── manifest.json     # Chrome Extension manifest file
│   ├── index.html        # Extension main page
│   ├── robots.txt        # Robots file
│   ├── icons/            # Extension icons
│   │   ├── logo.png
│── src/                  # Frontend UI with React
│   ├── App.jsx           # Main React component
│   ├── index.jsx         # React entry point
│   ├── main.jsx          # Main file for rendering React
│   ├── App.css           # Styles for the UI
│   ├── index.css         # Global styles
│   ├── logo.svg          # Logo for the UI
│   ├── reportWebVitals.js # Performance measuring
│   ├── setupTests.js     # Testing setup
│── .gitignore            # Git ignore file
│── README.md             # Project documentation
│── package.json          # Dependencies and scripts
│── package-lock.json     # Lock file for npm dependencies
│── eslint.config.js      # ESLint configuration
│── vite.config.js        # Vite configuration for React
```

---

## Installation & Usage

### 1. Install Dependencies

Navigate to the react/ directory and install dependencies:

```sh
cd react
npm install
```

### 2. Build the React App

```sh
npm run build
```

This will generate a `dist/` folder with the compiled files.

### 3. Load the Extension in Chrome

- Open Chrome and navigate to `chrome://extensions/`.

- Enable "Developer mode" (toggle in the top-right corner).

- Click "Load unpacked" and select the `extension/` folder.

- The extension should now be loaded and visible in the Chrome toolbar.

---

## How It Works

### Time Tracking

- The `background.js` script listens for tab activation and records time spent on different websites.

- Data is stored in Chrome's local storage for persistence.

- The React UI (`App.jsx`) fetches and displays the time spent per website.

### Blocking Distracting Sites

- Users can add websites to a blocklist.

- If a blocked site is visited, the `content.js` script redirects the user to a warning page.

### Generating Reports

- Clicking the "Generate Report" button in the UI downloads the report instead of just logging statistics.

- Future enhancements include downloading reports as CSV files and syncing with a backend.

---

## Future Enhancements

- **User Authentication**: Sync productivity data using MongoDB and Express.js.

- **Dashboard UI**: Provide advanced analytics with charts.

- **Customizable Settings**: Allow users to set time limits per site.

- **Notifications**: Alert users when they exceed allowed time on distracting websites.

---

## Contribution Guidelines

Feel free to fork the project and submit pull requests!

Ensure you follow best coding practices and provide meaningful commit messages.

---

## License

This project is licensed under the **MIT License**.

---

## Contact

**GitHub**: [https://github.com/vishal-dev24](https://github.com/vishal-dev24)

**LinkedIn**: [https://www.linkedin.com/in/vishalmalviya3846/](https://www.linkedin.com/in/vishalmalviya3846/)

# Candidate Search Application

[![Vite](https://img.shields.io/badge/Vite-4.x-blue.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v17-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.1-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A React & TypeScript web application that empowers recruiters to browse potential candidates from GitHub by reviewing candidate profiles, saving, or rejecting them for future reference.

## Table of Contents

- [Candidate Search Application](#candidate-search-application)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Key Features](#key-features)
  - [Screenshots](#screenshots)
    - [Home Page](#home-page)
    - [Potential Candidates Page](#potential-candidates-page)
  - [Video Demo](#video-demo)
  - [License](#license)
  - [Contributing](#contributing)
  - [Tests](#tests)
  - [Questions](#questions)

## Description

 The Candidate Search Application leverages the GitHub API to fetch candidate details such as profile image, location, email, company, and bio. With this application, recruiters can efficiently browse, compare, and manage candidate profiles. Saved profiles persist in the browser’s local storage, ensuring that selections remain available even after page refreshes.

## Installation

1. **Clone the repository:**

```bash
git clone https://github.com/snabaj/candidate-search-application.git
cd candidate-search-application
```
2. Install Vite and dependencies:
```
npm create vite@latest
npm install
```

## Usage

Start the application with the following command:
```
npm run dev
```
### Key Features

- Dynamic Candidate Loading: A new candidate loads on each page refresh or when a candidate is saved or skipped.
- Profile Management: Review GitHub profiles, save preferred candidates, and reject others.
- Persistent Storage: Saved profiles are stored in your browser's local storage for easy access later.
- Potential Candidates Section: View a structured table of previously saved profiles and manage your selections by deleting entries as needed.

## Screenshots

### Home Page

![Home page](<src/assets/Screenshot 2025-02-15 at 6.38.48 PM.png>)

### Potential Candidates Page

![Potential Candidates page](<src/assets/Screenshot 2025-02-15 at 6.44.09 PM.png>)

## Video Demo

Watch the video demonstration showcasing the application's performance and features.
https://drive.google.com/file/d/1kiDNWL6drCGyRIGvGYJj1UQ3hrLHnhtz/view

## License

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license.

## Contributing

Contributions are welcome! If you wish to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```
   git commit -m "Add some feature"
   ```
4. Push your branch:
    ```
    git push origin feature/your-feature
    ```
5. Open a pull request with a detailed description of your changes.

## Tests

There are no specific tests currently included in this project, but you can add your own testing frameworks or unit tests as necessary.

## Questions

Please contact me with any questions you may have at [snabajja@gmail.com](mailto:snabajja@gmail.com) or visit my GitHub profile at [snabaj](https://github.com/snabaj).


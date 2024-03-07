[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<h1>MyDashboardX - personal dashboard</h1>

<h1>Overview</h1>
*MyDashboardX* is a personal dashboard application that provides users with a variety of data and features for them to stay informed and organized. Users can track local weather updates, access to news of various categories and make use of the task manager to create, edit, and delete tasks.


<h1>Usage</h1>
To get started with running the MyDashboardX locally, follow these steps:
1. Clone the repository to your local device from GitHub.
2. Navigate to *my-app* folder.
2. In your terminal, install the necessary dependencies using *npm install*.
3. Start the server using *npm start*.
4. Access the application in your web browser at http://localhost:3000.


<h1>Technologies used</h1>
- Frontend: React, JavaScript
- Backend: Node.js, 
- APIs: OpenWeather API, News API
- Others:
-- React-Bootstrap: front-end framework that provides pre-designed components that helped me with building the front-end interface with less time and these are also compartible with responsive design.
-- Lodash: this is a popular and well tested utility library. I mainly used this tool to perform array and object operations with minimal coding, especially when the equivalent JavaScript in-built functions are not available.
--dotenv: to save the API keys in a separate .env file instead of hardcoding in the script files for security and easier management.
-- LocalStorage: to store the tasks in the local browser.
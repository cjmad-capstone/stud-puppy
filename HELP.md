## Getting Started

### Prerequisites

* [Node.js v18.7.0](https://nodejs.org/en/)
    1. run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash` to install node version manager
    2. run `nvm install node` to install
    3. node
* [Yarn](https://yarnpkg.com/)
    1. run `npm install --global yarn`

### Running Frontend Dev Server

* cd into the frontend folder `cd frontend`
* run `yarn dev` to start the dev server
* open link in [terminal](https://localhost:5173)

### Workflow

* Controllers are purely for our api.
    * Instead of returning a path to a thymeleaf view, we are returning the actual data as a JSON response.
    * This allows us to make fetches with React to retrieve the data from our backend and use it however we want.
* Routing is through the frontend using React Router
    * Example in the [App.jsx](./frontend/src/App.jsx) file

### Deployment

* `mvn clean install` to build the project
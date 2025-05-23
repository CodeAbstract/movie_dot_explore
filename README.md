# Reel . Radar

## Tech Stack

- **Frontend Framework**: React.js
- **Styling**: CSS3 with custom animations and transitions
- **APIs**:
  - TMDB (The Movie Database) API for movie data
  - OMDB (Open Movie Database) API for additional movie details
- **State Management**: React Hooks (useState, useEffect)
- **Build Tools**: Node.js, npm
- **Version Control**: Git
- **Development Environment**: Node.js v22.1.0
- **Key Features**:
  - Responsive Design
  - Dark/Light Theme
  - Dynamic Movie Carousel
  - Real-time Search
  - Movie Details Modal
  - Smooth Animations
  - Cross-browser Compatibility

## Testing

The project includes comprehensive unit and integration tests using:
- Jest (Test Runner)
- React Testing Library (Component Testing)
- MSW (API Mocking)

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage report
npm test -- --coverage
```

### Test Structure
- `src/__tests__/` - Contains all test files
- `src/mocks/` - Contains API mocking setup
  - `handlers.js` - API endpoint mocks
  - `server.js` - MSW server setup

### Test Coverage
Tests cover:
- Component rendering
- User interactions
- API integration
- Theme switching
- Movie filtering
- Error handling
- Loading states

## Environment Setup

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Update the `.env` file with your API keys:
- Get a TMDB API key from [The Movie Database](https://www.themoviedb.org/documentation/api)
- Get an OMDB API key from [OMDb API](http://www.omdbapi.com/apikey.aspx)

3. Add your API keys to the `.env` file:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key_here
REACT_APP_OMDB_API_KEY=your_omdb_api_key_here
```

### Installing dependencies on Ubuntu
    sudo apt update
    sudo apt install npm
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    source ~/.bashrc
    nvm list-remote
    nvm install v22.1.0
    nvm use v22.1.0

### Installing dependencies on MacOS
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.39.3/install.sh | bash
    nvm list-remote
    nvm install v22.1.0
    nvm use v22.1.0


### Starting the react app
   npm start

# Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

<!--
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
-->

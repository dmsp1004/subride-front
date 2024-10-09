import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginScreen from './components/LoginScreen';
import MainScreen from './components/MainScreen';
import RecommendationList from './components/RecommendationList';
import SubscriptionDetail from './components/SubscriptionDetail';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/main" component={MainScreen} />
            <Route path="/recommendations" component={RecommendationList} />
            <Route path="/subscription/:id" component={SubscriptionDetail} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
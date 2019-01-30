import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import { Menu } from './components/Menu';

import PhilosophyPage from './pages/philosophy';
import HomePage from './pages/home';
import { ProfilePage } from './pages/profile';
import { GetStartedPage } from './pages/getStarted';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';

import posed, { PoseGroup } from 'react-pose';


const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
});

export default class App extends Component {
  render() {
    return (
      <Route render={({ location }) => (
        <div className="app">
          <header className="header">
            <PoseGroup>
              <RouteContainer key={location.pathname}>
                <Switch location={location}>
                  <Route exact strict path="/" component={HomePage}/>
                  <Route path="/getStarted" component={GetStartedPage}/>
                  <Route path="/profile" component={ProfilePage}/>
                  <Route path="/about" component={PhilosophyPage}/>
                  <Route path="/login" component={LogInPage}/>
                  <Route path="/signup" component={SignUpPage}/>
                </Switch>
              </RouteContainer>
            </PoseGroup>
            {/* <Menu/> */}
          </header>
        </div>
      )}/>
    );
  }
}

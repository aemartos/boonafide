import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import posed, { PoseGroup } from 'react-pose';

import { Menu } from './components/Menu';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { Profile } from './pages/profile';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';


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
            <Menu/>
            <PoseGroup>
              <RouteContainer key={location.pathname}>
                <Switch location={location}>
                  <Route exact strict path="/" component={HomePage}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/about" component={AboutPage}/>
                  <Route path="/login" component={LogInPage}/>
                  <Route path="/signup" component={SignUpPage}/>
                </Switch>
              </RouteContainer>
            </PoseGroup>
          </header>
        </div>
      )}/>
    );
  }
}

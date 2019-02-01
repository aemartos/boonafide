import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import { Container } from './components/Container';
import { WithUser, ConditionalUser } from './components/UserComponent';

import PhilosophyPage from './pages/philosophy';
import HomePage from './pages/home';
import { ProfilePage } from './pages/profile';
import { GetStartedPage } from './pages/getStarted';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';
import Page404 from './pages/page404';
// import posed, { PoseGroup } from 'react-pose';


// const RouteContainer = posed.div({
//   enter: { opacity: 1, delay: 300, beforeChildren: true },
//   exit: { opacity: 0 }
// });

export default class App extends Component {
  render() {
    return (
      <Route render={({ location }) => (
        <div className="app">
          <Container>
            {/* <PoseGroup> */}
              {/* <RouteContainer key={location.pathname}> */}
                <Switch location={location}>

                  <Route exact strict path="/" component={ConditionalUser(HomePage, GetStartedPage)}/>
                  <Route path="/profile" component={WithUser(ProfilePage)}/>
                  {/* <Route path="/notifications" component={WithUser(NotificationsPage)}/> */}
                  {/* <Route path="/search" component={WithUser(SearchPage)}/> */}
                  {/* <Route path="/newFavor" component={WithUser(newFavorPage)}/> */}
                  {/* <Route path="/messages" component={WithUser(MessagesPage)}/> */}
                  <Route path="/philosophy" component={WithUser(PhilosophyPage)}/>
                  <Route path="/login" component={ConditionalUser(()=> <Redirect to="/profile"/>, LogInPage)}/>
                  <Route path="/signup" component={ConditionalUser(()=> <Redirect to="/profile"/>, SignUpPage)}/>
                  <Route component={Page404}/>
                </Switch>
              {/* </RouteContainer> */}
            {/* </PoseGroup> */}
          </Container>
        </div>
      )}/>
    );
  }
}

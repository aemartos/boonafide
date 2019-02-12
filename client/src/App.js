import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { Redirect } from 'react-router-dom';

import { Container } from './components/Container';
import { WithUser, ConditionalUser } from './components/UserComponent';

import { GetStartedPage } from './pages/getStarted';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';
import { ProfilePage } from './pages/profile';
import FirstStepsPage from './pages/firstSteps';
import HomePage from './pages/home';
import PhilosophyPage from './pages/philosophy';
import NewFavorPage from './pages/newFavor';
import FavorPage from './pages/favor';
import TicketPage from './pages/ticket';
import MessagesPage from './pages/messages';
import NotificationsPage from './pages/notifications';
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
          <Container location={location}>
          {/* {console.log(location)} */}
            {/* <PoseGroup> */}
              {/* <RouteContainer key={location.pathname}> */}
                <Switch location={location}>
                  <Route exact strict path="/" component={ConditionalUser(HomePage, GetStartedPage)}/>
                  <Route path="/login" component={ConditionalUser(()=> <Redirect to="/profile"/>, LogInPage)}/>
                  <Route path="/signup" component={ConditionalUser(()=> <Redirect to="/profile"/>, SignUpPage)}/>
                  <Route path="/firstSteps" component={WithUser(FirstStepsPage)}/>
                  <Route path="/profile/:id" component={WithUser(ProfilePage)}/>
                  <Route path="/profile" component={WithUser(ProfilePage)}/>
                  <Route path="/philosophy" component={WithUser(PhilosophyPage)}/>
                  <Route path="/newFavor" component={WithUser(NewFavorPage)}/>
                  <Route path="/favor" component={WithUser(FavorPage)}/>
                  <Route path="/ticket" component={WithUser(TicketPage)}/>
                  <Route path="/messages" component={WithUser(MessagesPage)}/>
                  <Route path="/notifications" component={WithUser(NotificationsPage)}/>
                  <Route path="/not-found" component={Page404}/>
                  <Route component={()=> <Redirect to="/not-found"/>}/>
                </Switch>
              {/* </RouteContainer> */}
            {/* </PoseGroup> */}
          </Container>
        </div>
      )}/>
    );
  }
}

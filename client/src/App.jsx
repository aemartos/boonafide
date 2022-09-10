import React, { Component } from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Container } from './components/Container';
import { WithUser, ConditionalUser } from './components/UserComponent';
import { GetStartedPage } from './pages/getStarted';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';
import { ProfilePage } from './pages/profile';
import { TicketsPage } from './pages/tickets';
import { TicketDetailPage } from './pages/ticket';
import { Chat as MessagesDetailPage } from './pages/message';
import { MessagesPage } from './pages/messages';
import FirstStepsPage from './pages/firstSteps';
import HomePage from './pages/home';
import PhilosophyPage from './pages/philosophy';
import { NewFavorPage } from './pages/newFavor';
import { FavorDetailPage } from './pages/favor';
import { NotificationsPage } from './pages/notifications';
import Page404 from './pages/page404';
import { Sockets } from './components/Sockets';

const redirect = (route) => <Redirect to={route} />;

export default class App extends Component {
  render() {
    return (
      <Route render={({ location, history }) => (
        <div className="app">
          <Container location={location} history={history}>
            <Switch location={location}>
              <Route exact strict path="/" component={ConditionalUser(HomePage, GetStartedPage)} />
              <Route path="/login" component={ConditionalUser(redirect('/profile'), LogInPage)} />
              <Route path="/signup" component={ConditionalUser(redirect('/profile'), SignUpPage)} />
              <Route path="/firstSteps" component={WithUser(FirstStepsPage)} />
              <Route path="/profile/:id" component={WithUser(ProfilePage)} />
              <Route path="/profile" component={WithUser(ProfilePage)} />
              <Route path="/tickets/:id" component={WithUser(TicketDetailPage)} />
              <Route path="/tickets" component={WithUser(TicketsPage)} />
              <Route path="/philosophy" component={WithUser(PhilosophyPage)} />
              <Route path="/newFavor" component={WithUser(NewFavorPage)} />
              <Route path="/favors/:id" component={WithUser(FavorDetailPage)} />
              <Route path="/messages/:id" component={WithUser(MessagesDetailPage)} />
              <Route path="/messages" component={WithUser(MessagesPage)} />
              <Route path="/notifications" component={WithUser(NotificationsPage)} />
              <Route exact strict path="/not-found" component={Page404} />
              <Route component={redirect('/not-found')} />
            </Switch>
          </Container>
          <Sockets />
        </div>
      )}
      />
    );
  }
}

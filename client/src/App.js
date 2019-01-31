import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
// import { connect } from 'react-redux';

// import { Menu } from './components/Menu';
import { Container } from './components/Container';

import PhilosophyPage from './pages/philosophy';
import HomePage from './pages/home';
import { ProfilePage } from './pages/profile';
import { GetStartedPage } from './pages/getStarted';
import { LogInPage } from './pages/login';
import { SignUpPage } from './pages/signup';
import { withUser } from './components/withUser';
import { conditionalUser } from './components/conditionalUser';
// import posed, { PoseGroup } from 'react-pose';


// const RouteContainer = posed.div({
//   enter: { opacity: 1, delay: 300, beforeChildren: true },
//   exit: { opacity: 0 }
// });

class App extends Component {
  render() {
    return (
      <Route render={({ location }) => (
        <div className="app">
          <Container className={location.pathname}>
            {/* <PoseGroup> */}
              {/* <RouteContainer key={location.pathname}> */}
                <Switch location={location}>

                  <Route exact strict path="/" component={conditionalUser(HomePage,GetStartedPage)}/>
                  {/* <Route path="/getStarted" component={GetStartedPage}/> */}
                  <Route path="/profile" component={withUser(ProfilePage)}/>
                  <Route path="/philosophy" component={withUser(PhilosophyPage)}/>
                  <Route path="/login" component={LogInPage}/>
                  <Route path="/signup" component={SignUpPage}/>
                </Switch>
              {/* </RouteContainer> */}
            {/* </PoseGroup> */}
          </Container>
          {/* <Menu/> */}
        </div>
      )}/>
    );
  }
}

//export default connect(store => ({user: store.user}))(App);
export default App;

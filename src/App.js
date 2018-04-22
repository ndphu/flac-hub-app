import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom'
import navigationService from './service/NavigationService';
import AppRoutes from './AppRoutes';
import AppLayout from './layout/AppLayout';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
    }
  }

  componentDidMount = () => {
      let loadScreen = document.getElementById('load-screen');
      loadScreen.style.display = 'none';
      loadScreen.style.visibility = 'hidden';
      this.setState({
        ready: true,
    });
  };

  render() {
    return (
      <HashRouter>
        <Route path={'/'} render={(props) => {
          navigationService.setLocation(props.location);
          navigationService.setHistory(props.history);
          return <AppLayout children={<AppRoutes/>}/>
        }}/>
      </HashRouter>
    );
  }
}

export default App;

import React, {Component} from 'react';
import './App.css';
import SearchPage from "./page/SearchPage";
import navigationService from "./service/NavigationService";
import {HashRouter, Redirect, Route, Switch} from "react-router-dom";

class App extends Component {
    state = {};

    render() {
        return (
            <div className="App">
                <HashRouter>
                    <Route path={'/'} render={(props) => {
                        navigationService.setLocation(props.location);
                        navigationService.setHistory(props.history);
                        return (
                            <Switch>
                                <Route path={'/search'} component={SearchPage}/>
                                <Redirect exact={true} from={'/'} to={`/search`}/>
                            </Switch>
                        )
                    }}/>
                </HashRouter>

            </div>
        );
    }
}

export default App;

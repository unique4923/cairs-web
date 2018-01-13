import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from '../src/reducers';
import DODWarning from './screens/DODWarning';
import Menu from './screens/Menu';
import { muiTheme } from './theme/muiTheme';

import { HashRouter, Route, Switch } from 'react-router-dom';

injectTapEventPlugin();
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(ReduxThunk));

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <HashRouter basename="/">
        <div>
          <Switch>
              <Route exact path="/" component={DODWarning}></Route>
              <Route path="/MainMenu" component={Menu}></Route>
          </Switch>
        </div>
      </HashRouter> 
    </MuiThemeProvider>
  </Provider>
);

export default App;




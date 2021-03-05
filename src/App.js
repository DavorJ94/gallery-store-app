import "./App.css";
import HomePage from "./Home";
import Cart from "./Cart";
import Favorites from "./Favorites";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allImages from "./reducers/allImages";
// import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
// import logger from "redux-logger";
import { Route, Switch } from "react-router-dom";

function App() {
  // const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, logger));
  const store = createStore(allImages, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
        </Switch>
      </div>
    </Provider>
  );
}

export default App;

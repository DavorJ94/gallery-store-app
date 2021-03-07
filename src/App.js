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
      <>
        <Switch>
          <Route exact path="/gallery-store-app-react-redux">
            <HomePage />
          </Route>
          <Route path="/gallery-store-app-react-redux/cart">
            <Cart />
          </Route>
          <Route path="/gallery-store-app-react-redux/favorites">
            <Favorites />
          </Route>
        </Switch>
      </>
    </Provider>
  );
}

export default App;

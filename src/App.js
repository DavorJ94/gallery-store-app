import "./App.css";
import HomePage from "./Home";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allImages from "./reducers/allImages";
import thunk from "redux-thunk";
import logger from "redux-logger";

function App() {
  const store = createStore(allImages, applyMiddleware(thunk, logger));

  return (
    <Provider store={store}>
      <div>
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;

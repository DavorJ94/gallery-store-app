import "./App.css";
import HomePage from "./Home";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import allImages from "./reducers/allImages";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";

function App() {
  const composedEnhancer = composeWithDevTools(applyMiddleware(thunk, logger));
  const store = createStore(allImages, composedEnhancer);
  return (
    <Provider store={store}>
      <div>
        <HomePage />
      </div>
    </Provider>
  );
}

export default App;

import React, { useEffect } from "react";
import Header from "./src/containers/Header";
import Guesser from "./src/components/guesser/guesser";
import store from "./src/redux/store";
import { Provider } from "react-redux";
import Cwrapper from "./src/components/components-wrapper/componentsWrapper";
import Scores from "./src/components/scores/scores";
import BlackLayer from './src/components/black-layer/black-layer';

const App = () => (
  <Provider store={store}>
    <Cwrapper>
      <Header />
      <Scores />
      <Guesser />
    </Cwrapper>
  </Provider>
);

export default App;

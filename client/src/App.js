import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";

import Lander from "./components/Lander/Lander";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;

const App = () => {
  const location = useLocation();

  return (
    <>
      <Container>
        {/* initial={false} */}
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/" component={Lander} exact />
            <Route path="/auth" component={Auth} exact />
            <Route path="/" component={Home} />
          </Switch>
        </AnimatePresence>
      </Container>
    </>
  );
};

export default App;

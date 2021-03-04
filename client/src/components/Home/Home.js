import React from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../Navbar/Navbar";
import Search from "../Search/Search";
import RecipeList from "../RecipeList/RecipeList";
import Recipe from "../Recipe/Recipe";

const Home = () => {
  const location = useLocation();

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      {/* <AnimatePresence initial={false} exitBeforeEnter> */}
      <Switch location={location} key={location.pathname}>
        <Route path="/search" component={RecipeList} />
        <Route path="/recipe" component={Recipe} exact />
        <Route path="/home" component={Search} exact />
      </Switch>
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Home;

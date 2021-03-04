import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchIcon from "@material-ui/icons/Search";
import {
  IconButton,
  Divider,
  InputBase,
  Paper,
  Grid,
  List,
  Popover,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

import Card from "./Card";
import { getRecipes } from "../../actions/recipes";
import { setSearch } from "../../actions/search";
import SearchItem from "./SearchItem";

const SearchCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h1 {
    margin: 5vh 0 2vh 0;
  }

  #mask {
    position: absolute;
    z-index: 15;
    height: 60px;
    width: 100%;
    background: white;
  }
`;

const SearchBar = styled(Paper)`
  display: flex;
  width: 35vw;
`;

const RecommendedList = styled(motion(Grid))`
  display: flex;
`;

const Recommended = styled.div`
  margin: 10vh 0 0 0;
`;

const SearchList = styled(List)`
  width: 100%;
  max-width: 50vw;
  position: relative;
  overflow: auto;
  max-height: 35vh;
`;

const GridItem = styled(motion(Grid))``;

const Panel = styled(motion.div)`
  height: 100vh;
  width: 50vw;
  position: absolute;
  z-index: 15;
  background: #e7e7de;

  &.leftPanel {
    left: 0;
  }

  &.rightPanel {
    right: 0;
  }
`;

const fakeData = {
  results: [
    {
      vegetarian: true,
      vegan: true,
      glutenFree: true,
      dairyFree: true,
      veryHealthy: true,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 11,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 2,
      spoonacularScore: 92,
      healthScore: 90,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 168.12,
      id: 654959,
      title: "Pasta With Tuna",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "http://www.foodista.com/recipe/K6QWSKQM/pasta-with-tuna",
      image: "https://spoonacular.com/recipeImages/654959-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary: `Pasta With Tuna might be just the main course you are searching for. One serving contains <b>421 calories</b>, <b>24g of protein</b>, and <b>10g of fat</b>. For <b>$1.68 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. 1 person were impressed by this recipe. Head to the store and pick up flour, onion, peas, and a few other things to make it today. It is a good option if 
  you're following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is excellent. Try <a href="https://spoonacular.com/recipes/pasta-and-tuna-salad-ensalada-de-pasta-y-atn-226303">Pastan and Tuna Salad (Ensalada de Pasta y Atún)</a>, <a href="https://spoonacular.com/recipes/tuna-pasta-565100">Tuna Pasta</a>, and <a href="https://spoonacular.com/recipes/tuna-pasta-89136">Tuna Pasta</a> for similar recipes.`,
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-with-tuna-654959",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 24,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 66,
      healthScore: 28,
      creditsText: "Pick Fresh Foods",
      license: "CC BY 3.0",
      sourceName: "Pick Fresh Foods",
      pricePerServing: 274.82,
      id: 511728,
      title: "Pasta Margherita",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "http://pickfreshfoods.com/pasta-margherita/",
      image: "https://spoonacular.com/recipeImages/511728-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta Margherita might be just the main course you are searching for. One serving contains <b>809 calories</b>, <b>34g of protein</b>, and <b>34g of fat</b>. This recipe serves 4 and costs $2.75 per serving. 1 person has made this recipe and would make it again. If you have basil, linguine pasta, garlic clove, and a few other ingredients on hand, you can make it. To use up the olive oil you could follow this main course with the <a href="https://spoonacular.com/recipes/sauteed-banana-granola-and-yogurt-parfait-624619">Sauteed Banana, Granolan and Yogurt Parfait</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 69%</b>. This score is pretty good. Similar recipes include <a href="https://spoonacular.com/recipes/margherita-pizza-with-pesto-pasta-salad-31919">Margherita Pizza With Pesto Pasta Salad</a>, <a href="https://spoonacular.com/recipes/pasta-margherita-with-rhubarb-and-apple-compote-613006">Pasta margherita with rhubarb and apple compote</a>, and <a href="https://spoonacular.com/recipes/margherita-pizzette-516272">Margherita Pizzette</a>.',
      cuisines: [],
      dishTypes: [Array],
      diets: [],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-margherita-511728",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 12,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 68,
      healthScore: 28,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 616.45,
      id: 654812,
      title: "Pasta and Seafood",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl: "http://www.foodista.com/recipe/8YWWDKPS/pasta-and-seafood",
      image: "https://spoonacular.com/recipeImages/654812-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pastan and Seafood is a <b>dairy free and pescatarian</b> main course. One serving contains <b>521 calories</b>, <b>38g of protein</b>, and <b>4g of fat</b>. This recipe serves 2 and costs $5.79 per serving. From preparation to the plate, this recipe takes around <b>45 minutes</b>. This recipe from Foodista has 1 fans. If you have shrimp, squid ink linguine, parsley, and a few other ingredients on hand, you can make it. To use up the salt you could follow this main course with the <a href="https://spoonacular.com/recipes/apple-turnovers-recipe-48175">Apple Turnovers Recipe</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 57%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/seafood-pasta-373851">Seafood Pasta</a>, <a href="https://spoonacular.com/recipes/seafood-pasta-246928">Seafood Pasta</a>, and <a href="https://spoonacular.com/recipes/seafood-pasta-22624">Seafood Pasta</a> for similar recipes.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-and-seafood-654812",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 10,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 70,
      healthScore: 32,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 273.29,
      id: 654857,
      title: "Pasta On The Border",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://www.foodista.com/recipe/25DLQT8W/pasta-on-the-border",
      image: "https://spoonacular.com/recipeImages/654857-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pastan On The Border requires about <b>roughly 45 minutes</b> from start to finish. This dairy free recipe serves 4 and costs <b>$2.73 per serving</b>. This main course has <b>358 calories</b>, <b>21g of   protein</b>, and <b>9g of fat</b> per serving. Only a few people made this recipe, and 1 would say it hit the spot. Head to the store and pick up evoo, pico de gallo, bell pepper, and a few other things to make it today. It is brought to you by Foodista. With a spoonacular <b>score of 69%</b>, this dish is solid. <a href="https://spoonacular.com/recipes/south-of-the-border-chicken-pasta-skillet-281789">South-of-the-Border Chicken & Pasta Skillet</a>, <a href="https://spoonacular.com/recipes/border-guacamole-21289">Border Guacamole</a>, and <a href="https://spoonacular.com/recipes/border-guacamole-101868">Border Guacamole</a> are very similar to this recipe.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-on-the-border-654857",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 3,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 72,
      healthScore: 27,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 67.61,
      id: 654883,
      title: "Pasta Vegetable Soup",
      readyInMinutes: 45,
      servings: 10,
      sourceUrl: "http://www.foodista.com/recipe/FR8FKR4F/pasta-vegetable-soup",
      image: "https://spoonacular.com/recipeImages/654883-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta Vegetable Soup might be just the soup you are searching for. For <b>64 cents per serving</b>, this recipe <b>covers 14%</b> of your daily requirements of vitamins and minerals. One serving contains <b>167 calories</b>, <b>10g of protein</b>, and <b>3g of fat</b>. It is perfect for <b>Autumn</b>. Only a few people made this recipe, and 1 would say it hit the spot. A mixture of onion, water, thyme, and a handful of other ingredients are all it takes to make this recipe so flavorful. From preparation to the plate, this recipe takes around <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 78%</b>. This score is good. Try <a href="https://spoonacular.com/recipes/beef-and-pasta-vegetable-soup-411736">Beef and Pasta Vegetable Soup</a>, <a href="https://spoonacular.com/recipes/pantry-vegetable-and-pasta-soup-530939">Pantry Vegetable and Pasta Soup</a>, and <a href="https://spoonacular.com/recipes/easy-vegetable-soup-with-pasta-699450">Easy Vegetable Soup with Pasta</a> for similar recipes.',
      cuisines: [],
      dishTypes: [Array],
      diets: [],
      occasions: [Array],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-vegetable-soup-654883",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 28,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 72,
      healthScore: 30,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 245.44,
      id: 654928,
      title: "Pasta With Italian Sausage",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "http://www.foodista.com/recipe/G8JXNCD8/pasta-with-italian-sausage",
      image: "https://spoonacular.com/recipeImages/654928-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'The recipe Pasta With Italian Sausage could satisfy your Mediterranean craving in about <b>45 minutes</b>. This recipe serves 4 and costs $2.33 per serving. Watching your figure? This dairy free recipe has <b>832 calories</b>, <b>29g of protein</b>, and <b>44g of fat</b> per serving. This recipe is liked by 1 foodies and cooks. If you have parmesean cheese, basil, sausage, and a few other ingredients on hand, you can make it. To use up the onion you could follow this main course with the <a href="https://spoonacular.com/recipes/candy-corn-cupcakes-63881">Candy Corn Cupcakes</a> as a dessert. Not a lot of people really liked this main course. All things considered, we decided this recipe <b>deserves a spoonacular score of 74%</b>. This score is good. Try <a href="https://spoonacular.com/recipes/italian-sausage-and-pasta-557995">Italian Sausage and Pasta</a>, <a href="https://spoonacular.com/recipes/italian-sausage-pasta-pot-215729">Italian sausage & pasta pot</a>, and <a href="https://spoonacular.com/recipes/italian-sausage-pasta-272903">Italian Sausage Pasta</a> for similar recipes.',
      cuisines: [Array],
      dishTypes: [Array],
      diets: [],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-with-italian-sausage-654928",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 14,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 23,
      healthScore: 2,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 67.99,
      id: 654926,
      title: "Pasta With Gorgonzola Sauce",
      readyInMinutes: 45,
      servings: 8,
      sourceUrl:
        "http://www.foodista.com/recipe/SJLPWK55/pasta-with-gorgonzola-sauce",
      image: "https://spoonacular.com/recipeImages/654926-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta With Gorgonzola Sauce might be just the side dish you are searching for. This recipe makes 8 servings with <b>379 calories</b>, <b>11g of protein</b>, and <b>25g of fat</b> each. For <b>68 cents per serving</b>, this recipe <b>covers 8%</b> of your daily requirements of vitamins and minerals. Only a few people made this recipe, and 1 would say it hit the spot. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of cup whipping cream, pkt pasta, half and half, and a handful of other ingredients are all it takes to make this recipe so scrumptious. All things considered, we decided this recipe <b>deserves a spoonacular score of 25%</b>. This score is not so awesome. Try <a href="https://spoonacular.com/recipes/chocolate-pasta-with-gorgonzola-cream-sauce-and-10-romantic-pasta-dishes-532706">Chocolate Pasta with Gorgonzola Cream Sauce and 10 Romantic Pasta Dishes</a>, <a href="https://spoonacular.com/recipes/pasta-with-kale-and-gorgonzola-sauce-594400">Pasta with Kale and Gorgonzola Sauce</a>, and <a href="https://spoonacular.com/recipes/tagliatelle-pasta-with-asparagus-and-gorgonzola-sauce-162657">Tagliatelle Pasta with Asparagus and Gorgonzola Sauce</a> for similar recipes.',
      cuisines: [],
      dishTypes: [Array],
      diets: [],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-with-gorgonzola-sauce-654926",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 13,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 3,
      spoonacularScore: 67,
      healthScore: 21,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 160.13,
      id: 654944,
      title: "Pasta With Salmon Cream Sauce",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "http://www.foodista.com/recipe/WRF73JT3/pasta-with-salmon-cream-sauce",
      image: "https://spoonacular.com/recipeImages/654944-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta With Salmon Cream Sauce is a <b>pescatarian</b> main course. This recipe makes 4 servings with <b>439 calories</b>, <b>23g of protein</b>, and <b>15g of fat</b> each. For <b>$1.6 per serving</b>, this recipe <b>covers 23%</b> of your daily requirements of vitamins and minerals. 3 people have made this recipe and would make it again. If you have onion, parsley, milk, and a few other ingredients on hand, you can make it. To use up the milk you could follow this main course with the <a href="https://spoonacular.com/recipes/milky-way-brownie-bites-540544">Milky Way Brownie Bites</a> as a dessert. From preparation to the plate, this recipe takes roughly <b>45 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 69%</b>. This score is pretty good. Try <a href="https://spoonacular.com/recipes/spinach-pasta-with-salmon-and-cream-sauce-86877">Spinach Pasta with Salmon and Cream Sauce</a>, <a href="https://spoonacular.com/recipes/artisan-farfalle-pasta-with-smoked-salmon-and-cream-sauce-632778">Artisan Farfalle Pasta With Smoked Salmon and Cream Sauce</a>, and <a href="https://spoonacular.com/recipes/chocolate-pasta-with-gorgonzola-cream-sauce-and-10-romantic-pasta-dishes-532706">Chocolate Pasta with Gorgonzola Cream Sauce and 10 Romantic Pasta Dishes</a> for similar recipes.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-with-salmon-cream-sauce-654944",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: true,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 16,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 2,
      spoonacularScore: 94,
      healthScore: 100,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 142.74,
      id: 654905,
      title: "Pasta With Chickpeas and Kale",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "http://www.foodista.com/recipe/4BTWKPRC/pasta-with-chickpeas-and-kale",
      image: "https://spoonacular.com/recipeImages/654905-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary: `Pasta With Chickpeas and Kale might be just the main course you are searching for. One serving contains <b>655 calories</b>, <b>27g of protein</b>, and <b>9g of fat</b>. For <b>$1.43 per serving</b>, this recipe <b>covers 43%</b> of your daily requirements of vitamins and minerals. This recipe from Foodista has 1 fans. It is a good option if you're following a <b>dairy free</b> diet. From preparation to the plate, this recipe takes around <b>45 minutes</b>. A mixture of bell pepper, ziti, kale, and a handful of other ingredients are all it takes to make this recipe so flavorful. To use up the salt and pepper you could follow this main course with the <a href="https://spoonacular.com/recipes/dr-pepper-cake-with-flour-cooked-frosting-539165">Dr. 
  Pepper Cake with Flour Cooked Frosting</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is spectacular. Similar recipes include <a href="https://spoonacular.com/recipes/curried-chickpeas-and-kale-158454">Curried Chickpeas and Kale</a>, <a href="https://spoonacular.com/recipes/creamed-kale-with-chickpeas-608963">Creamed kale with chickpeas</a>, and <a href="https://spoonacular.com/recipes/sauted-chickpeas-with-ham-and-kale-15237">Sautéed Chickpeas with Ham and Kale</a>.`,
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-with-chickpeas-and-kale-654905",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 8,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 3,
      spoonacularScore: 56,
      healthScore: 15,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 145.96,
      id: 654901,
      title: "Pasta With Chicken and Broccoli",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl:
        "https://www.foodista.com/recipe/Y5X6DRHT/pasta-with-chicken-and-broccoli",
      image: "https://spoonacular.com/recipeImages/654901-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta With Chicken and Broccoli might be a good recipe to expand your main course repertoire. This recipe makes 4 servings with <b>332 calories</b>, <b>19g of protein</b>, and <b>18g of fat</b> each. For   <b>$1.46 per serving</b>, this recipe <b>covers 16%</b> of your daily requirements of vitamins and minerals. 3 people found this recipe to be flavorful and satisfying. A mixture of wine, parmesan cheese, basil leaves, and a handful of other ingredients are all it takes to make this recipe so yummy. It is brought to you by Foodista. From preparation to the plate, this recipe takes approximately <b>approximately 45 minutes</b>. Taking all factors into account, this recipe <b>earns a spoonacular score of 55%</b>, which is solid. Similar recipes are <a href="https://spoonacular.com/recipes/pasta-house-pasta-con-broccoli-this-is-an-alfredo-based-sauce-that-combines-pasta-fresh-mushrooms-and-fresh-broccoli-601199">Pasta House Pasta con Broccoli – This is an Alfredo based sauce that combines pasta, fresh mushrooms, and fresh broccoli</a>, <a href="https://spoonacular.com/recipes/broccoli-and-pasta-with-chicken-479320">Broccoli and Pasta with Chicken</a>, and <a href="https://spoonacular.com/recipes/pasta-with-chicken-and-broccoli-110475">Pasta With Chicken and Broccoli</a>.',
      cuisines: [],
      dishTypes: [Array],
      diets: [],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-with-chicken-and-broccoli-654901",
    },
  ],
  offset: 0,
  number: 10,
  totalResults: 210,
};

const recomendedData = {
  results: [
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: true,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 11,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 2,
      spoonacularScore: 92,
      healthScore: 90,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 168.12,
      id: 654959,
      title: "Pasta With Tuna",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "http://www.foodista.com/recipe/K6QWSKQM/pasta-with-tuna",
      image: "https://spoonacular.com/recipeImages/654959-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary: `Pasta With Tuna might be just the main course you are searching for. One serving contains <b>421 calories</b>, <b>24g of protein</b>, and <b>10g of fat</b>. For <b>$1.68 per serving</b>, this recipe <b>covers 28%</b> of your daily requirements of vitamins and minerals. 1 person were impressed by this recipe. Head to the store and pick up flour, onion, peas, and a few other things to make it today. It is a good option if 
  you're following a <b>pescatarian</b> diet. All things considered, we decided this recipe <b>deserves a spoonacular score of 92%</b>. This score is excellent. Try <a href="https://spoonacular.com/recipes/pasta-and-tuna-salad-ensalada-de-pasta-y-atn-226303">Pastan and Tuna Salad (Ensalada de Pasta y Atún)</a>, <a href="https://spoonacular.com/recipes/tuna-pasta-565100">Tuna Pasta</a>, and <a href="https://spoonacular.com/recipes/tuna-pasta-89136">Tuna Pasta</a> for similar recipes.`,
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-with-tuna-654959",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 24,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 66,
      healthScore: 28,
      creditsText: "Pick Fresh Foods",
      license: "CC BY 3.0",
      sourceName: "Pick Fresh Foods",
      pricePerServing: 274.82,
      id: 511728,
      title: "Pasta Margherita",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "http://pickfreshfoods.com/pasta-margherita/",
      image: "https://spoonacular.com/recipeImages/511728-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pasta Margherita might be just the main course you are searching for. One serving contains <b>809 calories</b>, <b>34g of protein</b>, and <b>34g of fat</b>. This recipe serves 4 and costs $2.75 per serving. 1 person has made this recipe and would make it again. If you have basil, linguine pasta, garlic clove, and a few other ingredients on hand, you can make it. To use up the olive oil you could follow this main course with the <a href="https://spoonacular.com/recipes/sauteed-banana-granola-and-yogurt-parfait-624619">Sauteed Banana, Granolan and Yogurt Parfait</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 69%</b>. This score is pretty good. Similar recipes include <a href="https://spoonacular.com/recipes/margherita-pizza-with-pesto-pasta-salad-31919">Margherita Pizza With Pesto Pasta Salad</a>, <a href="https://spoonacular.com/recipes/pasta-margherita-with-rhubarb-and-apple-compote-613006">Pasta margherita with rhubarb and apple compote</a>, and <a href="https://spoonacular.com/recipes/margherita-pizzette-516272">Margherita Pizzette</a>.',
      cuisines: [],
      dishTypes: [Array],
      diets: [],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-margherita-511728",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 12,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 68,
      healthScore: 28,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 616.45,
      id: 654812,
      title: "Pasta and Seafood",
      readyInMinutes: 45,
      servings: 2,
      sourceUrl: "http://www.foodista.com/recipe/8YWWDKPS/pasta-and-seafood",
      image: "https://spoonacular.com/recipeImages/654812-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pastan and Seafood is a <b>dairy free and pescatarian</b> main course. One serving contains <b>521 calories</b>, <b>38g of protein</b>, and <b>4g of fat</b>. This recipe serves 2 and costs $5.79 per serving. From preparation to the plate, this recipe takes around <b>45 minutes</b>. This recipe from Foodista has 1 fans. If you have shrimp, squid ink linguine, parsley, and a few other ingredients on hand, you can make it. To use up the salt you could follow this main course with the <a href="https://spoonacular.com/recipes/apple-turnovers-recipe-48175">Apple Turnovers Recipe</a> as a dessert. All things considered, we decided this recipe <b>deserves a spoonacular score of 57%</b>. This score is solid. Try <a href="https://spoonacular.com/recipes/seafood-pasta-373851">Seafood Pasta</a>, <a href="https://spoonacular.com/recipes/seafood-pasta-246928">Seafood Pasta</a>, and <a href="https://spoonacular.com/recipes/seafood-pasta-22624">Seafood Pasta</a> for similar recipes.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl: "https://spoonacular.com/pasta-and-seafood-654812",
    },
    {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: true,
      veryHealthy: false,
      cheap: false,
      veryPopular: false,
      sustainable: false,
      weightWatcherSmartPoints: 10,
      gaps: "no",
      lowFodmap: false,
      aggregateLikes: 1,
      spoonacularScore: 70,
      healthScore: 32,
      creditsText: "Foodista.com – The Cooking Encyclopedia Everyone Can Edit",
      license: "CC BY 3.0",
      sourceName: "Foodista",
      pricePerServing: 273.29,
      id: 654857,
      title: "Pasta On The Border",
      readyInMinutes: 45,
      servings: 4,
      sourceUrl: "https://www.foodista.com/recipe/25DLQT8W/pasta-on-the-border",
      image: "https://spoonacular.com/recipeImages/654857-312x231.jpg",
      imageType: "jpg",
      nutrition: [Object],
      summary:
        'Pastan On The Border requires about <b>roughly 45 minutes</b> from start to finish. This dairy free recipe serves 4 and costs <b>$2.73 per serving</b>. This main course has <b>358 calories</b>, <b>21g of   protein</b>, and <b>9g of fat</b> per serving. Only a few people made this recipe, and 1 would say it hit the spot. Head to the store and pick up evoo, pico de gallo, bell pepper, and a few other things to make it today. It is brought to you by Foodista. With a spoonacular <b>score of 69%</b>, this dish is solid. <a href="https://spoonacular.com/recipes/south-of-the-border-chicken-pasta-skillet-281789">South-of-the-Border Chicken & Pasta Skillet</a>, <a href="https://spoonacular.com/recipes/border-guacamole-21289">Border Guacamole</a>, and <a href="https://spoonacular.com/recipes/border-guacamole-101868">Border Guacamole</a> are very similar to this recipe.',
      cuisines: [],
      dishTypes: [Array],
      diets: [Array],
      occasions: [],
      analyzedInstructions: [Array],
      spoonacularSourceUrl:
        "https://spoonacular.com/pasta-on-the-border-654857",
    },
  ],
};

const parent = {
  animate: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 1.1,
    },
  },
};

const recommendAnimation = {
  initial: {
    opacity: 0,
    y: -10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const maskAnimation = {
  initial: { width: "100%" },
  animate: { width: "0" },
  exit: { width: "100%" },
};

const transitions = { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.9] };

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  // const [anchorEl, setAnchorEl] = React.useState();
  // const open = Boolean(anchorEl);
  const search = useSelector((state) => state.search);
  const [open, setOpen] = useState(false);

  const changeHandler = (e) => {
    dispatch(setSearch(e.target.value));
    // if (anchorEl?.id !== "input") {
    //   setAnchorEl(document.getElementById("input"));
    // }
  };

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      history.push(`/search?q=${search.query}`);
      dispatch(getRecipes(search));
    }
  };

  useEffect(() => {
    setOpen(!open);
  }, [location]);

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <SearchCont>
      {open && <Panels />}

      <motion.div
        initial={{ visibility: "hidden", opacity: "0" }}
        animate={{
          visibility: "visible",
          opacity: "1",
          transition: { delay: 1 },
        }}
        exit={{ visibility: "hidden", transition: { delay: 1 } }} //transition: { delay: 1 } }}
        className="cont"
      >
        <h1>
          <motion.div
            id="mask"
            initial="initial"
            animate="animate"
            //exit="exit"
            transition={{ ...transitions, duration: 1, delay: 0.8 }}
            variants={maskAnimation}
          />
          Search
        </h1>
        <SearchBar component="form" elevation={3}>
          <InputBase
            autoComplete="off"
            id="input"
            autoFocus={true}
            placeholder="Search over 5000 recipes"
            style={{ flexGrow: 1, padding: "10px" }}
            onChange={changeHandler}
            onKeyPress={searchHandler}
          />
          <IconButton
            aria-label="search"
            onClick={() => {
              dispatch(getRecipes(search));
            }}
          >
            <SearchIcon />
          </IconButton>
          <Divider orientation="vertical" />
        </SearchBar>
        {/* {search.query && (
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          disableAutoFocus
          disableEnforceFocus
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <SearchList>
            {recipes &&
              recipes?.map((recipe, key) => {
                return <ListItem key={key}>{recipe.title}</ListItem>;
              })}
            {fakeData &&
              fakeData.results?.map((recipe, key) => {
                return (
                  <SearchItem key={key} recipe={recipe}>
                    {recipe.title}
                  </SearchItem>
                );
              })}
          </SearchList>
        </Popover>
      )} */}
        <Recommended>
          <h3>Recommended</h3>
          <RecommendedList
            variants={parent}
            initial="initial"
            animate="animate"
            //exit="exit"
            container
            justify="center"
            spacing={2}
          >
            {recomendedData.results.map((data, key) => (
              <GridItem
                key={key}
                variants={recommendAnimation}
                transition={transitions}
                item
              >
                <Card data={data} />
              </GridItem>
            ))}
          </RecommendedList>
        </Recommended>
      </motion.div>
    </SearchCont>
  );
};

const Panels = () => {
  return (
    <>
      <Panel
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          top: [null, 0, 0],
        }}
        transition={{ ...transitions, duration: 2, times: [0, 0.5, 1] }}
        // exit={{
        //   height: [0, window.innerHeight, 0],
        //   top: [0, 0, window.innerHeight],
        // }}
        className="leftPanel"
      ></Panel>
      <Panel
        initial={{ height: 0 }}
        animate={{
          height: [0, window.innerHeight, 0],
          top: [0, 0, window.innerHeight],
        }}
        // exit={{
        //   height: [0, window.innerHeight, 0],
        //   top: [window.innerHeight, 0, 0],
        // }}
        transition={{ ...transitions, duration: 2, times: [0, 0.5, 1] }}
        className="rightPanel"
      ></Panel>
    </>
  );
};

export default Search;

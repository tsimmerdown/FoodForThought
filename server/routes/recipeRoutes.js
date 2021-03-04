import express from "express";

import { getAllRecipes } from "../controllers/recipe.js";

const router = express.Router();

router.get("/:query", getAllRecipes);

export default router;

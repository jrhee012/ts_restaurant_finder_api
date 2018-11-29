import { model } from "mongoose";

// Load all model schema
import "./Data";
import "./Restaurants";

export const Data = model("Data");
export const Restaurants = model("Restaurants");

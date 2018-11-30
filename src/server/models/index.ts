import { model } from "mongoose";

// Load all model schema
import "./lib/Data";
import "./lib/Restaurants";
import "./lib/Users";
import { UsersModel } from "./lib/Users";

export const Data = model("Data");
export const Restaurants = model("Restaurants");
export const Users = model<UsersModel>("Users");

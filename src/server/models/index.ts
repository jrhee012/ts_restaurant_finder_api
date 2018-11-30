import { model } from "mongoose";
import { UsersModel } from "./lib/Users";
import { DataModel } from "./lib/Data";
import { RestaurantsModel } from "./lib/Restaurants";

// Load all model schema
import "./lib/Data";
import "./lib/Restaurants";
import "./lib/Users";

export const Data = model<DataModel>("Data");
export const Restaurants = model<RestaurantsModel>("Restaurants");
export const Users = model<UsersModel>("Users");

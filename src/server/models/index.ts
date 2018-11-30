import { model } from "mongoose";

// Load all model schema
import "./lib/Data";
import "./lib/Restaurants";
import "./lib/Users";
import "./lib/Roles";
import "./lib/Permissions";

// Import model interface
import { RolesModel } from "./lib/Roles";
import { UsersModel } from "./lib/Users";
import { DataModel } from "./lib/Data";
import { RestaurantsModel } from "./lib/Restaurants";
import { PermissionsModel } from "./lib/Permissions";

export const Data = model<DataModel>("Data");
export const Restaurants = model<RestaurantsModel>("Restaurants");
export const Users = model<UsersModel>("Users");
export const Roles = model<RolesModel>("Roles");
export const Permissions = model<PermissionsModel>("Permissions");

import loadModels from "./lib/load_models";
import { Application } from "express";

loadModels();

export default (server: Application) => {
    loadModels();
};

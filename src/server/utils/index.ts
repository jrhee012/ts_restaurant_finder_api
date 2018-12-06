import respBuilder from "./lib/response-builder";
import { YelpApiClient as yelp, OpenTableClient as opentable } from "./lib/api-clients";
import { redisClient as redis } from "./lib/redis";
import { suggestionBuilder as search } from "./lib/search-suggestion-builder";
import { checkAuthenticated as checkauth } from "./lib/authentication";
import { UserHelper as userhelper } from "./lib/user-helper";
import restdatafectch from "./lib/restaurant-data-fetcher";
import setalerts from "./lib/alert";
import { pagination as page } from "./lib/pagination";

// api client utils
export const responseBuilder = respBuilder;
export const YelpApiClient = yelp;
export const OpenTableClient = opentable;

// redis cache utils
export const redisClient = redis;

// suggestion search utils
export const suggestionBuilder = search;

// user utils
export const checkAuthenticated = checkauth;
export const UserHelper = userhelper;

// restaurants utils
export const RestaurantDataFetcher = restdatafectch;

// set alerts for views for controllers
export const setAlerts = setalerts;

// create pagination object
export const pagination = page;

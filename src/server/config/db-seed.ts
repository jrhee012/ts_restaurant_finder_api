import { find } from "lodash";
import { Permissions, Roles } from "../models";
import { PermissionsModel } from "../models/lib/Permissions";
import { RolesModel } from "../models/lib/Roles";
import logger from "./logger";

const defaultPermissions: { name: string }[] = [
    {
        name: "read",
    },
    {
        name: "write",
    },
    {
        name: "update",
    },
    {
        name: "delete",
    },
];

const defaultRoles: { name: string }[] = [
    {
        name: "admin",
    },
    {
        name: "user",
    },
];

export interface IDBSeeder {}
export interface DBSeederModel extends Document, IDBSeeder {
    help: () => void;
    removeAll: (modelName: string) => Promise<{} | undefined>;
    seedPermissions: () => Promise<PermissionsModel[]>;
    seedRoles: () => Promise<RolesModel[]>;
    findAllAndUpdate: () => Promise<{
        permissions: PermissionsModel[];
        roles: RolesModel[];
    }>;
    assignPermissions: () => Promise<void>;
    start: () => Promise<void>;
}

export default class DBSeeder {
    constructor() {
        logger.info("starting db initializer!");
    }

    help() {
        const helpMessage = "this is help!";
        return helpMessage;
    }

    async removeAll(modelName: string) {
        if (!modelName) {
            const permissions = new Promise((resolve, reject) => {
                Permissions.deleteMany({}, function (err) {
                    if (err) {
                        logger.error("mongodb REMOVE err!");
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            });

            const roles = new Promise((resolve, reject) => {
                Roles.deleteMany({}, function (err) {
                    if (err) {
                        logger.error("mongodb REMOVE err!");
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            });

            try {
                logger.debug("starting remove all...");
                await Promise.all([permissions, roles]);
                logger.debug("remove all finished successfully");
            } catch (e) {
                logger.error("error remove all!");
                logger.error(e.message);
            }

            return;
        }

        return new Promise((resolve, reject) => {
            if (modelName.toLowerCase() === "permissions") {
                Permissions.deleteMany({}, function (err) {
                    if (err) {
                        logger.error("mongodb REMOVE err!");
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            }

            if (modelName.toLowerCase() === "roles") {
                Roles.deleteMany({}, function (err) {
                    if (err) {
                        logger.error("mongodb REMOVE err!");
                        // console.error(err);
                        reject(err);
                    }
                    resolve();
                });
            }
        });
    }

    async seedPermissions() {
        let permissions: PermissionsModel[] = [];
        try {
            permissions = await Permissions.create(defaultPermissions);
            logger.debug("all `PERMISSIONS` saved to db!");
        } catch (e) {
            logger.error("`PERMISSIONS` seeding ERROR!");
            logger.error(e.message);
            return process.exit(1);
        }
        return permissions;
    }

    async seedRoles() {
        let roles: RolesModel[] = [];
        try {
            roles = await Roles.create(defaultRoles);
            logger.debug("all `ROLES` saved to db!");
        } catch (e) {
            logger.error("`ROLES` seeding ERROR!");
            console.error(e.message);
            return process.exit(1);
        }
        return roles;
    }

    /**
     * Returns an object with arrays of `Roles` and `Permissions` entries
     *  with `modelName` (i.e. `permissions` or `roles`) as the key.
     */
    async findAllAndUpdate() {
        let permissions: PermissionsModel[];
        let roles: RolesModel[];

        try {
            permissions = await Permissions.find({});
            roles = await Roles.find({});
        } catch (e) {
            logger.error("FINDALL ERROR!");
            logger.error(e.message);
            return process.exit(1);
        }

        const results: {
            permissions: PermissionsModel[],
            roles: RolesModel[],
        } = {
            permissions: permissions,
            roles: roles,
        };

        if (results.permissions.length !== defaultPermissions.length) {
            try {
                await this.removeAll("permissions");
            } catch (e) {
                logger.error(e.message);
                return process.exit(1);
            }

            results.permissions = await this.seedPermissions();
        }

        if (results.roles.length !== defaultRoles.length) {
            try {
                await this.removeAll("roles");
            } catch (e) {
                logger.error(e.message);
                return process.exit(1);
            }

            results.roles = await this.seedRoles();
        }

        await this.assignPermissions();

        return results;
    }

    /**
     * Assign roles with corresponding permissions.
     */
    async assignPermissions() {
        const permissions: PermissionsModel[] = await Permissions.find({});
        const admin_permissions: string[] = [];
        const user_permissions: string[] = [];

        permissions.forEach(perm => {
            admin_permissions.push(perm._id);

            if (perm.name === "read"
            || perm.name === "write"
            || perm.name === "update") {
                user_permissions.push(perm._id);
            }
        });

        const roles: RolesModel[] = await Roles.find({});

        const admin = find(roles, { name: "admin" });
        if (admin !== undefined) {
            admin.scopes = admin_permissions;
            await admin.save();
        }

        const user = find(roles, { name: "user" });
        if (user !== undefined) {
            user.scopes = user_permissions;
            await user.save();
        }

        logger.debug("updated roles!");
    }

    /**
     * Initialize DBSeeder to check for DB entries requirements and
     * create entries if missing.
     */
    async start() {
        logger.info("initializing db seeds...");
        await this.findAllAndUpdate();
        logger.info("db seed finished successfully!");
    }
}

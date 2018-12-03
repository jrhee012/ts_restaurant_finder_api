"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var PermissionsSchema = new mongoose_1.Schema({
    name: String,
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});
mongoose_1.model("Permissions", PermissionsSchema);
//# sourceMappingURL=Permissions.js.map
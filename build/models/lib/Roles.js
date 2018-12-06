"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RolesSchema = new mongoose_1.Schema({
    name: String,
    scopes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Permissions", index: true }],
    created_at: {
        type: Date,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        default: new Date().toISOString(),
    },
});
RolesSchema.pre("validate", function () {
    var doc = this;
    doc.last_updated = new Date().toISOString();
});
mongoose_1.model("Roles", RolesSchema);
//# sourceMappingURL=Roles.js.map
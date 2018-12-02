"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DataSchema = new mongoose_1.Schema({
    raw_data: mongoose_1.Schema.Types.Mixed,
    source: String,
    ext_id: String,
    created_at: {
        type: Date,
        required: true,
        default: new Date().toISOString(),
    },
    last_updated: {
        type: Date,
        required: true,
        default: new Date().toISOString(),
    },
});
DataSchema.pre("validate", function () {
    var doc = this;
    doc.last_updated = new Date().toISOString();
});
mongoose_1.model("Data", DataSchema);
//# sourceMappingURL=Data.js.map
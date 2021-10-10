"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypegooseMiddleware = void 0;
const mongoose_1 = require("mongoose");
const typegoose_1 = require("@typegoose/typegoose");
const TypegooseMiddleware = async (_, next) => {
    const result = await next();
    if (Array.isArray(result)) {
        return result.map((item) => (item instanceof mongoose_1.Model ? convertDocument(item) : item));
    }
    if (result instanceof mongoose_1.Model) {
        return convertDocument(result);
    }
    return result;
};
exports.TypegooseMiddleware = TypegooseMiddleware;
function convertDocument(doc) {
    const convertedDocument = doc.toObject();
    const DocumentClass = (0, typegoose_1.getClassForDocument)(doc);
    Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
    return convertedDocument;
}
//# sourceMappingURL=typegooseMiddleware.js.map
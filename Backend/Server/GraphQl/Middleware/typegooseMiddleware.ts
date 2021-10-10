import { Model, Document } from "mongoose";
import { getClassForDocument } from "@typegoose/typegoose";
import { NextFn, ResolverData } from "type-graphql";

export const TypegooseMiddleware: MiddlewareFn = async (_, next) => {
    const result = await next();

    if (Array.isArray(result)) {
        return result.map((item) => (item instanceof Model ? convertDocument(item) : item));
    }

    if (result instanceof Model) {
        return convertDocument(result);
    }

    return result;
};

function convertDocument(doc: Document) {
    const convertedDocument = doc.toObject();
    const DocumentClass = getClassForDocument(doc)!;
    Object.setPrototypeOf(convertedDocument, DocumentClass.prototype);
    return convertedDocument;
}

type MiddlewareFn<TContext = {}> = (action: ResolverData<TContext>, next: NextFn) => Promise<any>;

import { Request, Response } from "express";
// import { Document } from "mongoose";
import { readFileSync } from "fs";
import { responseBuilder, suggestionBuilder } from "../../utils";
import { ISearchSuggestionBuilder } from "../../utils/lib/search-suggestion-builder";

export const downloadSuggestions = (req: Request, res: Response) => {
    let suggestions: ISearchSuggestionBuilder["transformed"] = suggestionBuilder.transformed;

    try {
        if (suggestions.length < 1
            && suggestionBuilder.file_location !== undefined) {
            const fileData = readFileSync(
                suggestionBuilder.file_location,
                { flag: "r", encoding: "utf8" },
            );
            suggestions = JSON.parse(fileData);
        }
    } catch (e) {
        console.error(e.message);
        return res.status(500).json(responseBuilder.internal_server_error());
    }

    if (suggestions.length < 1) {
        return res.status(500).json(responseBuilder.not_found_error());
    }
    return res.status(200).json(suggestions);
};

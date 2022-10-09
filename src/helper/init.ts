import {SearchEngineName} from "../@types/search";

const Background = 'https://i.imgur.com/ildkNHJ.png';
const Name = 'Name';
const SearchEngine = 'google';

/**
 * @description Bookmark object
 * @param {string} name
 * @param {string} url
 * @returns {BookmarkType}
 * @example
 * const bookmark = createBookmark('Google', 'https://google.com')
 */
export type BookmarkType = {
    name: string,
    url: string
}

/**
 * @description The app's settings
 * @param {array} bookmarks
 * @param {string} background
 * @param {string} name
 * @param {SearchEngineName} searchEngine
 * @returns {SettingsType}
 * @example
 * const settings = createSettings([{name: "Google", url: 'https://google.com'}], 'https://i.imgur.com/ildkNHJ.png', 'Name', 'ecosia')
 */
export type SettingsType = {
    bookmarks: BookmarkType[],
    background: string,
    name: string,
    searchEngine: SearchEngineName
}

export const SettingsTemplate: SettingsType = {
    bookmarks: [],
    background: Background,
    name: Name,
    searchEngine: SearchEngine
}

export const SettingsInputs = {
    background: "text",
    name: "text",
    searchEngine: [
        "DeepL",
        "DuckDuckGo",
        "Ecosia",
        "Google",
        "Startpage",
        "YouTube",
        "Neeva"
    ]
}
export type SearchEngineName =
    | "deepl"
    | "duckduckgo"
    | "ecosia"
    | "google"
    | "startpage"
    | "youtube"
    | "neeva"

const isWebUrl = (value: string) => {
    let url
    try {
        url = new URL(value)
    } catch {
        return false
    }
    return url.protocol === "http:" || url.protocol === "https:"
}

const engineLookup: Record<SearchEngineName, string> = {
    deepl: "https://www.deepl.com/translator#-/-/",
    duckduckgo: "https://duckduckgo.com/?q=",
    ecosia: "https://www.ecosia.org/search?q=",
    google: "https://www.google.com/search?q=",
    startpage: "https://www.startpage.com/search?q=",
    youtube: "https://www.youtube.com/results?q=",
    neeva: "https://neeva.com/search?q=",
}

const getEngineUrl = (engine: SearchEngineName) => engineLookup[engine];

const getTargetUrlByOptions = (
    query: string,
    engine: SearchEngineName,
    options?: SearchOptions
) => {
    const engineUrl = getEngineUrl(engine)
    let targetUrl = engineUrl + query

    if (options?.directLink && isWebUrl(query)) targetUrl = query
    if (options?.forwardingLookup?.[query])
        targetUrl = options?.forwardingLookup?.[query]

    return targetUrl
}

export type SearchOptions = {
    /** Query will get opened in new tab */
    newTab?: boolean
    /** If the query is an url, the url will be opened directly */
    directLink?: boolean
    /** Lookup which specifies forwarding for defined queries */
    forwardingLookup?: Record<string, string>
}

/** Function to perform a web search
 *
 * @param query query of the search
 * @param engine engine which will be used to search
 * @param options search options regarding the redirection
 */

export const performSearch = (
    query: string,
    engine: SearchEngineName,
    options?: SearchOptions
) => {
    const targetUrl = getTargetUrlByOptions(query, engine, options)
    const target = options?.newTab ? "_blank" : "_self"
    window.open(targetUrl, target)
}


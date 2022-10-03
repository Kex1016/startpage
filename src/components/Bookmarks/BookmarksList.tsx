import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useStorage} from "@startpage/local-storage";
import {SettingsTemplate} from "../../helper/init";

export const BookmarkWrapper = styled.div`
  ${({theme: {space, color}}) => css`
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr);
    grid-gap: ${space.large};
    padding: ${space.large};
  `}
`

export const BookmarkLink = styled.a`
  ${({theme: {space, color}}) => css`
    padding: 0 ${space.large};
    position: relative;
    color: ${color.fg.base};
    text-decoration: underline transparent;
    width: auto;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: ${color.fg.highlight};
      text-decoration: underline ${color.fg.highlight};
    }
  `}
`

const Bookmark = () => {
    const [settings] = useStorage("settings", SettingsTemplate);
    const bookmarks = settings.bookmarks;

    if (bookmarks.length === 0) {
        return <div>
            <div>
                No bookmarks yet.
            </div>
            <div>
                Add some bookmarks by clicking the <i className="fa-solid fa-pen-to-square"></i> button.
            </div>
        </div>;
    }

    return (
        <BookmarkWrapper>
            {bookmarks.map((bookmark: any) => {
                    return (
                        <BookmarkLink href={bookmark.url} target="_blank">
                            {bookmark.name}
                        </BookmarkLink>
                    );
                }
            )}
        </BookmarkWrapper>
    );
}

const BookmarksList = () => {
    return (
        <Bookmark/>
    );
}

export {BookmarksList};
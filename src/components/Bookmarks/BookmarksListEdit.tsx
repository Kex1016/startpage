import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useStorage} from "@startpage/local-storage";
import {BookmarkWrapper} from "./BookmarksList";
import {hexToRgb} from "../../helper/hexToRgb";
import {useState} from "react";
import {SettingsTemplate, type SettingsType} from "../../helper/init";

const BookmarkAdd = styled.div`
  ${({theme: {space, color}}) => css`
    padding: ${space.large};
  `}
`

const BookmarkInfo = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: relative;
  `}
`

const BookmarkInfoLink = styled.div`
  ${({theme: {space, color}}) => css`
    width: 100%;
    // dont break line, use ellipsis
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: relative;

    &:hover > .hover {
      opacity: 1;
    }
  `}
`

const BookmarkInfoLinkHover = styled.div`
  ${({theme: {space, color}}) => {
    const rgb = hexToRgb(color.bg.base);
    if (!rgb) {
      return css``;
    }

    return css`
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 5rem;
      backdrop-filter: blur(5px);
      color: ${color.fg.base};
      opacity: 0;
      pointer-events: none;
      padding: ${space.medium};
      border-radius: ${space.small};
      transition: opacity 0.2s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
    `
  }
  }
`

const BookmarkAddInput = styled.input`
  ${({theme: {space, color}}) => css`
    width: 100%;
    background: none;
    border: none;
    color: ${color.fg.surface};

    &:focus {
      outline: none;
    }
  `}
`

const BookmarkAddConfirm = styled.button`
  ${({theme: {space, color}}) => css`
    background: none;
    border: none;
    color: ${color.fg.surface};
    cursor: pointer;
  `}
`

const BookmarkRemoveButton = styled.button`
  ${({theme: {space, color}}) => {
    const rgb = hexToRgb(color.bg.highlight);
    if (!rgb) return css``;

    const bg = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`;
    const bg_hover = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`;

    return css`
      background: ${bg};
      border: none;
      color: ${color.fg.surface};
      cursor: pointer;
      position: absolute;
      backdrop-filter: blur(10px);
      top: 0;
      right: 0;
      z-index: 100;
      padding: ${space.small};
      border-radius: ${space.small};
      transition: background 0.2s ease-in-out;
      
        &:hover {
            background: ${bg_hover};
        }
    `
  }
  }`

const Bookmark = () => {
    const [settings, setSettings] = useStorage<SettingsType>("settings", SettingsTemplate);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    const bookmarks = settings.bookmarks;

    const addBookmark = () => {
        if (name === '' || url === '') return;

        const newSettings = {
            ...settings,
            bookmarks: [
                ...settings.bookmarks,
                {
                    name,
                    url
                }
            ]
        }

        setSettings(newSettings);
        setName('');
        setUrl('');
    }

    return (
        <BookmarkWrapper>
            {bookmarks ?
                bookmarks.map((bookmark: any) => {
                        const setClipboard = (e: any) => {
                            e.preventDefault();
                            navigator.clipboard.writeText(bookmark.url).then(r => {
                                alert('Copied to clipboard');
                            });
                        };

                        const removeBookmark = (e: any) => {
                            e.preventDefault();
                            const newSettings = {
                                ...settings,
                                bookmarks: settings.bookmarks.filter((b: any) => b.name !== bookmark.name)
                            }

                            setSettings(newSettings);
                        }
                        return (
                            <BookmarkInfo>
                                <div>
                                    {bookmark.name}
                                </div>
                                <BookmarkInfoLink data-link={bookmark.url} onClick={setClipboard}>
                                    {bookmark.url}
                                    <BookmarkInfoLinkHover className={"hover"}>
                                        {bookmark.url}
                                    </BookmarkInfoLinkHover>

                                </BookmarkInfoLink>

                                <BookmarkRemoveButton onClick={removeBookmark}>
                                    <i className="fa-solid fa-trash"></i>
                                </BookmarkRemoveButton>
                            </BookmarkInfo>
                        );
                    }
                ) : null}
            <BookmarkAdd>
                <BookmarkAddInput type="text" placeholder="Name" value={name}
                                  onChange={(e) => setName(e.target.value)}/>
                <BookmarkAddInput type="url" placeholder="URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
                <BookmarkAddConfirm onClick={addBookmark}>
                    Add
                </BookmarkAddConfirm>
            </BookmarkAdd>
        </BookmarkWrapper>
    );
}

const BookmarksListEdit = () => {
    return (
        <Bookmark/>
    );
}

export {BookmarksListEdit};
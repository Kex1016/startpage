import {BookmarksList} from "./BookmarksList";
import {BookmarksListEdit} from "./BookmarksListEdit";
import {BookmarksEdit} from "./BookmarksEdit";
import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {useState} from "react";
import {useStorage} from "@startpage/local-storage";
import {SettingsTemplate, type SettingsType} from "../../helper/init";

const BookmarksContainer = styled.div`
  ${({theme: {space, color}}) => css`
    display: block;
  `}
`

const Buttons = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: ${space.large};
    width: 100%;
    padding: 0 ${space.large};
  `}
`

const Button = styled.button`
  ${({theme: {space, color}}) => css`
    background: ${color.bg.surface};
    border: none;
    color: ${color.fg.surface};
    cursor: pointer;
    padding: ${space.small};
    border-radius: ${space.small};
    transition: background 0.2s ease-in-out;

    &:hover {
      background: ${color.bg.highlight};
    }
  `}
`

const Bookmarks = () => {
    const [edit, setEdit] = useState(false);
    const [settings, setSettings] = useStorage<SettingsType>("settings", SettingsTemplate);
    const toggleEdit = () => {
        setEdit(!edit);
    }

    return (
        <BookmarksContainer>
            <BookmarksEdit onClick={toggleEdit}/>
            {!edit && <BookmarksList/>}
            {edit && <BookmarksListEdit/>}
            {edit &&
                <Buttons>
                    <Button onClick={() => {
                        const json = JSON.stringify(settings);
                        const blob = new Blob([json], {type: "application/json"});
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.download = "startpage.json";
                        link.href = url;
                        link.click();
                    }}>Export</Button>

                    <Button onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = '.json';
                        input.onchange = (event) => {
                            const file = (event.target as HTMLInputElement).files?.[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (event) => {
                                const text = event.target?.result;
                                if (!text) return;
                                const json = JSON.parse(text as string);
                                setSettings(json);
                                window.location.reload();
                            }
                            reader.readAsText(file);
                        }
                        input.click();
                    }}>Import</Button>
                </Buttons>
            }
        </BookmarksContainer>
    );
}

export {Bookmarks};

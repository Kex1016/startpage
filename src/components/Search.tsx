import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {performSearch} from "@startpage/search";
import {ChangeEvent, useState} from "react";
import {useStorage} from "@startpage/local-storage";
import {SettingsTemplate} from "../helper/init";

const SearchContainer = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
  `}
`

const SearchInput = styled.input`
  ${({theme: {space, color}}) => css`
    width: 100%;
    padding: ${space.medium};
    border: none;
    border-bottom: 1px solid ${color.fg.base};
    font-size: ${space.medium};
    color: ${color.fg.base};
    background: transparent;
    
    &:focus {
        outline: none;
    }
  `}
`

const Search = () => {
    const [value, setValue] = useState("");
    const [settings] = useStorage("settings", SettingsTemplate);

    function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }

    const handleSearch = () => performSearch(value, settings.searchEngine, {
        directLink: true
    });

    return (
        <SearchContainer>
            <SearchInput type="text" placeholder="Type here..." value={value} autoFocus onChange={onSearchInputChange}
                         onKeyDown={key => key.key === 'Enter' && handleSearch()}/>
        </SearchContainer>
    );
}

export {Search};
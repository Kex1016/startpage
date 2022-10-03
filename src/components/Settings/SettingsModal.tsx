import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {Component} from "react";
import {SettingsTemplate, SettingsInputs} from "../../helper/init";
import {useStorage} from "@startpage/local-storage";

const Modal = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 ${space.large};
    position: fixed;
    top: 0;
    left: 0;
  `}
`

const ModalBackground = styled.div`
  ${({theme: {space, color}}) => css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px);
    z-index: 1;
  `}
`

const ModalContent = styled.div`
  ${({theme: {space, color}}) => css`
    display: block;
    max-width: 1000px;
    width: 100%;
    height: auto;
    background: ${color.bg.surface};
    border-radius: ${space.small};
    padding: ${space.large};
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    z-index: 2;
    position: relative;
    color: ${color.fg.base};
  `}
`

const ModalClose = styled.div`
  ${({theme: {space, color}}) => css`
    position: absolute;
    top: 15px;
    right: 20px;
    color: ${color.fg.base};
    font-size: 2rem;
    cursor: pointer;
  `}
`

const ModalSettingEntries = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    flex-direction: column;
    gap: ${space.smallest};
  `}
`

const SaveButton = styled.button`
  ${({theme: {space, color}}) => css`
    display: block;
    background: ${color.palette.green};
    color: ${color.bg.base};
    border: none;
    border-radius: ${space.small};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    padding: ${space.small} ${space.medium};
    margin-top: ${space.large};

    &:hover {
      background: ${color.bg.highlight};
      color: ${color.fg.base};
    }
  `}
`

const ModalInputText = styled.input`
  ${({theme: {space, color}}) => css`
    display: block;
    width: 100%;
    padding: ${space.small};
    border: none;
    border-bottom: 2px solid ${color.fg.highlight};
    background: ${color.bg.surface};
    color: ${color.fg.base};
    font-size: ${space.medium};
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
    }
  `}
`

const ModalInputSelect = styled.select`
  ${({theme: {space, color}}) => css`
    display: block;
    width: 100%;
    padding: ${space.small};
    border: none;
    border-bottom: 2px solid ${color.fg.highlight};
    background: ${color.bg.surface};
    color: ${color.fg.base};
    font-size: ${space.medium};
    transition: all 0.2s ease-in-out;

    &:focus {
      outline: none;
    }

    option {
      background: ${color.bg.surface};
    }
  `}
`

const SettingsBackgroundPreview = styled.div`
    ${({theme: {space, color}}) => css`
        display: block;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        border-radius: ${space.smallest};
        margin-top: ${space.large};
        position: relative;
        width: 55%;
        // 16:9 aspect ratio
        padding-top: calc(55% / (16 / 9));
        left: calc(50% - (55% / 2));
    `}
`

const ModalSettingCollection = () => {
    const [settings, setSettings] = useStorage("settings", SettingsTemplate);

    return (
        <ModalSettingEntries>
            <h3>Name</h3>
            <ModalInputText
                type="text"
                value={settings.name}
                onChange={(event) => {
                    setSettings({
                        ...settings,
                        name: event.target.value,
                    });
                }
            } />
            <h3>Background</h3>
            <ModalInputText
                type="url"
                value={settings.background}
                onChange={(event) => {
                    setSettings({
                        ...settings,
                        background: event.target.value,
                    });
                }
            } />
            <SettingsBackgroundPreview style={{backgroundImage: `url(${settings.background})`}} />
            <h3>Search Engine</h3>
            <ModalInputSelect value={settings.searchEngine} onChange={(event) => setSettings({...settings, searchEngine: event.target.value as typeof settings.searchEngine})}>
                {SettingsInputs.searchEngine.map((engine) => (
                    <option key={engine} value={engine}>{engine}</option>
                ))}
            </ModalInputSelect>
        </ModalSettingEntries>
    )
}

function saveClick(event: any) {
    // Reload the page
    window.location.reload();
}

class SettingsModal extends Component<{ onClick: any }> {
    render() {
        let {onClick} = this.props;

        return (
            <Modal>
                <ModalBackground onClick={onClick}/>
                <ModalContent>
                    <ModalClose onClick={onClick}>
                        <i className="fas fa-times"/>
                    </ModalClose>
                    <h1>Settings</h1>
                    <ModalSettingCollection/>

                    <SaveButton onClick={saveClick}>Save</SaveButton>
                </ModalContent>
            </Modal>
        );
    }
}

export {SettingsModal};
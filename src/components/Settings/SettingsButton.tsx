import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {Component} from "react";

const Button = styled.button`
    ${({theme: {space, color}}) => css`
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: ${color.fg.base};
        cursor: pointer;
    `}
`

class SettingsButton extends Component<{ onClick: any }> {
    render() {
        let {onClick} = this.props;

        return (
            <Button onClick={onClick}>
                <i className="fa-solid fa-cog"></i>
            </Button>
        );
    }
}

export {SettingsButton};
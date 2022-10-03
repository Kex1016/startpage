import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {Component} from "react";

const Button = styled.button`
  ${({theme: {space, color}}) => css`
    background: none;
    border: none;
    color: ${color.fg.base};
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 10px;
  `}
`

class BookmarksEdit extends Component<{ onClick: any }> {
    render() {
        let {onClick} = this.props;
        return (
            <Button onClick={onClick}>
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>
        );
    }
}

export {BookmarksEdit};

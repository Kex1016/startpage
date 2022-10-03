import styled from "@emotion/styled";
import {css} from "@emotion/react";

const Header = styled.div`
  ${({theme: {space, color}}) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0 ${space.large};
    max-width: 1250px;
  `}
`

export {Header};


import styled from "@emotion/styled";
import {css} from "@emotion/react";

const H1 = styled.h1`
  ${({theme: {space, color}}) => css`
    font-size: ${space.largest};
    color: ${color.fg.highlight};
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0;
  `}
`

const H2 = styled.h2`
  ${({theme: {space, color}}) => css`
    font-size: ${space.large};
    color: ${color.fg.highlight};
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0;
  `}
`

const H3 = styled.h3`
  ${({theme: {space, color}}) => css`
    font-size: ${space.medium};
    color: ${color.fg.highlight};
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0;
  `}
`

const H4 = styled.h4`
  ${({theme: {space, color}}) => css`
    font-size: ${space.small};
    color: ${color.fg.highlight};
    font-family: 'Roboto Condensed', sans-serif;
    margin: 0;
  `}
`

export {H1, H2, H3, H4}
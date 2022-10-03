import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {hexToRgb} from "../../helper/hexToRgb";

const Section = styled.section`
  ${({theme: {space, color}}) => {
    const bg_rgb = hexToRgb(color.bg.base);
    if (!bg_rgb) return css``;

    const bg = `rgba(${bg_rgb.r}, ${bg_rgb.g}, ${bg_rgb.b}, 0.8)`;

    return css`
      width: calc(100% - ${space.large} * 2);
      margin-top: 20px;
      background-color: ${bg};
      padding: ${space.large};
      border-radius: 15px;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      backdrop-filter: blur(5px);
      max-width: 1250px;

      h1, h2, h3, h4 {
        text-align: left;
        font-weight: 100;
        font-family: 'Roboto Condensed', sans-serif;
      }
      > div {
        padding: 0;
      }
    `
  }}
`

export {Section};
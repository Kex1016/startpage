import styled from "@emotion/styled";
import {css} from "@emotion/react";
import {hexToRgb} from "../../helper/hexToRgb";
import {useStorage} from "@startpage/local-storage";
import {SettingsTemplate} from "../../helper/init";

const Container = styled.header`
  ${({theme: {space, color}}) => {
    const [settings] = useStorage("settings", SettingsTemplate);

    const bg_rgb = hexToRgb(color.bg.base);
    if (!bg_rgb) return css``;

    const {background} = settings;

    const bg = `rgba(${bg_rgb.r}, ${bg_rgb.g}, ${bg_rgb.b}, 0.8)`;
    return css`
      background-image: linear-gradient(${bg}, ${bg}), url(${background});
      background-size: cover;
      background-position: center;
      min-height: 100vh;
      font-size: ${space.large};
      color: ${color.fg.base};
      margin: 0;
      padding: ${space.large};
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    `
  }}
`

export {Container};

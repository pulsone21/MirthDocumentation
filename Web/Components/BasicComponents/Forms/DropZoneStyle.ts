import { defaultCss } from "../../../styles/defaultcss";

export const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: defaultCss.colorSecondary,
    borderStyle: "dashed",
    color: defaultCss.colorSecondary,
    outline: "none",
    transition: "all .24s ease-in-out",
    maxWidth: "305px",
    naxHeight: "95",
};

export const activeStyle = {
    borderColor: defaultCss.colorSecondaryHighlight,
    color: defaultCss.colorSecondaryHighlight,
};

export const acceptStyle = {
    borderColor: defaultCss.colorCorrect,
};

export const rejectStyle = {
    borderColor: defaultCss.colorError,
};

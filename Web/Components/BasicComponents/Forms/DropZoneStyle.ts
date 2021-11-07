import { cssDefaults } from "CSS/defaultcss";

export const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: cssDefaults.colorSecondary,
    borderStyle: "dashed",
    color: cssDefaults.colorSecondary,
    outline: "none",
    transition: "border .24s ease-in-out",
    maxWidth: "305px",
    naxHeight: "95",
};

export const activeStyle = {
    borderColor: cssDefaults.colorSecondaryHighlight,
    color: cssDefaults.colorSecondaryHighlight,
};

export const acceptStyle = {
    borderColor: cssDefaults.colorCorrect,
};

export const rejectStyle = {
    borderColor: cssDefaults.colorError,
};

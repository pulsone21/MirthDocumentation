import { defaultCss } from "../../../styles/defaultcss";
import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
    input: (provided, _state) => ({
        ...provided,
        color: defaultCss.colorTertiary,
        ":focus": { borderColor: defaultCss.colorTertiary },
    }),
    container: (provided, _state) => ({
        ...provided,
        margin: "10px",
        width: "280px",
    }),
    control: (provided, _state) => ({
        ...provided,
        backgroundColor: defaultCss.colorPrimary,
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": { borderColor: defaultCss.colorSecondary },
    }),
    placeholder: (provided, _state) => ({
        ...provided,
        marginLeft: "0px",
        left: "0px",
        marginRight: "2px",
        width: "110%",
        color: defaultCss.colorTertiary,
        font: defaultCss.fontArtical,
    }),
    dropdownIndicator: (provided, _state) => ({
        ...provided,
        ":hover": { color: defaultCss.colorSecondary },
    }),
    menu: (provided, _state) => ({
        ...provided,
        borderRadius: "5px",
        boxShadow: "0px 0px 5px " + defaultCss.colorTertiary,
    }),
    menuList: (provided, _state) => ({
        ...provided,
        borderRadius: "5px",
        backgroundColor: defaultCss.colorPrimary,
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        color: defaultCss.colorTertiary,
        backgroundColor: state.isFocused ? defaultCss.colorPrimaryHighlight : defaultCss.colorPrimary,
    }),
    noOptionsMessage: (provided, _state) => ({
        ...provided,
        color: defaultCss.colorTertiary,
    }),
    singleValue: (provided, _state) => ({
        ...provided,
        color: defaultCss.colorTertiary,
    }),
};

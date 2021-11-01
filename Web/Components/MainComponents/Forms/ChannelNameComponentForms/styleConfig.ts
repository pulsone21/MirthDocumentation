import { cssDefaults } from "CSS/defaultcss";
import { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
    input: (provided, _state) => ({
        ...provided,
        color: cssDefaults.colorTertiary,
        ":focus": { borderColor: cssDefaults.colorTertiary },
    }),
    container: (provided, _state) => ({
        ...provided,
        margin: "5px",
        width: "260px",
    }),
    control: (provided, _state) => ({
        ...provided,
        backgroundColor: cssDefaults.colorPrimary,
        cursor: "pointer",
        transition: "all 0.2s ease",
        ":hover": { borderColor: cssDefaults.colorSecondary },
    }),
    placeholder: (provided, _state) => ({
        ...provided,
        marginLeft: "0px",
        left: "0px",
        marginRight: "2px",
        width: "110%",
        color: cssDefaults.colorTertiary,
        font: cssDefaults.fontArtical,
    }),
    dropdownIndicator: (provided, _state) => ({
        ...provided,
        ":hover": { color: cssDefaults.colorSecondary },
    }),
    menu: (provided, _state) => ({
        ...provided,
        borderRadius: "5px",
        boxShadow: "0px 0px 5px " + cssDefaults.colorTertiary,
    }),
    menuList: (provided, _state) => ({
        ...provided,
        borderRadius: "5px",
        backgroundColor: cssDefaults.colorPrimary,
    }),
    option: (provided, state) => ({
        ...provided,
        cursor: "pointer",
        color: cssDefaults.colorTertiary,
        backgroundColor: state.isFocused ? cssDefaults.colorPrimaryHighlight : cssDefaults.colorPrimary,
    }),
    noOptionsMessage: (provided, _state) => ({
        ...provided,
        color: cssDefaults.colorTertiary,
    }),
    singleValue: (provided, _state) => ({
        ...provided,
        color: cssDefaults.colorTertiary,
    }),
};

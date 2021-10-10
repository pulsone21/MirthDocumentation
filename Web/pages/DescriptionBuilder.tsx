import * as React from 'react';
import BasicButton from '../Components/BasicComponents/Button/BasicButton';
import HeaderSection from '../Components/HeaderSection';
import InputFieldMulti from '../Components/MainComponents/DescriptionBuilder/InputFieldMulti';
import InputFieldSingle from "../Components/MainComponents/DescriptionBuilder/InputFieldSingle"
import JSONDisplay from "../Components/MainComponents/DescriptionBuilder/JSONDisplay";


interface DescriptionBuilderProps {

}


const DescriptionBuilder: React.FC<DescriptionBuilderProps> = () => {
    const [inputFields, getInputs] = React.useState([])





    return (
        <div>
            <HeaderSection></HeaderSection>
            <div className="Descriptionbuilder-Container">
                <div className="colLeft">
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <h1 className="HeaderText">Description Builder</h1>
                        <button style={{ maxHeight: "35px", alignSelf: "flex-end" }} className="navBtn">ClearFields</button>
                    </div>
                    <ul style={{ paddingLeft: "10px" }}>
                        <li><InputFieldSingle name="Description" placeholder="main description" inputclasses={["articalText"]} /></li>
                        <li><InputFieldSingle name="Comment" placeholder="special things" inputclasses={["articalText"]} /></li>
                        <li><InputFieldSingle name="Documentation Link" placeholder="link to the documentation" inputclasses={["articalText"]} /></li>
                        <li><InputFieldSingle name="Source" placeholder="source System/Directory Contact" inputclasses={["articalText"]} /></li>
                        <li><InputFieldMulti name="Destionations" placeholder="destination System/Directory Contact" classes={["articalText"]} /></li>
                        <li><InputFieldSingle name="Creation" placeholder="creation date/ creator" inputclasses={["articalText"]} /></li>
                        <li><InputFieldMulti name="Changes" placeholder="what when why who" classes={["articalText"]} /></li>
                        <li><InputFieldMulti name="Known Issues" placeholder="what/resolution steps" classes={["articalText"]} /></li>
                        <li><InputFieldMulti name="Tags/Keywords" placeholder="search tags/keywords parameter" classes={["articalText"]} /></li>
                    </ul>
                    <BasicButton btnName="Generate Description" btnFunction={() => getInputs} />
                </div>
                <div className="colRight">
                    <JSONDisplay />
                </div>
            </div>
        </div>
    );
}

export default DescriptionBuilder;

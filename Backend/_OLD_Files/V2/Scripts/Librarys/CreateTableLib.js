/**
 * @param {string} innerHTML The display Text as string
 * @param {boolean} bolWordBreak Bool if WordBreak should be "break-word" DEFAULT: TRUE
 * @param {string[]} ArrayOfClass An string array of classes, DEFAULT: Empty Array
 * @returns {HTMLObjectElement} "\<td\>" Element
 */
function CreateTD(innerHTML, bolWordBreak = true, ArrayOfClass = []) {
    const newTD = document.createElement("td");
    ArrayOfClass.forEach((elClass) => {
        newTD.classList.add(elClass)
    })
    if (bolWordBreak) newTD.style.wordBreak = "break-word";

    newTD.innerHTML = innerHTML;
    return newTD
}

/**
 * 
 * @param {string[]} metaDaten Array of Metadaten that get added to the HTML Object
 * @param {HTMLObjectElement} htmlObj The htmlObj where the Metadaten gets added
 * @param {string} metaDatenName the name of the MetaDaten in the Dataset Object
 * @returns Returns the Object with MetaDaten
 */
function AddMetaDatenToNewHTMLObject(metaDaten, htmlObj, metaDatenName) {
    let metaDatenString = "";
    metaDaten.forEach(el => {
        if (metaDatenString.length == 0) {
            metaDatenString = el;
        } else {
            metaDatenString += " " + el;
        }
    })
    htmlObj.dataset[metaDatenName] = metaDatenString;
    return htmlObj;
}

/**
 * 
 * @param {string[]} metaDaten Array of Metadaten that get added to the HTML Object
 * @param {HTMLObjectElement} htmlObj The htmlObj where the Metadaten gets added
 * @param {string} metaDatenName the name of the MetaDaten in the Dataset Object
 * @param {Function} callBack Callbackfunction you want to trigger, default is null
 */
function AddMetaDatenToHTMLObject(metaDaten, htmlObj, metaDatenName, callBack = null) {
    let metaDatenString = "";
    metaDaten.forEach(el => {
        if (metaDatenString.length == 0) {
            metaDatenString = el;
        } else {
            metaDatenString += " " + el;
        }
    })
    htmlObj.dataset[metaDatenName] = metaDatenString;
    callBack?.();
}
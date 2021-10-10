// ? This is a valid description json for testing
// var testJson = {
//      description: "{\r\n\"Beschreibung\": \"Produktiv Channel zum erstellen des eMediplans\",\r\n\"Dokumentation\": \"https://confluence.luks.ch/display/Mirth/eMediplan+Integration\",\r\n\r\n \"Kontakte\":{\r\n     \"Source\": \"Johannes Böhm\",\r\n     \r\n     \"Destinations\":[\r\n\t\"Johannes Böhm\" \t\r\n\t]\r\n         \r\n     },\r\n\"Erstellt\": \"13.04.2021 Johannes Böhm\",\r\n\r\n\"Bemerkungen\": [],\r\n\r\n\"BekannteFehler\": [\r\n\t\"HCI Destination [SOCKET READ TIME OUT]: -> Statistik Reseten\"\r\n\t]\r\n\r\n}"
//     }

// testJson.description = testJson.description.replace(/\r?\n|\r/g,"")
// console.log(testJson.description)
// console.log(testJson.description.substr(170,10))
// console.log(JSON.parse(testJson.description))
// console.log(JSON.stringify(JSON.parse(testJson.description),null, 4))
// ? ---------------------------------------------------

/**
 * Launches an PopUp which shows detailed informations about the clicked Channel
 * @param {string} ConnectorName Name of the Connector you want Details about as string
 */
function ShowDetailView(ConnectorName){
    //Load connector Data as JSON
    let connectorJSON = GetJSONData(ConnectorName);
    //Create Modal but dont display it)
    let modal = CreateModal(connectorJSON);
    //add modal to the html file
    $("body").append(modal);
    //display the modal
    $("#detailView").show();
}

function GetJSONData(ConnectorName){
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': `../Detail_Connectors/${ConnectorName}.json`,
        'dataType': "json",
        'success': function (data) {
            json = data;
            }
        });
    return json;
}

function CreateModal(obj){
    const mainModal = document.createElement("div");
    mainModal.id = "detailView"
    mainModal.classList.add("modal")
    
    const modalContent = document.createElement("div")
    modalContent.classList.add("modalContent");
    modalContent.innerHTML = "<span class=\"close\" onclick=\"HideModal()\">&times;</span>"
    modalContent.appendChild(GenerateHTMLContent(obj))

    mainModal.appendChild(modalContent)
    return mainModal
}

function GenerateHTMLContent(obj) {
    const contentContainer = document.createElement("div");
    contentContainer.id = "contentContainer"
    contentContainer.classList.add("contentContainer");
    
    //Create Header Section
    const contentHeader = document.createElement("div");
    contentHeader.id = "contentHeader";
    const headerBar1 = document.createElement("div");
    headerBar1.id = "headerBar1";
    
        const nameContainer = document.createElement("div")
        nameContainer.id = "nameContainer"
        nameContainer.innerHTML = `<h2 class="modalConnectorName">${obj.Connector.ConnectorName}</h2><h5 class="modalConnectorID">${obj.Summary.id} / ${obj.channelname}</h5>`

        const serverContainer = document.createElement("div");
        serverContainer.id = "serverContainer";
            const serverContainerDiv = document.createElement("div")
            serverContainerDiv.innerHTML = `<h3 class="modalServer">Server: ${obj.srv}</h3><a style="text-decoration: none;", href="./ConnectionView.html?connectorName=${obj.Connector.ConnectorName}", target="_blank"><span class="clickable">Zur Connection View</span></a>`;
            
            const iconContainer = document.createElement("div");
            iconContainer.style.width = "25px"
            iconContainer.style.height = "25px"
            //Differentiate between enabled and disabled connector, display an check or minus svg
            let srcImg = "./Icons/check-square-solid.svg";
            let connectorStatus = "enabled"
            let imgCol = "black"
            if(obj.Connector.enabled == "false"){
                srcImg = "./Icons/minus-square-solid.svg"
                connectorStatus = "disabled"
                imgCol = "red"
            }
            iconContainer.innerHTML = `<img style="max-width: 100%; max-height: 100%; color:${imgCol}; cursor: default;" src="${srcImg}" title="Status des Connectors ist ${connectorStatus}" alt="${obj.Connector.enabled}">`
        serverContainer.appendChild(serverContainerDiv)
        serverContainer.appendChild(iconContainer)

        headerBar1.appendChild(nameContainer);
        headerBar1.appendChild(serverContainer);
    contentHeader.appendChild(headerBar1);


    const headerBar2 = document.createElement("div");
    headerBar2.id = "headerBar2";

        const baseInfoContainer = document.createElement("div");
        baseInfoContainer.id = "baseInfoContainer";
        const ulBase = document.createElement("ul");
        ulBase.appendChild(CreateLiWithLable("Last Modified",GetDate(obj.Summary.lastModified)))
        ulBase.appendChild(CreateLiWithLable("Initial state",obj.Summary.initialState))
        ulBase.appendChild(CreateLiWithLable("Message storage mode",obj.Summary.messageStorageMode))
        ulBase.appendChild(CreateLiWithLable("Pruning in days",obj.Summary.pruneMetaDataDays))
        baseInfoContainer.appendChild(ulBase)
        headerBar2.appendChild(baseInfoContainer);

        const metaDatenContainer = document.createElement("div");
        metaDatenContainer.id = "metaDatenContainer"
        metaDatenContainer.innerHTML = `<h3>Channel Tags</h3>`
        const ulMeta = document.createElement("ul");
        if(obj.Summary.Tags.length == 0){
            ulMeta.appendChild(CreateLi("<i>Keine Channel Tags vorhanden</i>"))
        } else {
            obj.Summary.Tags.forEach(element => {
                ulMeta.appendChild(CreateLi(element))
            });
        }
        metaDatenContainer.appendChild(ulMeta)
        headerBar2.appendChild(metaDatenContainer)
    contentHeader.appendChild(headerBar2);

    //Create Info Displays
    const modalInfoDisplayContainer = document.createElement("div")
    modalInfoDisplayContainer.id = "modalInfoDisplayContainer";

        modalInfoDisplayContainer.appendChild(CreateDescription(obj.Summary.description));

    contentContainer.appendChild(contentHeader);
    contentContainer.appendChild(modalInfoDisplayContainer);
    return contentContainer;
}

function CreateNavBarBtn(label){
    const btnContainer = document.createElement("div");
    btnContainer.classList.add("modalNavbarBtn");
    btnContainer.innerHTML = `<span class="clickable">${label}</span>`;
    return btnContainer;
}

function CreateLi(string){
    const li = document.createElement("li");
    li.innerHTML = `<span>${string}</span>`
    return li;
}

function CreateLiWithLable(label, value){
    const li = document.createElement("li");
    li.innerHTML = `<span>${label}: ${value}</span>`;
    return li;
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    // console.log(event.target.id)
    if (event.target.id == "detailView") {
       HideModal();
    }
}

function HideModal(){
    $("#detailView").hide();
    $("#detailView").remove();
}

/**
 * 
 * @param {string} JSONasString 
 */
function CreateDescription(JSONasString){
    let parsedJSON;
    try { 
        parsedJSON = JSON.parse(JSONasString);
    } catch (error) {
        console.error(error);
    }
    console.log("nach der tryCatch function")
    console.log(parsedJSON)
    const BeschreibungInfo = document.createElement("div");
    BeschreibungInfo.id = "desc";
    
    if(parsedJSON != null){
    const Beschreibung = document.createElement("h3")
    Beschreibung.classList.add("descirptionHeader")
    Beschreibung.innerHTML = "Beschreibung: "+parsedJSON.Beschreibung+"<br>";

    const dokumentation = document.createElement("span")
    dokumentation.classList.add("descriptionLable")
    dokumentation.innerHTML = `Dokumentation: <a class="clickable descriptionValue" target="_blank" href='${parsedJSON.Dokumentation}'">${parsedJSON.Dokumentation}</a>`

    const creationSpan = document.createElement("span")
    creationSpan.classList.add("descriptionLable")
    creationSpan.innerHTML = `Erstellt: <span class='descriptionValue'>${parsedJSON.Erstellt}</span><br>`

    BeschreibungInfo.appendChild(Beschreibung)
    BeschreibungInfo.appendChild(creationSpan)
    BeschreibungInfo.appendChild(dokumentation)
    //Create Kontakte List
    let titleString = `<span class='descriptionLable'>Kontakte</span><br><span class='descriptionValue'>Source: ${parsedJSON.Kontakte.Source}</span><br><span class='descriptionLable'>Destinations:</span>`
    BeschreibungInfo.appendChild(CreateDivUlLiComponent(titleString,parsedJSON.Kontakte.Destinations,["descriptionValue"]))
    
    //Create Bekannte Fehler List
    titleString = "<span class='descriptionLable'>Bekannte Fehler</span>";
    BeschreibungInfo.appendChild(CreateDivUlLiComponent(titleString,parsedJSON.BekannteFehler,["descriptionValue"]))
    //Creates Bemerkungen List
    titleString = "<span class='descriptionLable'>Bemerkungen</span>";
    BeschreibungInfo.appendChild(CreateDivUlLiComponent(titleString,parsedJSON.Bemerkungen,["descriptionValue"]));
    
    } else {
        //Wenn die Beschreibung nicht als JSON kommt wird sie als plain Text mit einem Hinweis dazu angezeigt
        BeschreibungInfo.innerHTML = JSONasString + '<br><br><br><span style="color: red; font-weight: bold;">Für eine optisch bessere Darstellung muss die Beschreibung in Mirth mittels JSON erfolgen. Eine Vorlage findest du hier: <a style="text-decoration: none;" target="_blank" href="https://confluence.luks.ch/display/Mirth/Beschreibung+als+JSON" class="clickable">Zur Vorlage</a>';
        BeschreibungInfo.classList.add("articalText")
    }
    return BeschreibungInfo;
}

/**
 * Creates an li element and adds the Classnames from the Array
 * @param {string} innerHTML 
 * @param {string[]} ClassList 
 * @returns li HTML element
 */
function CreateLiElement(innerHTML, ClassList)
{
    const li = document.createElement("li")
    li.innerHTML = "- "+innerHTML;
    ClassList.forEach(el =>{
        li.classList.add(el)
    })
    return li
}

function CreateDivUlLiComponent(titel, InfoArray, ClassList){
    const div = document.createElement("div")
    div.innerHTML = titel;
    div.style.margin = "5px 0px"
    const ul = document.createElement("ul")
    InfoArray.forEach(el => {  
        ul.appendChild(CreateLiElement(el, ClassList));
    })
    div.appendChild(ul)
    return div;
}

function GetDate(milliSeconds){
    const date = new Date(Number(milliSeconds));
    return GetCorrectedDateString(date);
}

/**
 * 
 * @param {Date} Date 
 * @returns 
 */
function GetCorrectedDateString(Date){
    let day = Date.getDay();
    if(day.length != 2){
        day = "0"+day;
    }
    let month = Date.getMonth();
    if(month.length != 2){
        month = "0"+(Number(month)+1);
    }
    return `${day}.${month}.${Date.getFullYear()}`
}

const applikations = LoadJSONFrom("../app.json");
const fullAppNames = LoadJSONFrom("./RawData/AppData/apps.json");
const fullHerstellerNames = LoadJSONFrom("./RawData/AppData/hersteller.json");
const tableBody = document.getElementById("tableBody")

Object.entries(applikations.liste).forEach(([key, keyObj]) => {
    if (key.length == 12) {
        const appLongName = GetLongName(keyObj.Applikation, fullAppNames)
        const herstLongName = GetLongName(keyObj.Hersteller, fullHerstellerNames)
        let newAppObject = new MirthApplikation(keyObj, appLongName, herstLongName);
        tableBody.appendChild(AddMetaDatenToNewHTMLObject(newAppObject.GetMetaDaten(), CreateTableRow(newAppObject), "querry"))
    }
})

if (tableBody.childElementCount > 1) {
    $("#tableContainer").children().toggleClass("hidden");
}

/**
 * 
 * @param {MirthApplikation} obj 
 * @returns 
 */
function CreateTableRow(obj) {
    // console.log(obj)
    const row = document.createElement("tr");
    row.appendChild(CreateTD(`<img style=" height: 50px !important; width: fit-content !important; cursor: unset !important; " src="../AppPictures/${obj.Applikation}${obj.Hersteller}.png" alt="Kein Foto gefunden">`))
    row.appendChild(CreateTD(`${obj.applicationLong} <i>(${obj.Applikation})</i>`))
    row.appendChild(CreateTD(`${obj.HerstellerLong} <i>(${obj.Hersteller})</i>`))
    row.appendChild(CreateTD(obj.GetFullName()))
    row.appendChild(CreateTD(obj.Ort))
    row.appendChild(CreateTD(obj.PTK))
    row.appendChild(CreateTD(obj.Tags))
    row.appendChild(CreateLinkTd(obj.GetTreeMapURL()))
    return row;
}

/**
   * Gets the Fullname out of the given Array 
   * @param {string} shortName 
   * @param {Array} ArrayToSearch The Array Content is an Object which contains "shortName" and "longName"
   * @returns {stirng} returns the longName if one is found, if not it returns the shortName
   */
function GetLongName(shortName, ArrayToSearch) {
    for (let i = 0; i < ArrayToSearch.length; i++) {
        const el = ArrayToSearch[i];
        if (el.shortName === shortName) {
            return el.longName;
        }
    }
    console.error(`Shortname: "${shortName}" is not mapped in the array`)
    return shortName
}

function CreateLinkTd(treeMapUrl) {
    const td = CreateTD("LINK")
    td.innerHTML = `<a href="${treeMapUrl}" target="_blank"><img src="../AppPictures/Link.png" style="height: 60px !important; width: 60px !important"></a>`
    return td;
}






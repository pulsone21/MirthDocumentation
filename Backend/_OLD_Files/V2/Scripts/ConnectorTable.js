
var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "../allConnectors.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})();

var currentKey = null;
var currentChannelRow = null;
var currentDestinationTBody = null;
var table = $("#tableContainer").children("table");



Object.entries(json.connectors).forEach(([key, keyObj]) => {
    var ConnectorObject = new Connector(keyObj.name, keyObj.srv, keyObj.path, keyObj.tags, keyObj.file, keyObj.enabled)
    if (currentKey == null) {
        currentChannelRow = null;
        currentDestinationTBody = null;
        currentDestinationTBody = CreateNewTBody();
    }
    currentKey = key.split("-")[6];
    //looks like "[80]-[4c3c4b4d]-[5464]-[4e63]-[a5d3]-[67f273244ec0]-[1]"
    //              0       1        2      3     4         5          6
    if (currentKey > 0) {
        currentDestinationTBody.appendChild(CreateDestinationRow(ConnectorObject));

    } else if (currentKey == 0) {
        currentChannelRow = CreateChannelRow(ConnectorObject)

        if (keyObj.sc.length > 0) {
            keyObj.sc.forEach((el) => {
                currentDestinationTBody.prepend(CreateSourceRow(el, ConnectorObject));
            })
        }
        table.append(currentChannelRow)
        table.append(currentDestinationTBody)
        currentKey = null;
    }
})
$(".disabeldConnector").hide();

function ExpandAll() {
    $("tbody:visible").each(function () {
        if ($(this).children().filter(".disabeldConnector").length == 0) {
            $(this).next('.destionations').show()
        }
    })
}

function CollapseAll() {
    $(".destionations").hide();
}

function ToogleDisabledConnector(myBtn) {
    $(".disabeldConnector").toggle();
    $(myBtn).toggleClass("activeBtn")
    $(myBtn).toggleClass("showDisabledActive")
}

function ExpandChannel(clickedChannel) {
    // console.log(clickedChannel)
    $(clickedChannel).parents(".channel").next('.destionations').toggle()
}

function CreateNewTBody() {
    let tBody = document.createElement("tbody");
    tBody.classList.add("destionations")
    tBody.style.display = "none";
    return tBody;
}
/**
 * 
 * @param {Connector} obj 
 * @returns 
 */
function CreateDestinationRow(obj) {
    const row = document.createElement("tr");
    if (obj.enabled == "false") row.classList.add("disabeldConnector")

    row.appendChild(CreateTD(`<span>${obj.server}</span>`, false))
    var typeText = `<img src="./Icons/plane-arrival-solid.svg" alt="Destination"><span class="tooltiptext">Destination</span>`;
    row.appendChild(CreateTD(typeText, true, ["tooltip"]));
    row.appendChild(CreateTD(`<span class="clickable" onclick="ShowDetailView($(this).text())" >${obj.name}</span>`, true))
    row.appendChild(CreateTD(`<span>${obj.path}</span>`, true))
    row.appendChild(CreateTD(obj.CheckForDbRdr(), true))

    return AddMetaDatenToNewHTMLObject(obj.metaDatenArray, row, "querry");
}
/**
 * 
 * @param {Connector} obj 
 * @returns 
 */
function CreateSourceRow(srcName, obj) {
    const row = document.createElement("tr");
    if (obj.enabled == "false") row.classList.add("disabeldConnector")

    row.appendChild(CreateTD(`<span>${obj.server}</span>`, false))
    var typeText = `<img src="./Icons/plane-departure-solid.svg" alt="Source"><br><span class="tooltiptext">Source</span>`;
    row.appendChild(CreateTD(typeText, true, ["tooltip"]));

    row.appendChild(CreateTD(`<span class="clickable" onclick="ShowDetailView($(this).text())">${srcName}</span>`, true))
    row.appendChild(CreateTD(`<span>${obj.path}</span>`, true))
    row.appendChild(CreateTD(obj.CheckForDbRdr(), true))

    return AddMetaDatenToNewHTMLObject(obj.metaDatenArray, row, "querry");;
}
/**
 * 
 * @param {Connector} obj 
 * @returns 
 */
function CreateChannelRow(obj) {
    const tbody = document.createElement("tbody");
    tbody.classList.add("channel")

    const row = document.createElement("tr");
    if (obj.enabled == "false") row.classList.add("disabeldConnector")

    row.appendChild(CreateTD(`<span>${obj.server}</span>`, false))

    var typeText = `<img onclick="ExpandChannel($(this))" src="./Icons/link-solid.svg" alt="Channel"><span class="tooltiptext">Channel</span>`;
    row.appendChild(CreateTD(typeText, true, ["tooltip"]));

    row.appendChild(CreateTD(`<span class="clickable" onclick="ShowDetailView($(this).text())">${obj.name}</span>`, true))
    row.appendChild(CreateTD(`<span>${obj.path}</span>`, true))
    row.appendChild(CreateTD(obj.CheckForDbRdr(), true))

    tbody.appendChild(AddMetaDatenToNewHTMLObject(obj.metaDatenArray, row, "querry"));
    return tbody;
}

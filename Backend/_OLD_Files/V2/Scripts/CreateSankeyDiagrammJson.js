let connectorsToLoopOver = [];

let alreadyLoopedOver = [];
let SankeyJSON = new SankeyInformation();
let initialChannelID;
let channelCount = 0;

const allConnectors = GetConnectorDetailObject();

//ISSUE Bei ADT Channels fällt auf das nicht alle nested Links abgerast werden. BSP 16004, 16001 FwSmb -> 16002 FrSmb

/**
 * Takes an ConnectorName and builds an Sankey Diagramm JSON
 * @param {string} ConnectorName
 */
function GetSankeyJSON(ConnectorName) {
    console.log("starting SankeyJSON")
    const json = GenerateSankeyJSON(ConnectorName);
    console.debug(JSON.stringify(json, null, 4));
    return json;
}

/**
 *
 * @param {string} ConnectorName
 * @param {Object} allConnectors
 */
function GenerateSankeyJSON(ConnectorName) {
    //Creating the initial Node, given by the name
    let searchedConnectorDetails = GetConnectorDetailsByName(ConnectorName);
    SankeyJSON.nodes.push(CreateNodeObject(searchedConnectorDetails));
    LoopOverConnectorArray(searchedConnectorDetails.sc, searchedConnectorDetails);
    LoopOverConnectorArray(
        searchedConnectorDetails.dc,
        searchedConnectorDetails,
        "destination"
    );
    alreadyLoopedOver.push(searchedConnectorDetails);
    let oldChannelID = ExtractChannelId(searchedConnectorDetails.id);
    initialChannelID = oldChannelID;

    while (connectorsToLoopOver.length > 0) {
        let newObj = connectorsToLoopOver.shift();
        LoopOverConnectorArray(newObj.sc, newObj);
        LoopOverConnectorArray(newObj.dc, newObj, "destination");
        alreadyLoopedOver.push(newObj);
        let newChannelId = ExtractChannelId(newObj.id);
        if (newChannelId != oldChannelID) {
            oldChannelID = newChannelId;
            channelCount++;
        }
    }
    return SankeyJSON;
}
/**
 * Loops over the array and pushes the object to connectorsToLoopOver
 * @param {string[]} array
 * @param {Object} connector
 * @param {string} arrayType Type of the Array as String -> source or destination, Source is default
 */
function LoopOverConnectorArray(array, connector, arrayType = "source") {
    if (array.length > 0) {
        array.forEach((el) => {
            let newObj = GetConnectorDetailsById(el);
            if (!SankeyJSON.CheckIfNodeAlreadyExisit(newObj.name)) {
                // dont add the node if the node is already in the Array
                SankeyJSON.nodes.push(CreateNodeObject(newObj));
                connectorsToLoopOver.push(newObj);
                switch (arrayType) {
                    case "destination": // the element from the array is the destination so the connector is the source
                        SankeyJSON.links.push(new LinkObject(connector.name, newObj.name));
                        break;
                    default:
                        // the element from the aray is the source from the connectorName
                        SankeyJSON.links.push(new LinkObject(newObj.name, connector.name));
                        break;
                }
            }
        });
    } else {
        let newPathNode = CreatePathNode(connector.path, connector.srv, connector.enabled, connector.id);
        // dont add the node if the node is already in the Array
        if (!SankeyJSON.CheckIfNodeAlreadyExisit(newPathNode.name)) SankeyJSON.nodes.push(newPathNode);
        switch (arrayType) {
            case "destination":
                SankeyJSON.links.push(new LinkObject(connector.name, newPathNode.name));
                break;
            default:
                SankeyJSON.links.push(new LinkObject(newPathNode.name, connector.name));
                break;
        }
    }
}

function GetConnectorDetailsById(connectorId) {
    let searchedConnectorDetails;
    Object.entries(allConnectors.connectors).forEach(([key, keyObj]) => {
        if (key == connectorId) {
            searchedConnectorDetails = keyObj;
            switch (key.split("-")[6]) {
                case "0":
                    searchedConnectorDetails.type = "source";
                    break;
                default:
                    searchedConnectorDetails.type = "destination";
                    break;
            }
        }
    });
    return searchedConnectorDetails;
}

function ExtractChannelId(string) {
    let sA = string.split("-");
    let newString = `${sA[0]}-${sA[1]}-${sA[2]}-${sA[3]}-${sA[4]}-${sA[5]}`;
    return newString;
}

function GetConnectorDetailsByName(connectorName) {
    let searchedConnectorDetails;
    Object.entries(allConnectors.connectors).forEach(([key, keyObj]) => {
        if (keyObj.name == connectorName) {
            searchedConnectorDetails = keyObj;
            switch (key.split("-")[6]) {
                case "0":
                    searchedConnectorDetails.type = "source";
                    break;
                default:
                    searchedConnectorDetails.type = "destination";
                    break;
            }
        }
    });
    return searchedConnectorDetails;
}
/**
 * 
 * @param {Object} cD connectorDetails
 * @returns 
 */
function CreateNodeObject(cD) {
    console.log("creating new Node")
    console.log(cD)
    let initialDisplay = false;
    let enabled = (cD.enabled === "true");
    if (channelCount < 3) initialDisplay = true;
    if (ExtractChannelId(cD.id) == initialChannelID) initialDisplay = true;
    const newObj = new NodeObject(cD.name, cD.type, enabled, cD.srv, initialDisplay)
    console.log("NodeObject created")
    return newObj;
}

function CreatePathNode(pathString, server, status, id) {
    const newObj = {
        name: pathString,
        type: "path",
        enabled: status,
        srv: server,
        id: id,
    };
    return CreateNodeObject(newObj);
}

function GetConnectorDetailObject() {
    const connectorDetails = (function () {
        var json = null;
        $.ajax({
            async: false,
            global: false,
            url: "./ChannelData/allConnectors.json",
            dataType: "json",
            success: function (data) {
                json = data;
            },
        });
        return json;
    })();
    return connectorDetails;
}

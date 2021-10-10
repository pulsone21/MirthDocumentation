class MirthApplikation {
    constructor(obj, fullAppName, fullHerstellerName) {
        this.Applikation = obj.Applikation;
        this.Hersteller = obj.Hersteller;
        this.PTK = obj.PTK;
        this.Ort = obj.Ort;
        this.Tags = obj.Tags;
        this.applicationLong = fullAppName
        this.HerstellerLong = fullHerstellerName
    }
    GetFullName() {
        return `${this.Applikation}${this.Hersteller}_${this.PTK}_${this.Ort}`
    }
    GetTreeMapURL() {
        return `../treemap.html?app=${this.Applikation}${this.Hersteller}_${this.PTK}_${this.Ort}&direction=up`
    }
    /**
     * Returns String[] aller MetaDaten
     */
    GetMetaDaten() {
        return [this.Applikation, this.Hersteller, this.PTK, this.Ort, this.GetTagsAsString(), this.applicationLong, this.HerstellerLong]
    }
    GetTagsAsString() {
        if (this.Tags === "noch keine Tags") {
            return "";
        } else {
            let string = "";
            this.Tags.forEach(el => {
                if (string.length < 1) {
                    string = el;
                } else {
                    string += " " + el;
                }
            })
            return string;
        }
    }
}

class Connector {
    constructor(ConnectorName, server, path, tags, file, enabled) {
        this.name = ConnectorName;
        this.server = server;
        this.path = path;
        this.tags = tags;
        this.file = file;
        this.enabled = enabled;
        this.metaDatenArray = this.GenerateMetaDaten();
    }

    GetMetaDatenAsString() {
        console.log("MetaDaten Requested");
        let outstring = "";
        this.metaDatenArray.forEach((el) => {
            outString += el + " ";
        })
        return outstring;
    }

    GenerateMetaDaten() {
        let newArray = new Array();
        newArray.push(this.GetSplittedNameAsString());
        newArray.push(this.GetTagsAsString());
        newArray.push(this.server);
        newArray.push(this.path);
        newArray.push(this.file);
        console.log("MetaDaten Generated");
        return newArray;
    }

    GetSplittedNameAsString() {
        let nameArray = this.name.split("_");
        if (nameArray.length == 8) {
            let nameString = "";
            nameArray.forEach((el) => {
                nameString += el + " ";
            })
            return nameString;
        } else {
            return this.name;
        }
    }
    GetTagsAsString() {
        if (this.tags === "-") {
            return "";
        } else {
            let string = "";
            this.tags.forEach(el => {
                if (string.length < 1) {
                    string = el;
                } else {
                    string += " " + el;
                }
            })
            return string;
        }
    }
    CheckForDbRdr() {
        let type = this.name.split("_")[7];
        let outString = `<span>SQL Befehl<br>for more details look in Connector View</span>`;
        if (type != "DbRdr" && type != "DbWri") outString = `<span>${this.file}</span>`;
        return outString;
    }

}
class LinkObject {
    /**
     * @param {string} sourceName 
     * @param {string} targetName 
     */
    constructor(sourceName, targetName) {
        this.source = sourceName;
        this.target = targetName;
        this.value = 1;
    }
}

class NodeObject {
    /**
     * NodeObject for the SankeyDiagramm
     * @param {stirng} name Name of the new Node
     * @param {string} type Type of the Node "Path", "Source", "Destination"
     * @param {Boolean} status The status of the connector 
     * @param {string} server The Server of the Server
     * @param {Boolean} initialDisplay Initial Display in the Sankey Diagramm
     */
    constructor(name, type, status, server, initialDisplay) {
        this.name = name;
        this.type = type;
        this.status = status;
        this.server = server;
        this.initialDisplay = initialDisplay;
    }
}

class SankeyInformation {
    constructor() {
        this.nodes = [];
        this.links = [];
    }
    CheckIfNodeAlreadyExisit(NodeName) {
        for (let i = 0; i < this.nodes.length; i++) {
            if (this.nodes[i].name == NodeName) {
                return true;
            }
        }
        return false;
    }
}
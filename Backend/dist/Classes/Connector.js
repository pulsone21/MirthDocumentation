var ConnectorType;
(function (ConnectorType) {
    ConnectorType[ConnectorType["SOURCE"] = 0] = "SOURCE";
    ConnectorType[ConnectorType["DESTINATION"] = 1] = "DESTINATION";
})(ConnectorType || (ConnectorType = {}));
class Connector {
    constructor(connector_id, name, path, enabled, file, connectorType, description, tags) {
        this.connector_id = connector_id;
        this.name = name;
        this.path = path;
        this.enabled = enabled;
        this.file = file;
        this.connector_type = connectorType;
        this.description = description ? description : "";
        this.tags = tags ? tags : null;
        this.server = parseInt(connector_id.split("_")[0]);
        this.sources = new Array();
        this.destinations = new Array();
    }
    AddDestination(connector) {
        this.destinations.push(connector);
    }
    AddSource(connector) {
        this.sources.push(connector);
    }
    RemoveDestination(connector) {
        let tmpArray = new Array();
        this.destinations.forEach((el) => {
            if (el.connector_id != connector.connector_id) {
                tmpArray.push(el);
            }
        });
        this.destinations = tmpArray;
    }
    RemoveSource(connector) {
        let tmpArray = new Array();
        this.sources.forEach((el) => {
            if (el.connector_id != connector.connector_id) {
                tmpArray.push(el);
            }
        });
        this.sources = tmpArray;
    }
}
//# sourceMappingURL=Connector.js.map
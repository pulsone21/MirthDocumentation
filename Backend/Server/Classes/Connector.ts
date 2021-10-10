enum ConnectorType {
    SOURCE,
    DESTINATION,
}

class Connector {
    id: String;
    connector_id: String;
    name: String;
    path: String;
    server: Number;
    sources: Connector[];
    destinations: Connector[];
    enabled: Boolean;
    file: String;
    description: String;
    tags: String[] | null;
    connector_type: ConnectorType;

    constructor(
        connector_id: string,
        name: string,
        path: string,
        enabled: boolean,
        file: string,
        connectorType: ConnectorType,
        description?: string,
        tags?: [string]
    ) {
        this.connector_id = connector_id;
        this.name = name;
        this.path = path;
        this.enabled = enabled;
        this.file = file;
        this.connector_type = connectorType;
        this.description = description ? description : "";
        this.tags = tags ? tags : null;
        this.server = parseInt(connector_id.split("_")[0]);
        this.sources = new Array<Connector>();
        this.destinations = new Array<Connector>();
    }

    AddDestination(connector: Connector) {
        this.destinations.push(connector);
    }
    AddSource(connector: Connector) {
        this.sources.push(connector);
    }
    RemoveDestination(connector: Connector) {
        let tmpArray = new Array<Connector>();
        this.destinations.forEach((el) => {
            if (el.connector_id != connector.connector_id) {
                tmpArray.push(el);
            }
        });
        this.destinations = tmpArray;
    }
    RemoveSource(connector: Connector) {
        let tmpArray = new Array<Connector>();
        this.sources.forEach((el) => {
            if (el.connector_id != connector.connector_id) {
                tmpArray.push(el);
            }
        });
        this.sources = tmpArray;
    }
}

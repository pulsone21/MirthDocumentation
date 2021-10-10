if (window.location.search.length > 0) {
    const urlParams = new URLSearchParams(window.location.search);
    const connectorName = urlParams.get("connectorName");
    // try {
    CreateSankeyDiagramm(GetSankeyJSON(connectorName), ShowSankeyDiagramm);
    // } catch (e) {
    //   const errorMessage = e + "\n Please Contact JBO";
    //   console.error(errorMessage);
    // }
}

function StartSankeyProcess() {
    const connectorName = "connectorName=" + $("#cnSearch").val();
    const URL =
        "https://mirthdoku.luksintra.ch/v2/ConnectionView.html?" + connectorName;
    window.open(URL, "_self");
}

function ShowSankeyDiagramm() {
    $("#diagrammLegendContainer").show("slow", () => {
        $("#sankeySVG").css("display", "block");
        $("#searchHelpText").hide();
        $("#showEverythingBtn").css("display", "block");
        $("#hideEverythingBtn").css("display", "block");
    });
}

/**
 * 
 * @param {SankeyInformation} data 
 * @param {Function} callbackFunction 
 */
function CreateSankeyDiagramm(data, callbackFunction) {
    const callbackTime = 150;
    const margin = {
        top: 50,
        right: 30,
        bottom: 30,
        left: 30,
    };
    const variableHeight = (data.nodes.length + data.links.length) * 10;
    const minWidth = window.innerWidth - window.innerWidth * 0.015;
    const width = minWidth - margin.left - margin.right;
    const height = Math.max(500, variableHeight) - margin.top - margin.bottom;

    var svg = d3
        .select("#chart")
        .append("svg")
        .attr("id", "sankeySVG")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr(
            "style",
            "display: none; margin: auto; margin-top: 55px !important; transition: display 0.5s ease"
        );

    var sankey = d3
        .sankey()
        .nodeWidth(15)
        .nodePadding(45) //note that this will be overridden by nodePaddingRatio
        // .nodePaddingRatio(0.1)
        .size([width + margin.left + margin.right, height * 0.5])
        .nodeId((d) => d.name)
        .nodeAlign(d3.sankeyJustify)
        .iterations(32);

    var linkG = svg
        .append("g")
        .attr("id", "linkContainer")
        .attr("fill", "none")
        .attr("stroke-opacity", 0.2)
        .style("mix-blend-mode", "multiply")
        .selectAll("path");

    var nodeG = svg
        .append("g")
        .attr("id", "nodeContainer")
        .attr("stroke", "#000")
        .selectAll("g");

    var nodeTextG = svg
        .append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("id", "nodeTextContainer")
        .selectAll("g");

    //run the Sankey + circular over the data
    let sankeyData = sankey(data);
    sankeyData.nodes = NormalizeNodes(sankeyData.nodes);
    let sankeyNodes = sankeyData.nodes;

    let sankeyLinks = sankeyData.links;
    sortTargetLinks(sankeyNodes, sankeyLinks);
    sortSourceLinks(sankeyNodes, sankeyLinks, height);

    sankeyLinks = addCircularPathData(sankeyLinks, height);
    sankeyLinks.forEach((el) => (el.path = curveSankeyForceLink(el)));

    const nodes = nodeG.data(sankeyNodes).enter().append("rect");
    const nodeText = nodeTextG.data(sankeyNodes).enter().append("text");
    const link = linkG.data(sankeyLinks).enter().append("path");

    nodes
        .attr("x", (d) => d.x0)
        .attr("y", (d) => d.y0)
        .attr("height", (d) => d.y1 - d.y0)
        .attr("width", (d) => d.x1 - d.x0)
        .style("display", (d) => CheckMyInitialDisplay(d))
        .attr("fill", (d) => CalculateTheFill(d.type))
        .attr("filter", (d) =>
            !d.status ? "brightness(0.5)" : "brightness(1)"
        )
        .attr("opacity", (d) => GetNodeOpacity(d))
        .attr("cursor", "pointer")
        .on("mouseenter", (d) =>
            HighlightCurrentNodePaths(d, nodes, link, nodeText)
        )
        .on("mouseleave", (d) => SetOpacitiesToNormal(nodes, link, nodeText))
        .on("mouseup", (d) => ToogleMyLinks(d3.event, callbackTime));

    //   const nodeHoverText = ---> Not needed in the moment
    nodes.append("title").text((d) => `${d.name}`);

    nodeText
        .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
        .attr("y", (d) => (d.y0 + d.y1) * 0.5)
        .attr("dy", "0.35em")
        .attr("id", (d) => d.name)
        .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
        .style("display", (d) => (CheckIfNodeIsVisible(d.index) ? "block" : "none"))
        .attr("filter", (d) =>
            !d.status ? "brightness(0.5)" : "brightness(1)"
        )
        .attr("opacity", (d) => GetNodeOpacity(d))
        .text((d) => GetShortName(d))
        .attr("fill", (d) => (d.index === 0 ? "#20800d" : "#000000")) //highlights the searched node for the diagramm -> is the first in the nodes Array
        .attr("class", (d) =>
            d.type != "path" ? "clickable articalText" : "articalText"
        )
        .on("click", (d) => ShowDetailView(d.name));

    link
        // .attr("class", "sankey-link")
        .attr("d", (d) => d.path)
        .style("stroke-width", (d) => Math.max(1, d.width))
        .style("display", (d) => CheckPathDisplay(d))
        .style("opacity", 0.5)
        .style("stroke", (link, i) => (link.circular ? "red" : "black"));

    link.append("title").text((d) => `${d.source.name} -> ${d.target.name}`);

    var arrowsG = linkG
        .data(sankeyLinks)
        .enter()
        .append("g")
        .attr("class", "pathArrows")
        .style("display", (d) => CheckPathDisplay(d))
        .style("opacity", 0.4)
        .call(appendArrows, 20, 100, 4);

    callbackFunction();
}
//FUNKTIONEN

function CalculateTheFill(nodeType) {
    switch (nodeType) {
        case "source":
            return "#2A71B8";
        case "destination":
            return "#FFCA02";
        default:
            return "#cb2821";
    }
}

function HighlightCurrentNodePaths(d, nodes, link, nodeText) {
    let thisName = d.name;
    nodes.style("opacity", function (d) {
        return highlightNodes(d, thisName);
    });
    link.style("opacity", function (l) {
        return l.source.name == thisName || l.target.name == thisName ? 1 : 0.3;
    });
    nodeText.style("opacity", function (d) {
        return highlightNodes(d, thisName);
    });
}

function highlightNodes(node, name) {
    let opacity = 0.3;
    if (node.name == name) {
        opacity = 1;
    }
    node.sourceLinks.forEach(function (link) {
        if (link.target.name == name) {
            opacity = 1;
        }
    });
    node.targetLinks.forEach(function (link) {
        if (link.source.name == name) {
            opacity = 1;
        }
    });
    return opacity;
}

function SetOpacitiesToNormal(nodes, links, nodeTexts) {
    nodes.style("opacity", (d) => GetNodeOpacity(d));
    links.style("opacity", 0.5);
    nodeTexts.style("opacity", (d) => GetNodeOpacity(d));
}

function CheckPathDisplay(linkObject) {
    if (CheckIfBothNodesAreVisible(linkObject)) {
        return "block";
    } else {
        return "none";
    }
}

function GetNodeOpacity(node) {
    return !node.status ? 0.5 : 0.9;
}

function CheckIfBothNodesAreVisible(linkObject) {
    const nodeObjects = [linkObject.source, linkObject.target];
    let bothNodesAreVisible = true;
    // console.log("Checking link Object: ");
    // console.log(linkObject);
    nodeObjects.forEach((el) => {
        if (!CheckIfNodeIsVisible(el.index)) {
            // console.log(`${el.name} is not visible setting "bothNodesAreVisible to false`);
            bothNodesAreVisible = false;
        }
    });
    // console.log("returning :" + bothNodesAreVisible);
    return bothNodesAreVisible;
}

function CheckIfNodeIsVisible(nodeIndex) {
    // console.log($("#nodeContainer").children().children().eq(nodeIndex).css("display"));
    if ($("#nodeContainer").children().eq(nodeIndex).css("display") != "none") {
        return true;
    } else {
        return false;
    }
}

function ToogleMyLinks(event, callbackTime = 150) {
    // console.log(event)
    const nodeObject = event.target.__data__;
    switch (event.button) {
        case 0: // links click
            nodeObject.sourceLinks.forEach((el) => {
                $("#linkContainer").children().eq(el.index).show(callbackTime);
                $(".pathArrows").eq(el.index).show(callbackTime);
                $("#nodeContainer").children().eq(el.target.index).show(callbackTime);
                $("#nodeTextContainer")
                    .children()
                    .eq(el.target.index)
                    .show(callbackTime);
            });
            nodeObject.targetLinks.forEach((el) => {
                $("#linkContainer").children().eq(el.index).show(callbackTime);
                $(".pathArrows").eq(el.index).show(callbackTime);
                $("#nodeContainer").children().eq(el.source.index).show(callbackTime);
                $("#nodeTextContainer")
                    .children()
                    .eq(el.source.index)
                    .show(callbackTime);
            });
            break;
        case 2: // rechts click
            //ISSUE Es gibt einen Bug das ohne zu überprüfen einfach einen Channel geschlossen wird
            //ISSUE IDEA something like check if you want to hide an Channel then look if the channel has active out or ingoings
            //ISSUE if the Channel has active connections dont hide --- ausser der channel hat keine Verbindung mehr zum Initial Channel
            //? Wie komm ich an die Information des clicked Initial Channel
            HideNode(nodeObject);
            break;
    }
}

function CheckForHideMyNode(targetNodeObject, sourceNodeObject, callbackTime = 150) {
    const nodeObjects = [targetNodeObject, sourceNodeObject];
    //   console.log(nodeObjects);
    nodeObjects.forEach((el) => {
        if ($("#nodeContainer").children().eq(el.index).css("display") != "none") {
            if (CheckMyConnections(el) == false) {
                console.log("now i hide the node " + el.name);
                $("#nodeContainer")
                    .children()
                    .eq(el.index)
                    .hide(callbackTime, () => HideLinks(el));
                $("#nodeTextContainer").children().eq(el.index).hide(callbackTime);
            }
        }
    });
}

function CheckMyConnections(nodeObject) {
    //   console.log("Checking Connections of " + nodeObject.name);
    let linkState = false;
    console.log($("#linkContainer"));
    nodeObject.sourceLinks.forEach((el) => {
        if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
            linkState = true;
        }
    });
    nodeObject.targetLinks.forEach((el) => {
        if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
            linkState = true;
        }
    });
    //   console.log(linkState);
    return linkState;
}

/**
 * loops every source and target links and hide them
 * @param {object} nodeObject
 */
function HideLinks(nodeObject, callbackTime = 150) {
    nodeObject.sourceLinks.forEach((el) => {
        //! nodeObject is the source
        if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
            $("#linkContainer")
                .children()
                .eq(el.index)
                .hide(callbackTime, () => HideNode(el.target));
            $(".pathArrows").eq(el.index).hide(callbackTime);
        }
    });
    nodeObject.targetLinks.forEach((el) => {
        //! nodeObject is the target
        if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
            $("#linkContainer")
                .children()
                .eq(el.index)
                .hide(callbackTime, () => CheckForHideMyNode(el.target, el.source));
            $(".pathArrows").eq(el.index).hide(callbackTime);
        }
    });
}

function HideNode(nodeObject) {
    // console.log(nodeObject)
    if (nodeObject.index != 0) { //? never hide the initial Node -> verhindert dass das Diagramm verschwindet
        $("#nodeContainer")
            .children()
            .eq(nodeObject.index)
            .hide(0, () => HideLinks(nodeObject));
        $("#nodeTextContainer").children().eq(nodeObject.index).hide();
    }
}

function CheckMyInitialDisplay(nodeObject) {
    let string = "none";
    if (nodeObject.initialDisplay) {
        string = "block";
    }
    if (!nodeObject.status) {
        string = "none";
    }
    return string;
}

function GetShortName(node) {
    let name = node.name;
    if (node.name.indexOf("_") > -1) {
        let nameArray = node.name.split("_");
        if (nameArray.length == 8) {
            name = `${nameArray[0]}_${nameArray[1]}_${nameArray[6]}_${nameArray[7]}`;
        } else {
            name = node.name;
        }
        name = name.substr(0, Math.min(25, name.length));
    }
    if (name.length > 50) {
        name = "Hover over Node to get more Info";
    }
    return name;
}

function NormalizeNodes(NodesArray) {
    let newNodesArray = NodesArray;
    let topPadding = 15;
    let lowestYPosition = NodesArray[0].y0;
    NodesArray.forEach((node) => {
        if (lowestYPosition > node.y0) {
            lowestYPosition = node.y0;
        }
    });
    newNodesArray.forEach((node) => {
        node.y0 -= lowestYPosition - topPadding;
        node.y1 -= lowestYPosition - topPadding;
    });
    return NodesArray;
}
/**
 * Shows everything what is in the Diagramm
 * @param {int} callbackTime in ms
 */
function ShowEverything(callbackTime) {
    $("#linkContainer").children().show(callbackTime);
    $(".pathArrows").show(callbackTime);
    $("#nodeContainer").children().show(callbackTime);
    $("#nodeTextContainer").children().show(callbackTime)
}

/**
 * Shows everything what is in the Diagramm
 * @param {Function} callBackFunction
 */
function ResetDiagramm() {
    // console.log($("#nodeContainer").children())
    $("#linkContainer").children().hide();
    $(".pathArrows").hide();
    $("#nodeContainer").children().hide();
    $("#nodeTextContainer").children().hide()
    ShowInitialNodes();
}

function ShowInitialNodes() {
    $("#nodeContainer").children().each(function () {
        const nodeObject = this.__data__
        if (nodeObject.initialDisplay && nodeObject.status) {
            $(this).show();
            $("#nodeTextContainer").children().eq(nodeObject.index).show();
        }
    });
    $("#nodeContainer").children().each(function () {
        const nodeObject = this.__data__;
        ShowMyPaths(nodeObject)
    })
}

function ShowMyPaths(nodeObject) {
    // console.log(nodeObject)
    nodeObject.targetLinks.forEach(el => {
        let linkObj = $("#linkContainer").children().eq(el.index)[0].__data__;
        // console.log(linkObj)
        if (CheckIfBothNodesAreVisible(linkObj)) {
            console.log("both Nodes are Visible")
            $("#linkContainer").children().eq(el.index).show();
            $(".pathArrows").eq(el.index).show();
        }
    })
}

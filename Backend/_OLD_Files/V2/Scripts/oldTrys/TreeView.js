const callbackTime = 150;
let node, link, nodeText;

if (window.location.search.length > 0) {
  const urlParams = new URLSearchParams(window.location.search);
  const connectorName = urlParams.get("connectorName");
  try {
    CreateSankeyDiagramm(GetSankeyJSON(connectorName));
  } catch (e) {
    const errorMessage = e + "\n Please Contact JBO";
    console.error(errorMessage);
  }
}

function StartSankeyProcess() {
  const connectorName = "connectorName=" + $("#cnSearch").val();
  const URL =
    "https://mirthdoku.luksintra.ch/v2/ConnectionView.html?" + connectorName;
  window.open(URL, "_self");
}

function CreateSankeyDiagramm(sankeyData) {
  const margin = {
    top: 0,
    right: 0,
    bottom: 30,
    left: 0,
  };

  const variableHeight =
    (sankeyData.nodes.length + sankeyData.links.length) * 10;
  const minWidth = window.innerWidth - window.innerWidth * 0.015;
  const width = minWidth - margin.left - margin.right;
  const height = Math.max(500, variableHeight) - margin.top - margin.bottom;

  //create the base structure of the diagramm
  const sankey = d3
    .sankey()
    .nodeId((d) => d.name)
    .nodeWidth(15)
    .nodePadding(10)
    // .circularLinkGap(2)
    .size([width, height * 0.5]);

  console.log(JSON.stringify(sankeyData, null, 4));
  const sankeyObject = sankey(sankeyData);
  const nodes = sankeyObject.nodes;
  const links = sankeyObject.links;

  // Set the zoom and Pan features: how much you can zoom, on which part, and what to do when there is a zoom

  //the basis SVG which defines the field where we draw on
  const svg = d3
    .select("body")
    .append("svg")
    .attr("id", "sankeySVG")
    .attr("width", width)
    .attr("height", height * 0.5)
    .attr(
      "style",
      "display: none; margin: auto; margin-top: 55px !important; transition: display 0.5s ease"
    );

  // erstellt die Nodes
  node = svg
    .append("g")
    .attr("stroke", "#000")
    .attr("id", "nodeContainer")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("margin", "10px")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .style("display", (d) => CheckMyInitialDisplay(d))
    .attr("fill", (d) => {
      switch (d.type) {
        case "source":
          return "#2A71B8";
        case "destination":
          return "#FFCA02";
        default:
          return "#cb2821";
      }
    })
    .attr("filter", (d) =>
      d.status == "false" ? "brightness(0.5)" : "brightness(1)"
    )
    .attr("opacity", (d) => (d.status == "false" ? 0.5 : 1))
    .attr("cursor", "pointer")
    .on("mouseup", function (d) {
      ToogleMyLinks(d);
    }) // callback to toggle the Links
    .append("title")
    .text((d) => `${d.name}`);

  //ist der link zwischen den nodes, da kein Fill benötigt es den unteren path satz noch
  link = svg
    .append("g")
    .attr("id", "linkContainer")
    .attr("fill", "none")
    .attr("stroke-opacity", 0.5)
    .selectAll("g")
    .data(links)
    .join("g")
    .style("display", (d) => (CheckIfBothNodesAreVisible(d) ? "block" : "none")) //displays only if both nodes are visible
    .style("mix-blend-mode", "multiply"); //macht das die balken wenn sie übereinander verlaufen farblich unterschieden werden, kreuzungen werden sichtbar

  // Das sind die breiten verbindungsbalken zwischen den Nodes
  link
    .append("path")
    .attr("d", d3.sankeyLinkHorizontal())
    .attr("class", "hoverPath")
    .attr("stroke", "#aaa")
    .attr("stroke-width", (d) => Math.max(1, d.width));

  //toolTipps beim Hovern
  link.append("title").text((d) => `${d.source.name} → ${d.target.name}`);

  // das hier ist der Titel der einzelnen Nodes
  nodeText = svg
    .append("g")
    .attr("id", "nodeTextContainer")
    .attr("font-family", "sans-serif")
    .attr("font-size", 10)
    .selectAll("text")
    .data(nodes)
    .join("text")
    .style("display", (d) => (CheckIfNodeIsVisible(d.index) ? "block" : "none")) // displays only if the node is also visible
    .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6))
    .attr("y", (d) => (d.y0 + d.y1) * 0.5)
    .attr("dy", "0.35em")
    .attr("id", (d) => d.name)
    .attr("opacity", (d) => (d.status == "false" ? 0.5 : 1))
    .attr("class", (d) =>
      d.type != "path" ? "clickable articalText" : "articalText"
    )
    .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
    .on("click", function () {
      ShowDetailView(this.id);
    })
    .text((d) => GetShortName(d)) // if the name longer then 60 units show default text
    .attr("fill", (d) => (d.index === 0 ? "#20800d" : "#000000")); //highlights the searched node for the diagramm -> is the first in the nodes Array

  $("#diagrammLegendContainer").show("slow", () => {
    $("#sankeySVG").css("display", "block");
    $("#searchHelpText").hide();
  });
}

// function() {$("#sankeySVG").css("display", "block")}
//#region Functions---------------------------------------------------------------------------------------------------------------------

function CheckIfBothNodesAreVisible(linkObject) {
  const nodeObjects = [linkObject.source, linkObject.target];
  let bothNodesAreVisible = true;
  //   console.log("Checking link Object: ");
  //   console.log(linkObject);
  nodeObjects.forEach((el) => {
    if (!CheckIfNodeIsVisible(el.index)) {
      //   console.log(
      //     `${el.name} is not visible setting "bothNodesAreVisible to false`
      //   );
      bothNodesAreVisible = false;
    }
  });
  //   console.log("returning :" + bothNodesAreVisible);
  return bothNodesAreVisible;
}

function CheckIfNodeIsVisible(nodeIndex) {
  //   console.log($("#nodeContainer").children().eq(nodeIndex).css("display"));
  if ($("#nodeContainer").children().eq(nodeIndex).css("display") == "block") {
    return true;
  } else {
    return false;
  }
}

function ToogleMyLinks(event) {
  const nodeObject = event.target.__data__;
  switch (event.button) {
    case 0: // links click
      nodeObject.sourceLinks.forEach((el) => {
        $("#linkContainer").children().eq(el.index).show(callbackTime);
        $("#nodeContainer").children().eq(el.target.index).show(callbackTime);
        $("#nodeTextContainer")
          .children()
          .eq(el.target.index)
          .show(callbackTime);
      });
      nodeObject.targetLinks.forEach((el) => {
        $("#linkContainer").children().eq(el.index).show(callbackTime);
        $("#nodeContainer").children().eq(el.source.index).show(callbackTime);
        $("#nodeTextContainer")
          .children()
          .eq(el.source.index)
          .show(callbackTime);
      });
      break;
    case 2: // rechts click
      HideNode(nodeObject);
      break;
  }
}

function CheckForHideMyNode(targetNodeObject, sourceNodeObject) {
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
function HideLinks(nodeObject) {
  nodeObject.sourceLinks.forEach((el) => {
    //! nodeObject is the source
    if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
      $("#linkContainer")
        .children()
        .eq(el.index)
        .hide(callbackTime, () => HideNode(el.target));
    }
  });
  nodeObject.targetLinks.forEach((el) => {
    //! nodeObject is the target
    if ($("#linkContainer").children().eq(el.index).css("display") != "none") {
      $("#linkContainer")
        .children()
        .eq(el.index)
        .hide(callbackTime, () => CheckForHideMyNode(el.target, el.source));
    }
  });
}

function HideNode(nodeObject) {
  $("#nodeContainer")
    .children()
    .eq(nodeObject.index)
    .hide(0, () => HideLinks(nodeObject));
  $("#nodeTextContainer").children().eq(nodeObject.index).hide();
}

function CheckMyInitialDisplay(nodeObject) {
  let string = "none";
  if (nodeObject.initialDisplay) {
    string = "block";
  }
  if (nodeObject.status == "false") {
    string = "none";
  }

  return string;
}

function GetShortName(node) {
  console.log(node);
  let name = node.name;
  console.log("Getting ShortName of: " + node.name);

  if (node.name.indexOf("_") > -1) {
    let nameArray = node.name.split("_");
    if (nameArray.length == 8) {
      name = `${nameArray[0]}_${nameArray[1]}_${nameArray[6]}_${nameArray[7]}`;
    } else {
      name = node.name;
    }
    name = name.substr(0, Math.min(25, name.length));
  }
  console.log(node.name);
  if (name.length > 50) {
    console.log("string is longer then 50 character");
    name = "Hover over Node to get more Info";
  }
  console.log(node.name);
  return name;
}

//#endregion

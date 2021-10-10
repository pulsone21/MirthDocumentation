// Diese "Library" stellt Funktionen zur formatierung vom SankeyDiagramm zur verfügung

function sortLinkDepthAscending(link1, link2) {
  return linkDepthDistance(link1) - linkDepthDistance(link2);
}

function sortLinkSourceYAscending(link1, link2) {
  return linkSourceY(link1) - linkSourceY(link2);
}

function sortLinkSourceYDescending(link1, link2) {
  return linkSourceY(link2) - linkSourceY(link1);
}

function sortLinkTargetYAscending(link1, link2) {
  return linkTargetY(link1) - linkTargetY(link2);
}

function sortLinkTargetYDescending(link1, link2) {
  return linkTargetY(link2) - linkTargetY(link1);
}

function linkDepthDistance(link) {
  return link.source.depth - link.target.depth;
}

function linkSourceY(link) {
  //return link.y0 + (link.source.y - link.source.y0);
  return link.y0;
}

function linkTargetY(link) {
  //return link.y1 + (link.target.y - link.target.y0);
  return link.y1;
}

function createCircularPathString(link) {
  let pathString = "";
  let pathData = link.circularPathData.sourceX;

  if (link.circularLinkType == "top") {
    pathString =
      // start at the right of the source node
      "M" +
      link.circularPathData.sourceX +
      " " +
      link.circularPathData.sourceY +
      " " +
      // line right to buffer point
      "L" +
      link.circularPathData.leftInnerExtent +
      " " +
      link.circularPathData.sourceY +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.leftLargeArcRadius +
      " " +
      link.circularPathData.leftSmallArcRadius +
      " 0 0 0 " +
      //End of arc X //End of arc Y
      link.circularPathData.leftFullExtent +
      " " +
      (link.circularPathData.sourceY -
        link.circularPathData.leftSmallArcRadius) +
      " " + //End of arc X
      // line up to buffer point
      "L" +
      link.circularPathData.leftFullExtent +
      " " +
      link.circularPathData.verticalLeftInnerExtent +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.leftLargeArcRadius +
      " " +
      link.circularPathData.leftLargeArcRadius +
      " 0 0 0 " +
      //End of arc X //End of arc Y
      link.circularPathData.leftInnerExtent +
      " " +
      link.circularPathData.verticalFullExtent +
      " " + //End of arc X
      // line left to buffer point
      "L" +
      link.circularPathData.rightInnerExtent +
      " " +
      link.circularPathData.verticalFullExtent +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.rightLargeArcRadius +
      " " +
      link.circularPathData.rightLargeArcRadius +
      " 0 0 0 " +
      //End of arc X //End of arc Y
      link.circularPathData.rightFullExtent +
      " " +
      link.circularPathData.verticalRightInnerExtent +
      " " + //End of arc X
      // line down
      "L" +
      link.circularPathData.rightFullExtent +
      " " +
      (link.circularPathData.targetY -
        link.circularPathData.rightSmallArcRadius) +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.rightLargeArcRadius +
      " " +
      link.circularPathData.rightSmallArcRadius +
      " 0 0 0 " +
      //End of arc X //End of arc Y
      link.circularPathData.rightInnerExtent +
      " " +
      link.circularPathData.targetY +
      " " + //End of arc X
      //line to end
      "L" +
      link.circularPathData.targetX +
      " " +
      link.circularPathData.targetY;
  }
  //bottom path
  else {
    pathString =
      // start at the right of the source node
      "M" +
      link.circularPathData.sourceX +
      " " +
      link.circularPathData.sourceY +
      " " +
      // line right to buffer point
      "L" +
      link.circularPathData.leftInnerExtent +
      " " +
      link.circularPathData.sourceY +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.leftLargeArcRadius +
      " " +
      link.circularPathData.leftSmallArcRadius +
      " 0 0 1 " +
      //End of arc X //End of arc Y
      link.circularPathData.leftFullExtent +
      " " +
      (link.circularPathData.sourceY +
        link.circularPathData.leftSmallArcRadius) +
      " " + //End of arc X
      // line down to buffer point
      "L" +
      link.circularPathData.leftFullExtent +
      " " +
      link.circularPathData.verticalLeftInnerExtent +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.leftLargeArcRadius +
      " " +
      link.circularPathData.leftLargeArcRadius +
      " 0 0 1 " +
      //End of arc X //End of arc Y
      link.circularPathData.leftInnerExtent +
      " " +
      link.circularPathData.verticalFullExtent +
      " " + //End of arc X
      // line left to buffer point
      "L" +
      link.circularPathData.rightInnerExtent +
      " " +
      link.circularPathData.verticalFullExtent +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.rightLargeArcRadius +
      " " +
      link.circularPathData.rightLargeArcRadius +
      " 0 0 1 " +
      //End of arc X //End of arc Y
      link.circularPathData.rightFullExtent +
      " " +
      link.circularPathData.verticalRightInnerExtent +
      " " + //End of arc X
      // line up
      "L" +
      link.circularPathData.rightFullExtent +
      " " +
      (link.circularPathData.targetY +
        link.circularPathData.rightSmallArcRadius) +
      " " +
      //Arc around: Centre of arc X and  //Centre of arc Y
      "A" +
      link.circularPathData.rightLargeArcRadius +
      " " +
      link.circularPathData.rightSmallArcRadius +
      " 0 0 1 " +
      //End of arc X //End of arc Y
      link.circularPathData.rightInnerExtent +
      " " +
      link.circularPathData.targetY +
      " " + //End of arc X
      //line to end
      "L" +
      link.circularPathData.targetX +
      " " +
      link.circularPathData.targetY;
  }

  return pathString;
}

function addCircularPathData(links, height) {
  let maxLinkWidth = d3.max(links, function (link) {
    return link.width;
  });
  let minRadius = maxLinkWidth;
  let maxNodeDepth = d3.max(links, function (link) {
    return link.target.depth;
  });
  let minY = d3.min(links, function (link) {
    return link.source.y0;
  });

  let baseRadius = 10;

  let circularLinkGap = 2;

  //add the base data for each link
  links.forEach(function (link) {
    if (link.circular) {
      link.circularPathData = {};
      link.circularPathData.arcRadius = link.width + baseRadius;
      link.circularPathData.leftNodeBuffer = 10;
      link.circularPathData.rightNodeBuffer = 10;
      link.circularPathData.sourceWidth = link.source.x1 - link.source.x0;
      link.circularPathData.targetWidth = link.target.x1 - link.target.x0; //probably won't use
      link.circularPathData.sourceX =
        link.source.x0 + link.circularPathData.sourceWidth;
      link.circularPathData.targetX = link.target.x0;
      link.circularPathData.sourceY = linkSourceY(link);
      link.circularPathData.targetY = linkTargetY(link);

      //add left extent coordinates, based on links with same source depth and circularLink type
      let thisDepth = link.source.depth;
      let thisCircularLinkType = link.circularLinkType;
      let sameDepthLinks = links.filter(function (l) {
        return (
          l.source.depth == thisDepth &&
          l.circularLinkType == thisCircularLinkType
        );
      });

      if (link.circularLinkType == "bottom") {
        sameDepthLinks.sort(sortLinkSourceYDescending);
      } else {
        sameDepthLinks.sort(sortLinkSourceYAscending);
      }

      let radiusOffset = 0;
      sameDepthLinks.forEach(function (l, i) {
        if (l.circularLinkID == link.circularLinkID) {
          link.circularPathData.leftSmallArcRadius =
            baseRadius + link.width / 2 + radiusOffset;
          link.circularPathData.leftLargeArcRadius =
            baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
        }
        radiusOffset = radiusOffset + l.width;
      });

      //add right extent coordinates, based on links with same target depth and circularLink type
      thisDepth = link.target.depth;
      sameDepthLinks = links.filter(function (l) {
        return (
          l.target.depth == thisDepth &&
          l.circularLinkType == thisCircularLinkType
        );
      });
      if (link.circularLinkType == "bottom") {
        sameDepthLinks.sort(sortLinkTargetYDescending);
      } else {
        sameDepthLinks.sort(sortLinkTargetYAscending);
      }

      radiusOffset = 0;
      sameDepthLinks.forEach(function (l, i) {
        if (l.circularLinkID == link.circularLinkID) {
          link.circularPathData.rightSmallArcRadius =
            baseRadius + link.width / 2 + radiusOffset;
          link.circularPathData.rightLargeArcRadius =
            baseRadius + link.width / 2 + i * circularLinkGap + radiusOffset;
        }
        radiusOffset = radiusOffset + l.width;
      });

      //add vertical extent coordinates, based on links with same target depth and circularLink type
      sameCircularTypeLinks = links.filter(function (l) {
        return l.circularLinkType == thisCircularLinkType;
      });
      sameCircularTypeLinks.sort(sortLinkDepthAscending);

      let verticalOffset = 0;
      sameCircularTypeLinks.forEach(function (l, i) {
        if (l.circularLinkID == link.circularLinkID) {
          link.circularPathData.verticalBuffer =
            link.width / 2 + verticalOffset + i * circularLinkGap;
        }
        verticalOffset = verticalOffset + l.width;
      });

      //all links
      link.circularPathData.leftInnerExtent =
        link.circularPathData.sourceX + link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightInnerExtent =
        link.circularPathData.targetX - link.circularPathData.rightNodeBuffer;
      link.circularPathData.leftFullExtent =
        link.circularPathData.sourceX +
        link.circularPathData.leftLargeArcRadius +
        link.circularPathData.leftNodeBuffer;
      link.circularPathData.rightFullExtent =
        link.circularPathData.targetX -
        link.circularPathData.rightLargeArcRadius -
        link.circularPathData.rightNodeBuffer;

      //bottom links
      if (link.circularLinkType == "bottom") {
        link.circularPathData.verticalFullExtent =
          height + 25 + link.circularPathData.verticalBuffer;
        link.circularPathData.verticalLeftInnerExtent =
          link.circularPathData.verticalFullExtent -
          link.circularPathData.leftLargeArcRadius;
        link.circularPathData.verticalRightInnerExtent =
          link.circularPathData.verticalFullExtent -
          link.circularPathData.rightLargeArcRadius;
      }
      //top links
      else {
        link.circularPathData.verticalFullExtent =
          minY - 25 - link.circularPathData.verticalBuffer;
        link.circularPathData.verticalLeftInnerExtent =
          link.circularPathData.verticalFullExtent +
          link.circularPathData.leftLargeArcRadius;
        link.circularPathData.verticalRightInnerExtent =
          link.circularPathData.verticalFullExtent +
          link.circularPathData.rightLargeArcRadius;
      }

      link.circularPathData.path = createCircularPathString(link);
    }
  });

  return links;
}

function linkAngle(link) {
  let angle = 0;
  let opposite = link.y1 - link.y0;
  let adjacent = link.target.x0 - link.source.x1;

  angle = Math.atan(Math.abs(opposite) / Math.abs(adjacent));

  // console.log("index: " + link.index + " y1: " + link.y1 + " y0: " + link.y0 + " opp: " + opposite + " adj: " + adjacent + " angle: " + angle)

  if (opposite > 0) {
    angle = angle + Math.PI / 2;
  } else {
    angle = Math.PI / 2 - angle;
  }

  return angle;
}

function sortTargetLinks(nodes, links) {
  nodes.forEach(function (node) {
    let nodesTargetLinks = links.filter(function (l) {
      return l.target.name == node.name;
    });

    if (nodesTargetLinks.length > 1) {
      nodesTargetLinks.sort(function (link1, link2) {
        //if both are not circular, the base on the target y position
        if (!link1.circular && !link2.circular) {
          let link1Angle = linkAngle(link1);
          let link2Angle = linkAngle(link2);

          return link2Angle - link1Angle;
        }

        //if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          // console.log(link1.circularLinkID)
          return link1.circularLinkType == "top" ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          // console.log(link2.circularLinkID)
          return link2.circularLinkType == "top" ? 1 : -1;
        }

        //if both links are circular...
        if (link1.circular && link2.circular) {
          //...and they both loop the same way (both top)
          if (
            link1.circularLinkType === link2.circularLinkType &&
            link1.circularLinkType == "top"
          ) {
            //...and they both connect to a target with same depth, then sort by the target's y
            if (link1.source.depth === link2.source.depth) {
              return link1.source.y1 - link2.source.y1;
            }
            //...and they connect to different depth targets, then sort by how far back they
            else {
              return link1.source.depth - link2.source.depth;
            }
          }

          //...and they both loop the same way (both bottom)
          else if (
            link1.circularLinkType === link2.circularLinkType &&
            link1.circularLinkType == "bottom"
          ) {
            //...and they both connect to a target with same depth, then sort by the target's y
            if (link1.source.depth === link2.source.depth) {
              return link2.source.y1 - link1.source.y1;
            }
            //...and they connect to different depth targets, then sort by how far back they
            else {
              return link2.source.depth - link1.source.depth;
            }
          }

          //...and they loop around different ways, the move top up and bottom down
          else {
            return link1.circularLinkType == "top" ? -1 : 1;
          }
        }
      });
    }

    //update y1 for links
    let yTargetOffset = node.y0;

    nodesTargetLinks.forEach(function (link) {
      // console.log(link.circularLinkID)
      link.y1 = yTargetOffset + link.width / 2;
      yTargetOffset = yTargetOffset + link.width;
    });
  });
}

function sortSourceLinks(nodes, links, height) {
  nodes.forEach(function (node) {
    //move any nodes up which are off the bottom
    if (node.y + (node.y1 - node.y0) > height) {
      // console.log("adjusted y for node " + node.name)
      node.y = node.y - (node.y + (node.y1 - node.y0) - height);
    }
    let nodesSourceLinks = links.filter(function (l) {
      return l.source.name == node.name;
    });
    //if more than 1 link then sort
    if (nodesSourceLinks.length > 1) {
      nodesSourceLinks.sort(function (link1, link2) {
        //if both are not circular...
        if (!link1.circular && !link2.circular) {
          // console.log("---------------------------------------------------------")
          let link1Angle = linkAngle(link1);
          let link2Angle = linkAngle(link2);
          // console.log("node: " + node.name + " link1 " + link1.index + " link1 A " + link1Angle + " link2 " + link2.index + " link2 A " + link2Angle)
          // console.log("---------------------------------------------------------")
          return link1Angle - link2Angle;
          //return link2Angle - link1Angle
        }
        //if only one is circular, the move top links up, or bottom links down
        if (link1.circular && !link2.circular) {
          // console.log(link1.circularLinkID)
          return link1.circularLinkType == "top" ? -1 : 1;
        } else if (link2.circular && !link1.circular) {
          // console.log(link2.circularLinkID)
          return link2.circularLinkType == "top" ? 1 : -1;
        }

        //if both links are circular...
        if (link1.circular && link2.circular) {
          //...and they both loop the same way (both top)
          if (
            link1.circularLinkType === link2.circularLinkType &&
            link1.circularLinkType == "top"
          ) {
            //...and they both connect to a target with same depth, then sort by the target's y
            if (link1.target.depth === link2.target.depth) {
              return link1.target.y1 - link2.target.y1;
            }
            //...and they connect to different depth targets, then sort by how far back they
            else {
              return link1.target.depth - link2.target.depth;
            }
          }

          //...and they both loop the same way (both bottom)
          else if (
            link1.circularLinkType === link2.circularLinkType &&
            link1.circularLinkType == "bottom"
          ) {
            //...and they both connect to a target with same depth, then sort by the target's y
            if (link1.target.depth === link2.target.depth) {
              return link2.target.y1 - link1.target.y1;
            }
            //...and they connect to different depth targets, then sort by how far back they
            else {
              return link1.target.depth - link2.target.depth;
            }
          }
          //...and they loop around different ways, the move top up and bottom down
          else {
            return link1.circularLinkType == "top" ? -1 : 1;
          }
        }
      });
    }
    //update y0 for links
    let ySourceOffset = node.y0;
    // console.log(nodesSourceLinks)
    nodesSourceLinks.forEach(function (link) {
      link.y0 = ySourceOffset + link.width / 2;
      ySourceOffset = ySourceOffset + link.width;
    });
  });
}

function curveSankeyForceLink(link) {
  let path = "";
  if (link.circular) {
    //path = computeCircleForcePath(d)
    path = link.circularPathData.path;
  } else {
    var normalPath = d3
      .linkHorizontal()
      .source(function (d) {
        let x = d.source.x0 + (d.source.x1 - d.source.x0);
        let y = d.y0; // + (d.source.y - d.source.y0);
        return [x, y];
      })
      .target(function (d) {
        let x = d.target.x0;
        let y = d.y1; // + (d.target.y - d.target.y0);
        return [x, y];
      });
    path = normalPath(link);
  }
  return path;
}

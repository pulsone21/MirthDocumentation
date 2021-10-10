const pathNames = window.location.pathname.split("/");

$("header").load("./htmlTemplates/header.html", () => $("#timeStamp").text(UpdateTimeStamp()));
$("nav").load("./htmlTemplates/navBar.html", () =>
  CalculateActiveBtn(pathNames[2])
);

function CalculateActiveBtn(pathName) {
  switch (pathName) {
    case "Index.html":
      console.log("found Index setting ActiveBtn");
      console.log($("nav").children());
      $("nav").children().eq(0).toggleClass("activeBtn");
      break;
    case "ApplicationTable.html":
      $("#ApplicationBtn").toggleClass("activeBtn");
      break;
    case "ChannelNameBuilder.html":
      $("#ChannelNameBtn").toggleClass("activeBtn");
      break;
    case "ConnectionView.html":
      $("#ConnectionViewBtn").toggleClass("activeBtn");
      break;
    case "ConnectorTable.html":
      $("#ConnectorBtn").toggleClass("activeBtn");
      break;
    case "DependencyWheel.html":
      $("#DependencyBtn").toggleClass("activeBtn");
      break;
    case "DescriptionBuilder.html":
      $("#DescriptionBuilderBtn").toggleClass("activeBtn");
      break;
    default:
      console.error(
        "CurrentPage is not Defined, can not set the Active Button on NavBar"
      );
      break;
  }
}
function UpdateTimeStamp() {
  let rawTimestamp;
  var timeStamp = "Could not get Timestamp.";
  $.ajax({
    async: false,
    global: false,
    url: "../allConnectors.json",
    dataType: "json",
    success: function (data, textStatus, request) {
      rawTimestamp = new Date(request.getResponseHeader("Last-Modified"));
      timeStamp = `Stand: ${rawTimestamp.toDateString()} ${rawTimestamp.toLocaleTimeString()}`;
    },
  });
  return timeStamp;
}

/**
 * 
 * @param {string} tableType Which table we are searching Application/Connector
 */
function SearchTable(tableType) {
    var inputSearch00, inputSearch01, inputSearch02, inputSearch03, inputSearch04, inputSearch05, inputSearch06;

    inputSearch00 = $("#inputSearch00").val() ? $("#inputSearch00").val() : null;
    inputSearch01 = $("#inputSearch01").val() ? $("#inputSearch01").val() : null;
    inputSearch02 = $("#inputSearch02").val() ? $("#inputSearch02").val() : null;
    inputSearch03 = $("#inputSearch03").val() ? $("#inputSearch03").val() : null;
    inputSearch04 = $("#inputSearch04").val() ? $("#inputSearch04").val() : null;
    inputSearch05 = $("#inputSearch05").val() ? $("#inputSearch05").val() : null;
    inputSearch06 = $("#inputSearch06").val() ? $("#inputSearch06").val() : null;
    console.log(inputSearch00)
    console.log(inputSearch01)
    console.log(inputSearch02)
    console.log(inputSearch03)
    console.log(inputSearch04)
    console.log(inputSearch05)
    console.log(inputSearch06)
    if (tableType === "CONNECTORTABLE") $("tbody").hide();
    $("tbody").each(function () {
        $(this).children().each(function () {
            if (tableType === "APPLIKATIONTABLE") $(this).hide()
            //<tr> ebene 
            let showMe01 = true;
            let showMe02 = true;
            let showMe03 = true;
            let showMe04 = true;
            let showMe05 = true;
            let showMe06 = true;
            $(this).children().each(function (index) {
                //<td> ebene
                switch (index) {
                    case 0:
                        //Server - Connector Table
                        //Bild - Applikation Table
                        if (inputSearch00 != null) {
                            showMe01 = ($(this).text().toUpperCase().indexOf(inputSearch00.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 1:
                        //Type - do nothing - Connector Table
                        //Applikation Name - Applikation Table
                        if (inputSearch01 != null) {
                            showMe01 = ($(this).text().toUpperCase().indexOf(inputSearch01.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 2:
                        //Connector Name - Connector Table
                        //Hersteller Name - Applikation Table
                        if (inputSearch02 != null) {
                            showMe02 = ($(this).text().toUpperCase().indexOf(inputSearch02.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 3:
                        //Pfad - Connector Table
                        //Ort - Applikation Table
                        if (inputSearch03 != null) {
                            showMe03 = ($(this).text().toUpperCase().indexOf(inputSearch03.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 4:
                        // File - do nothing - Connector Table
                        //PTK - Applikation Table
                        if (inputSearch04 != null) {
                            showMe04 = ($(this).text().toUpperCase().indexOf(inputSearch04.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 5:
                        //! NOTHING - Connector Table
                        //Tags - Applikation Table
                        if (inputSearch05 != null) {
                            showMe05 = ($(this).text().toUpperCase().indexOf(inputSearch05.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    case 6:
                        //! NOTHING - Connector Table
                        //Link Applikation Table
                        if (inputSearch06 != null) {
                            showMe06 = ($(this).text().toUpperCase().indexOf(inputSearch06.toUpperCase()) < 0) ? false : true;
                        }
                        break;
                    default:
                        console.error("Index is not Mapped in SearchTable function")
                        break;
                }
            })
            if (showMe01 && showMe02 && showMe03 && showMe04 && showMe05 && showMe06) {
                // //Checking which Table we have Open, if its the Application Table 
                // let pathName = window.location.pathname.split("/")[2]
                // pathName = pathName.split(".")[0];
                // console.log(pathName)
                if (tableType) {
                    switch (tableType.toUpperCase()) {
                        case "CONNECTORTABLE":
                            if ($(this).parent().hasClass("channel")) { //Wenn this ein Channel ist, dann zeige ihn 
                                $(this).parent().show()
                            } else { //Wenn dies kein Channel ist suche den vohrigien Channel tBody und zeige diesem. (should be previous tBody)
                                $(this).parent().prev().show()
                            }
                            break;
                        case "APPLIKATIONTABLE":
                            console.log($(this))
                            $(this).show();
                            break;
                        default:
                            console.error(`Table "${tableType}" not defined!`)
                            break;
                    }
                } else {
                    console.error(`TableType in Function Call not defined`)
                    return null;
                }
                // if(window.URL.name)
            }
        })
    })
}

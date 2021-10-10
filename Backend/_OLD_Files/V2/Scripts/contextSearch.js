/**
 * 
 * @param {KeyboardEvent} event
 */
function ContextSearch(event) {
    if (event.key == "Enter") {
        $("#contextSearchParent").children("span").attr('data-after', '')
        const input = $("#contextSearch").val() ? $("#contextSearch").val() : null;
        if (input != null) {
            $("#contextSearch").blur();
            const querry = input.split(" ");
            StartQuerySearch(querry)
        } else {
            $("#tableBody").children().show();
        }
    }
}

/**
 * 
 * @param {string[]} querry 
 */
function StartQuerySearch(querry) {
    let trToShow = [];
    const DOMObjs = $("[data-querry]");
    DOMObjs.each(function () {
        console.log($(this).data("querry"));
        const currDomObj = $(this)
        const myQuerryStrings = $(this).data("querry").toUpperCase().split(" ")
        querry.forEach(el => {
            const qString = el.toUpperCase();
            myQuerryStrings.forEach(ele => {
                // console.log(`tr Data: ${ele}, querryData: ${qString}, ${ele.indexOf(qString)}`)
                if (ele.indexOf(qString) > -1) {
                    trToShow.push(currDomObj);
                }
            })
        });
    })
    console.log(trToShow)
    if (trToShow.length > 0) {
        $("#tableBody").children().hide()
        trToShow.forEach(el => {
            el.show()
        })
    } else {
        // console.log($("#contextSearchParent").children("span")[0])
        $("#contextSearchParent").children("span").attr('data-after', 'No matches found')
        $("#contextSearchParent").children("span").css('color', 'red')
        $("#contextSearchParent").children("span").css('text-shadow', '0px 0px 1px black')
    }
}



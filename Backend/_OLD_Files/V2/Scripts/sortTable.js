/*
Man soll auf den Table Header Klicken können und dann wird dieser nach Alphabetischer Reihenfolge geändert.
toogle zu Aufsteigend Absteigend,
Color Coding wird angepasst vorerst nur auf der Applikation Seite
*/
let dir = 1;
$(document).ready(function () {
    $(".sortableHeader").on("click", function () {
        sortTable($(this).index(), dir = 1 - dir);
    })
});

function sortTable(col, reverse) {
    const tb = $("#tableBody")[0]; // use `<tbody>` to ignore `<thead>` and `<tfoot>` rows
    let tr = Array.prototype.slice.call(tb.rows, 0); // put rows into array
    let i;
    reverse = -((+reverse) || -1);
    tr = tr.sort(function (a, b) { // sort rows
        // `-1 *` if want opposite order
        return reverse * (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
        // return (a.cells[col].textContent.trim().localeCompare(b.cells[col].textContent.trim()));
    });
    for (i = 0; i < tr.length; ++i) tb.appendChild(tr[i]); // append each row in order
    AddArrowToTH(col);
}

function AddArrowToTH(index) {
    const thead = $("#tableBody").prev();
    console.log(thead)
    const theadRow = thead.children();
    theadRow.children().attr("data-before", "")
    if (dir === 0) {
        console.log(theadRow.children().eq(index))
        theadRow.children().eq(index).attr("data-before", "🡅 ")
    } else {
        theadRow.children().eq(index).attr("data-before", "🡇 ")
    }
}
// 🡅 &#129093
// 🡇 &#129095

/**
 * Loads a json format from a specificed directory and name
 * @param {string} url relative Path from the project e.g. "../allConnectors.json"
 * @param {Function} CallbackFunction A function that should get triggert if the JSON is loaded
 * @returns a JSON which loaded the specific Data from the directory
 */
function LoadJSONFrom(url, CallbackFunction) {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': url,
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
}
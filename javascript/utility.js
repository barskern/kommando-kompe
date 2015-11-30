/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

/**
 * En funksjon som leser innholdet i en fil på den spesifiserte filBanen, og når filen er lest blir tilbakekallet kalt.
 * @param filBane banen til filen med base i hovedmappen
 * @param tilbakekall funksjonen som blir kalt når innholdet i filen er lest
 */
function lesFil(filBane, tilbakekall) {
    var xobj = new XMLHttpRequest();
    xobj.open('GET', "../"+filBane, true);
    xobj.onreadystatechange = function() {
        if(xobj.readyState == 4 && xobj.status == "200"){
            tilbakekall(xobj.responseText);
        }
    };
    xobj.send(null);

}

/**
 * Liten klasse som lager et canvas vindu med spesifisert informasjon. Returnerer dette vinduet, uten at det er lagt til DOM
 * @param id
 * @param width
 * @param height
 * @returns {Element}
 * @constructor
 */
function Canvas(id,width,height){
    var canvas = document.createElement('canvas');
    canvas.id = id;
    canvas.width = width;
    canvas.height = height;
    return canvas;
}
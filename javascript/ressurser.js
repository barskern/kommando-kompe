/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

/**
 * Et enkelt verktøy for a laste bilder og lagre de i cache.
 */
(function(){
    var ressurser = {}, tilbakekall = [];

    /**
     * Tar enten en bane eller array med baner og laster den/dem.
     * @param baneEllerArray
     */
    function last(baneEllerArray){
        if(baneEllerArray instanceof  Array){
            baneEllerArray.forEach(function(bane){
               _last(bane);
            });
        } else {
            _last(baneEllerArray);
        }
    }

    /**
     * Laster bildet og lagrer det i ressurser objektet.
     * @param bane banen til bildet
     * @returns verdien av bildet hvis det allerede er lastet
     */
    function _last(bane){
        if(ressurser[bane]){
            return ressurser[bane];
        } else {
            var bilde = new Image();
            bilde.onload = function(){
                ressurser[bane] = bilde;

                if(ressurserLastet()){
                    tilbakekall.forEach(function(tk){
                        tk();
                    });
                }
            };
            ressurser[bane] = false;
            bilde.src = "../"+bane;
        }
    }

    /**
     * Henter et bilde fra ressurs arrayen
     * @param bane banen til bildet
     * @returns bilde
     */
    function hent(bane){
        return ressurser[bane];
    }

    /**
     * Sjekker om alle bildene er lastet.
     * @returns  true hvis alle bildene er lastet
     */
    function ressurserLastet(){
        var klar = true;
        for(var r in ressurser){
            if(ressurser.hasOwnProperty(r) && !ressurser[r]){
                klar = false;
            }
        }
        return klar;
    }

    /**
     * Legger til en funksjon som skal kalles nar ressursene er
     * ferdig lastet.
     * @param tk en funksjon som blir kalt nar ressursene er lastet
     */
    function narKlar(tk){
        tilbakekall.push(tk);
    }

    window.Ressurser = {
        last: last,
        hent: hent,
        narKlar: narKlar,
        ressurserLastet: ressurserLastet
    };

})();
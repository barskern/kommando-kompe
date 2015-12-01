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
    var bildeRessurser = {}, tilbakekall = [];

    /**
     * Tar enten en bane eller array med baner og laster den/dem.
     * @param baneEllerArray
     */
    function lastBilder(baneEllerArray){
        if(baneEllerArray instanceof Array){
            baneEllerArray.forEach(function(bane){
                if(!hentBilde(bane))
                    _lastBilde(bane);
            });
        } else {
            if(!hentBilde(baneEllerArray))
                _lastBilde(baneEllerArray);
        }
    }

    /**
     * Laster bildet og lagrer det i bildeRessurser objektet.
     * @param bane banen til bildet
     * @returns verdien av bildet hvis det allerede er lastet
     */
    function _lastBilde(bane){
        var bilde = new Image();
        bilde.onload = function(){
            bildeRessurser[bane] = bilde;

            if(ressurserLastet()){
                tilbakekall.forEach(function(tk){
                    tk();
                });
            }
        };
        bildeRessurser[bane] = false;
        bilde.src = "bilder/"+bane;
    }

    /**
     * Henter et bilde fra ressurs arrayen
     * @param bane banen til bildet
     * @returns bilde
     */
    function hentBilde(bane){
        return bildeRessurser[bane];
    }

    /**
     * Sjekker om alle bildene er lastet.
     * @returns  true hvis alle bildene er lastet
     */
    function ressurserLastet(){
        var klar = true;
        for(var b in bildeRessurser){
            if(bildeRessurser.hasOwnProperty(b) && !bildeRessurser[b]){
                klar = false;
                break;
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
        lastBilder: lastBilder,
        hentBilde: hentBilde,
        narKlar: narKlar,
        ressurserLastet: ressurserLastet
    };

})();
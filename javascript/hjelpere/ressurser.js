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
    var laster = {}, tilbakekall = [];

    var bildeHåndterer = {
        /**
         * Alle bildene som er lastet inn i spillet er linket med banen sin i lastet-listen.
         */
        lastet: {},
        /**
         * Hvert bilden som er et atlas kan hentes her med informasjon om atlaset. Håndterer atlasene.
         */
        atlas: {
            XMLer: {},
            last:function(bane){
                var sisteIndeksPunktum = bane.lastIndexOf('.');
                console.log();
                filHåndterer.lastXML("bilder/atlas/"+bane.slice(0,bane.lastIndexOf('.')) + ".xml");
                bildeHåndterer._last("atlas/"+bane);
            },
            hent: function(bane, bildeNavn){
                var XMLDoku = bildeHåndterer.atlas.XMLer[bane];
                return XMLDoku.getElementsByTagName('Kart')[0].getElementById(bildeNavn);
            }
        },
        /**
         * Tar enten en bane eller array med baner og laster den/dem.
         * @param baneEllerListe en bane eller en listen med baner
         */
        last: function(baneEllerListe){
            if(baneEllerListe instanceof Array){
                baneEllerListe.forEach(function(bane){
                    if(!bildeHåndterer.hent(bane))
                        bildeHåndterer._last(bane);
                });
            } else {
                if(!bildeHåndterer.hent(baneEllerListe))
                    bildeHåndterer._last(baneEllerListe);
            }
        },
        /**
         * Laster bildet og lagrer det i bildelastet objektet.
         * @param bane banen til bildet
         * @returns verdien av bildet hvis det allerede er lastet
         */
        _last: function(bane){
            var bilde = new Image();
            bilde.onload = function(){
                bildeHåndterer.lastet[bane] = bilde;

                if(ressurserLastet()){
                    tilbakekall.forEach(function(tk){
                        tk();
                    });
                }
            };
            bildeHåndterer.lastet[bane] = false;
            bilde.src = "bilder/"+bane;
        },
        /**
         * Henter et bildeHåndterer fra ressurs arrayen
         * @param bane banen til bildet
         * @returns bildeHåndterer
         */
        hent: function(bane){
            return bildeHåndterer.lastet[bane];
        }
    };

    var filHåndterer = {
        lastXML: function(bane){
            console.log(bane);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(xhttp.readyState == 4){

                }
            };

        },
        hentXML: function(){

        }
    };

    /**
     * Sjekker om alle bildene er lastet.
     * @returns  true hvis alle bildene er lastet
     */
    function ressurserLastet(){
        var klar = true;
        for(var b in bildeHåndterer.lastet){
            if(bildeHåndterer.lastet.hasOwnProperty(b) && !bildeHåndterer.lastet[b]){
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
    function nårRessurserKlare(tk){
        tilbakekall.push(tk);
    }

    window.Ressurser = {
        bildeHåndterer: {
            last: bildeHåndterer.last,
            hent: bildeHåndterer.hent,
            atlas: {
                last: bildeHåndterer.atlas.last,
                hent: bildeHåndterer.atlas.hent
            }
        },
        filHåndterer: {
            last: filHåndterer.lastXML,
            hent: filHåndterer.hentXML
        },
        nårRessurserKlare: nårRessurserKlare,
        ressurserLastet: ressurserLastet
    };

})();
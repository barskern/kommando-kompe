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
    window.tilbakekall = { onresize: [] };

    var nårFilerKlareTilbakekall = [];

    var bildeHåndterer = {
        /**
         * Alle bildene som er lastet inn i spillet er linket med banen sin i lastet-listen.
         */
        lastet: {},
        /**
         * Hvert bilden som er et atlas kan hentes her med informasjon om atlaset. Håndterer atlasene.
         */
        atlas: {
            last:function(navn){
                filHåndterer._last("bilder/atlas/"+navn+".json", filHåndterer.JSONer);
                bildeHåndterer._last("atlas/"+navn+".png");
            },
            hentJSON: function(navn){
                return filHåndterer.hent("bilder/atlas/"+navn+".json", filHåndterer.JSONer);
            },
            hentBilde: function(navn){
                return bildeHåndterer.hent("atlas/"+navn+".png");
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
                sjekkOmAlleLastetOgGjørTilbakekall();
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
        filer: {},
        XMLer: {},
        JSONer: {},
        lyder: {},
        _lastXML: function(bane){
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(xhttp.readyState === 4 && xhttp.status === 200) {
                    filHåndterer.XMLer[bane] = xhttp.responseXML;
                    sjekkOmAlleLastetOgGjørTilbakekall();
                }
            };
            filHåndterer.XMLer[bane] = false;
            xhttp.open('GET', bane, true);
            xhttp.send();
        },
        _lastLyd: function(bane){
            var request = new XMLHttpRequest();
            request.open('GET', bane, true);
            request.responseType = 'arraybuffer';

            request.onload = function() {
                lydctx.decodeAudioData(request.response, function(buffer){
                    filHåndterer.lyder[bane] = buffer;
                    sjekkOmAlleLastetOgGjørTilbakekall();
                });
            };
            filHåndterer.lyder[bane] = false;
            request.send();
        },
        _last: function(bane,lagringsobjekt){
            lagringsobjekt = (!lagringsobjekt ? filHåndterer.filer : lagringsobjekt);
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function(){
                if(xhttp.readyState === 4 && xhttp.status === 200){
                    lagringsobjekt[bane] = xhttp.responseText;
                    sjekkOmAlleLastetOgGjørTilbakekall();
                }
            };
            lagringsobjekt[bane] = false;
            xhttp.open('GET', bane, true);
            xhttp.send();
        },
        hentLyd: function(bane){
            return filHåndterer.hent(bane,filHåndterer.lyder);
        },
        hent: function(bane, lagringsobjekt){
            lagringsobjekt = (!lagringsobjekt ? filHåndterer.filer : lagringsobjekt);
            return lagringsobjekt[bane];
        }
    };
    function sjekkOmAlleLastetOgGjørTilbakekall(){
        if(ressurserLastet()) {
            nårFilerKlareTilbakekall.forEach(function (tk) {
                tk();
            });
        }
    }

    /**
     * Sjekker om alle filene er lastet.
     * @returns  true hvis alle filene er lastet
     */
    function ressurserLastet(){
        var klar = true;
        var lister = [bildeHåndterer.lastet, filHåndterer.JSONer, filHåndterer.lyder];
        var nøkkelLister = (function(){
            var resultat = [], i = 0;
            lister.forEach(function(liste){
                if(liste){
                    resultat[i] = Object.keys(liste);
                    i++;
                }
            });
            return resultat;
        })();

        for(var i = 0; i < nøkkelLister.length; i++){
            for(var j = 0; j < nøkkelLister[i].length; j++){
                if(!lister[i][nøkkelLister[i][j]]){
                    klar = false;
                    break;
                }
            }

        }
        return klar;
    }

    /**
     * Legger til en funksjon som skal kalles nar ressursene er
     * ferdig lastet.
     * @param tk en funksjon som blir kalt nar ressursene er lastet
     */
    function nårRessurserKlareKall(tk){
        nårFilerKlareTilbakekall.push(tk);
    }

    window.Ressurser = {
        bildeHåndterer: {
            last: bildeHåndterer.last,
            hent: bildeHåndterer.hent,
            atlas: {
                last: bildeHåndterer.atlas.last,
                hentJSON: bildeHåndterer.atlas.hentJSON,
                hentBilde: bildeHåndterer.atlas.hentBilde
            }
        },
        filHåndterer: {
            last: {
                lyd: filHåndterer._lastLyd,
                fil: filHåndterer._last
            },
            hent: {
                fil:filHåndterer.hent,
                lyd:filHåndterer.hentLyd
            }
        },
        nårRessurserKlareKall: nårRessurserKlareKall,
        ressurserLastet: ressurserLastet,
        sjekkOmAlleLastetOgGjørTilbakekall: sjekkOmAlleLastetOgGjørTilbakekall
    };
})();
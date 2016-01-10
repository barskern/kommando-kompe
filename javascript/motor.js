/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var KommandoKompe = function(){

    var StatusHåndterer = {
        nåværendeStatus: undefined,
        typer: (function(){
            function Egenskaper(funksjonForNyttStatusObjekt){
                this.funksjonForNyttStatusObjekt = funksjonForNyttStatusObjekt;
                this.statusObjekt = undefined;
            }
            return {
                SPILL: new Egenskaper(function(statusArgs){ return new Spill(statusArgs[0],statusArgs[1]); }),
                HOVEDMENY: new Egenskaper(function(statusArgs){ return new Hovedmeny(); })
            };
        })(),
        byttStatus: function(status, statusArgs){
            if(requestID) window.cancelAnimationFrame(requestID); //Funker selv om det viser en error
            status.statusObjekt = status.funksjonForNyttStatusObjekt(statusArgs);
            StatusHåndterer.nåværendeStatus = status;
            if(Ressurser.ressurserLastet()){
                Ressurser.sjekkOmAlleLastetOgGjørTilbakekall();
                init();
            }
        },
        init: function(){
            StatusHåndterer.nåværendeStatus.statusObjekt.init();
        },
        oppdater: function(){
            StatusHåndterer.nåværendeStatus.statusObjekt.oppdater();
        },
        tegn: function(){
            StatusHåndterer.nåværendeStatus.statusObjekt.tegn();
        }
    };


    var doku = window.document,
        canvas = doku.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        klokke = {
            nå: 0,
            sisteTid: 0,
            tidsganger: 1,
            delta: 0, //sekunder
            oppdater: function (){
                this.nå = Date.now();
                this.delta = ((this.nå - this.sisteTid) / 1000.0) * this.tidsganger;
                this.sisteTid = this.nå;
            }
        },
        tilbakekall = window.tilbakekall,
        inngangsdata = new Inngangsdata(),
        requestID;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.onresize = function(e){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        tilbakekall.onresize.forEach(function(tk){
            tk();
        });
    };

    StatusHåndterer.byttStatus(StatusHåndterer.typer.HOVEDMENY);
    Ressurser.nårKlareKall(init);

    function main(){
        klokke.oppdater();
        inngangsdata.oppdater();
        StatusHåndterer.oppdater();
        StatusHåndterer.tegn();
        requestID = requestAnimationFrame(main);
    }

    function init(){
        doku.body.appendChild(canvas);
        klokke.sisteTid = Date.now();
        StatusHåndterer.init();
        inngangsdata.håndtererMuseKlikkPåCanvas();
        main();
    }

    window.ctx = ctx;
    window.klokke = klokke;
    window.inngangsdata = inngangsdata;
    window.StatusHåndterer = StatusHåndterer;
};

addEventListener("DOMContentLoaded",function(){
    KommandoKompe();
});
/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var motor = (function(){

    var doku = window.document,
        canvas = doku.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        spill = new Spill(),
        klokke = {
            nå: 0,
            sisteTid: 0,
            delta: 0, //sekunder
            oppdater: function (){
                this.nå = Date.now();
                this.delta = (this.nå - this.sisteTid) / 1000.0;
                this.sisteTid = this.nå;
            }
        },
        tilbakekall = window.tilbakekall;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.onresize = function(e){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        tilbakekall.onresize.forEach(function(tk){
            tk();
        });
    };

    function main(){
        klokke.oppdater();
        spill.oppdater();
        spill.tegn();
        requestAnimationFrame(main);
    }

    function init(){
        doku.body.appendChild(canvas);
        klokke.sisteTid = Date.now();
        spill.init();
        main();
    }

    Ressurser.nårKlareKall(init);

    window.ctx = ctx;
    window.klokke = klokke;
})();
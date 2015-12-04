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
        clock = {
            nå: 0,
            sisteTid: 0,
            delta: 0, //sekunder
            oppdater: function (){
                this.nå = Date.now();
                this.delta = (this.nå - this.sisteTid) / 1000.0;
                this.sisteTid = this.nå;
            }
        };

    canvas.width = 600;
    canvas.height = 400;

    function main(){
        clock.oppdater();

        spill.oppdater();
        ctx.clearRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,canvas.width,canvas.height);
        spill.tegn();

        requestAnimationFrame(main);
    }

    function init(){
        doku.body.appendChild(canvas);
        clock.sisteTid = Date.now();
        main();
    }

    Ressurser.narKlar(init);

    window.ctx = ctx;
    window.clock = clock;
})();
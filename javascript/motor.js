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
        sisteTid;

    canvas.width = 600;
    canvas.height = 400;

    function main(){
        var na = Date.now(),
            delta = (na - sisteTid) / 1000.0;

        spill.oppdater(delta);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        spill.tegn();

        sisteTid = na;
        window.requestAnimationFrame(main);
    }

    function init(){
        doku.body.appendChild(canvas);
        sisteTid = Date.now();
        main();
    }

    Ressurser.lastBilder(["char-boy.png","KKbackground.jpg"]);

    Ressurser.narKlar(init);

    window.ctx = ctx;
})();
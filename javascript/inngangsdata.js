/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Inngangsdata() {
    var sjekkTaster = false, tasterNede = {}, tasterTilbakekall = {};

    this.tastatur = {
        keydown:  {},
        keyup: {}
    };
    this.håndtererTrykk = function(e){
        var tilbakekall = this.tastatur[e.type][e.keyCode];
        if(tilbakekall){
            sjekkTaster = true;
            tasterNede[e.keyCode] = true;
            tasterTilbakekall[e.keyCode] = tilbakekall;
        } else if(!tilbakekall && e.type === "keyup"){
            tasterNede[e.keyCode] = false;
            sjekkTaster = false;
            Object.keys(tasterNede).forEach(function(tasteKode) {
                if(tasterNede[tasteKode]){
                    sjekkTaster = true;
                }
            });
        }
    };

    this.oppdater = function(){
        if(sjekkTaster){
            Object.keys(tasterNede).forEach(function(tasteKode){
                if(tasterNede[tasteKode]) {
                    try {
                        tasterTilbakekall[tasteKode]();
                    } catch (err) {

                    }
                }
            });
        }
    };

    window.addEventListener("keydown", this.håndtererTrykk.bind(this), false);
    window.addEventListener("keyup", this.håndtererTrykk.bind(this), false);
}


Inngangsdata.prototype.leggTilTrykkeEvent = function(eventType,karakterEllerKode,tilbakekall){
    if(eventType instanceof Array){
        for(var i = 0; i < eventType.length; i++){
                this.leggTilTrykkeEvent(eventType[i],karakterEllerKode,(tilbakekall instanceof Array && tilbakekall[i])
                    || (eventType[i] === "keydown" && tilbakekall));
            }
    } else {
        this.tastatur[eventType][(karakterEllerKode.length === 1 && charCodeAt(0) || karakterEllerKode)] = tilbakekall;
    }

};
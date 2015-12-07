/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Inngangsdata() {
    var sjekkTasterBool = false, tasterNede = { keydown:  {}, keyup: {} }, tasterTilbakekall = { keydown:  {}, keyup: {} };

    this.tastatur = { keydown:  {}, keyup: {} };


    this.håndtererTrykk = function(e){
        var tilbakekall = this.tastatur[e.type][e.keyCode];
        if(tilbakekall){
            tasterNede[e.keyCode] = (e.type === "keydown" && [e.type, true]) || [e.type, false];
            sjekkTasterBool = tasterNede[e.keyCode][0];
            tasterTilbakekall[e.type][e.keyCode] = tilbakekall;
        }
        if(e.type === "keyup"){
            tasterNede[e.keyCode] = [e.type, false];
            try {
                tasterTilbakekall[e.type][e.keyCode]();
            } catch (err){}
        }
    };

    function sjekkTaster(){
        sjekkTasterBool = false;
        Object.keys(tasterNede).forEach(function(tasteKode) {
            var tastNede = tasterNede[tasteKode];
            if(tastNede[1]){
                sjekkTasterBool = true;
                try {
                    tasterTilbakekall[tastNede[0]][tasteKode]();
                } catch (err) {

                }
            }
        });
    }

    this.oppdater = function(){
        if(sjekkTasterBool){
            sjekkTaster();
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
        this.tastatur[eventType][karakterEllerKode] = tilbakekall;
    }

};
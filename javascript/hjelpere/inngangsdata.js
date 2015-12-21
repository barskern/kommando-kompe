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

    this.hentMusePos = function(event,innenforHTMLObject){
        var musePos = {};
        musePos.x = event.clientX;
        musePos.y = event.clientY;
        if(innenforHTMLObject){
            var rect = innenforHTMLObject.getBoundingClientRect();
            musePos.x =  (musePos.x-rect.left)/(rect.right-rect.left)*innenforHTMLObject.width;
            musePos.y = (musePos.y-rect.top)/(rect.bottom-rect.top)*innenforHTMLObject.height;
        }
        return musePos;
    };
    this.sjekkOmMusePosErInnenforObjekt = function(musePos,objekt){
        return (musePos.x > objekt.x && musePos.y > objekt.y &&
                musePos.x < objekt.x + objekt.bredde &&
                musePos.y < objekt.y + (objekt.høyde || objekt.fontSize));
    };
    this.klikkbareObjekter = [];

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

    window.addEventListener("keydown", this.håndtererTrykk.bind(this),false);
    window.addEventListener("keyup", this.håndtererTrykk.bind(this),false);
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

Inngangsdata.prototype.leggTilMuseKlikkEvent = function(påObjekt,nårNedeTilbakekall,nårOppeTilbakekall){
    var nåværendeObjektTrykket = undefined;
    påObjekt.addEventListener("mousedown",function(event){
        nårNedeTilbakekall(event);
        nåværendeObjektTrykket = event.currentTarget;
    }.bind(this));
    påObjekt.addEventListener("mouseup",function(event){
        var musePos = this.hentMusePos(event,påObjekt), rect = nåværendeObjektTrykket.getBoundingClientRect();
        if( musePos.x > rect.left &&
            musePos.y > rect.top &&
            musePos.x < rect.right &&
            musePos.y < rect.bottom) nårOppeTilbakekall(event);
        nåværendeObjektTrykket = undefined;
    }.bind(this));
};

Inngangsdata.prototype.håndtererMuseKlikkPåCanvas = function(){
    var nåværendeMuseKlikkObjekt = undefined;
    inngangsdata.leggTilMuseKlikkEvent(ctx.canvas,
        function(event){
            var alleKlikkbareObjekter = StatusHåndterer.nåværendeStatus.statusObjekt.alleKlikkbareObjekter;
            if(alleKlikkbareObjekter){
                for(var i = 0; i < alleKlikkbareObjekter.length; i++){
                    var nåværende = alleKlikkbareObjekter[i];
                    if(this.sjekkOmMusePosErInnenforObjekt(this.hentMusePos(event,ctx.canvas),nåværende)){
                        nåværendeMuseKlikkObjekt = nåværende;
                        if(nåværende.nårNede) nåværende.nårNede();
                        break;
                    }
                }
            }
        }.bind(this),
        function(event){
            if(nåværendeMuseKlikkObjekt) {
                if (this.sjekkOmMusePosErInnenforObjekt(this.hentMusePos(event, ctx.canvas), nåværendeMuseKlikkObjekt)) {
                    if (nåværendeMuseKlikkObjekt.nårTrykket) nåværendeMuseKlikkObjekt.nårTrykket();
                }
                if (nåværendeMuseKlikkObjekt.nårSluppet) nåværendeMuseKlikkObjekt.nårSluppet();
                nåværendeMuseKlikkObjekt = undefined;
            }
        }.bind(this));
};

/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Terreng(type){
    BildeAtlasObjekt.call(this,type.atlas,type.bildeNavn,0,0,0,0);
    this.globalX = this.x;
    this.globalY = this.y;
    this.type = type;
    this.farge = "black";

    this.settBreddeHøydeMedMinimum(this.bildeNavn,1,ctx.canvas.height);
    this.atlasBildeLag(0,false,this.bildeNavn);
}

Terreng.prototype = Object.create(BildeAtlasObjekt.prototype);
Terreng.prototype.constructor = Terreng;

//Statiske medlemmer av klassen

Terreng.nåværende = null;


//Medlemsfunksjoner

Terreng.prototype.settSomNåværende = function(){
    Terreng.nåværende = this;
};


Terreng.prototype.init = function(){
    this.type.nøkkelpunktKart = this.type.initNøkkelpunktKart();
};

Terreng.prototype.oppdater = function(){
    Terreng.nåværende.globalX = Spill.globalX;

    var komponentRepetert = Math.floor((this.globalX)/(this.bredde/this.type.komponenter));
    this.x = ((this.bredde/this.type.komponenter)*komponentRepetert) - (this.globalX);
};

Terreng.prototype.tegn = function(){
    //console.log("første: x = "+this.x+" | y ="+this.y+" | b = "+this.bredde+" | h = "+this.høyde);
    BildeAtlasObjekt.prototype.tegn.call(this);
    var midlertidigX = this.x;
    this.x += this.bredde;
    BildeAtlasObjekt.prototype.tegn.call(this);
    this.x = midlertidigX;
};


Terreng.prototype.tegnLineær = function(){
    ctx.beginPath();
    for(var i = 0; i < this.type.nøkkelpunktKart.length; i++) {
        var nåværende = this.type.nøkkelpunktKart[i];
        var lineFunction = (i > 0) ? ctx.lineTo.bind(ctx) : ctx.moveTo.bind(ctx);
        lineFunction(nåværende[0], nåværende[1]);
    }
    for(var j = (this.type.nøkkelpunktKart.length - 1); j >= 0; j--){
        nåværende = this.type.nøkkelpunktKart[j];
        var høyde = (nåværende.length === 4 && nåværende[2]) || nåværende[1];
        ctx.lineTo(nåværende[0], (nåværende[1]+høyde));
    }
    ctx.fill();
};

Terreng.prototype.tegnSomKurve = function(){
    ctx.beginPath();
    for(var i = 0; i < this.type.nøkkelpunktKart.length; i++){
        var nåværende = this.type.nøkkelpunktKart[i];
        if(i > 0){
            var forrige = this.type.nøkkelpunktKart[i-1];
            var deltaX = nåværende[0] - forrige[0];
            ctx.bezierCurveTo(
                forrige[0] + deltaX/2, forrige[1],
                forrige[0] + deltaX/2, nåværende[1],
                nåværende[0], nåværende[1]);
        } else {
            ctx.moveTo(nåværende[0], nåværende[1]);
        }
    }
    ctx.stroke();
};

Terreng.prototype.hentLineærY = function(påX){
    var nåværende, neste, stigningstallet = 0, deltaX, deltaY;

    for(var i = 0; i < this.type.nøkkelpunktKart.length; i++){
        nåværende = this.type.nøkkelpunktKart[i];
        neste = this.type.nøkkelpunktKart[i+1];
        if((påX >= nåværende[0]) && (påX < ((neste && neste[0]) || nåværende[0]))){
            break;
        } else if((i === 0 && påX < nåværende[0])){
            nåværende = null;
            neste = null;
            break;
        } else {
            nåværende = null;
            neste = null;
        }
    }
    if(nåværende && neste) {
        deltaX = neste[0] - nåværende[0];
        deltaY = neste[1] - nåværende[1];
        stigningstallet = (deltaY / deltaX) || 0;
    }
    return (stigningstallet * (påX - ((nåværende && nåværende[0]) || 0))) + ((nåværende && nåværende[1]) || Number.MAX_VALUE);
};




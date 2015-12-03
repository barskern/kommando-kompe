/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Terreng(nøkkelpunktKart){
    this.nøkkelpunktKart = nøkkelpunktKart; // [[x,y,(høyde),type]]
}

Terreng.prototype.oppdater = function(){

};

Terreng.prototype.tegn = function(){
    ctx.save();
    ctx.rotate(0);
    this.lineær();
    ctx.restore();
};

Terreng.prototype.lineær = function(){
    ctx.strokeStyle = "blue";
    ctx.strokeWidth = "4px";
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.translate(0,0);
    for(var i = 0; i < this.nøkkelpunktKart.length; i++) {
        var nåværende = this.nøkkelpunktKart[i];
        var lineFunction = (i > 0) ? ctx.lineTo.bind(ctx) : ctx.moveTo.bind(ctx);
        lineFunction(nåværende[0], nåværende[1]);
    }
    for(var j = (this.nøkkelpunktKart.length - 1); j >= 0; j--){
        nåværende = this.nøkkelpunktKart[j];
        var høyde = (nåværende.length === 4 && nåværende[2]) || nåværende[1];
        ctx.lineTo(nåværende[0], (nåværende[1]+høyde));
    }
    ctx.fill();
};

Terreng.prototype.kurve = function(){
    ctx.lineWidth = "5px";
    ctx.strokeStyle = "red";
    ctx.translate(0,0);
    ctx.beginPath();
    for(var i = 0; i < this.nøkkelpunktKart.length; i++){
        var nåværende = this.nøkkelpunktKart[i];
        if(i > 0){
            var forrige = this.nøkkelpunktKart[i-1];
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

    for(var i = 0; i < this.nøkkelpunktKart.length; i++){
        nåværende = this.nøkkelpunktKart[i];
        neste = this.nøkkelpunktKart[i+1];
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

Terreng.prototype.hentType = function(id){
    console.log("id = "+id);
    return Terreng.typer[id];
};

Terreng.typer = (function(){

    function Egenskap(bane){
        this.bane = bane;
    }

    return {
        1: "GRESS",
        2: "JORD",
        egenskaper: {
            "GRESS": new Egenskap("CommandoCompe.png"),
            "JORD": new Egenskap("CommandoCompe.png")
        }
    };
});


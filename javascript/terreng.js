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
    ctx.translate(0,0);
    ctx.rotate(0);

    ctx.beginPath();
    ctx.lineWidth = "5px";
    ctx.strokeStyle = "green";
    for(var i = 0; i < this.nøkkelpunktKart.length; i++){
        var nåværende = this.nøkkelpunktKart[i];
        var lineFunction = (i > 0) ? ctx.lineTo.bind(ctx) : ctx.moveTo.bind(ctx);
        lineFunction(nåværende[0], ctx.canvas.height - nåværende[1]);

        /*if(i > 0){
            ctx.quadraticCurveTo(nåværende[0]/2,ctx.canvas.height - nåværende[1],nåværende[0],ctx.canvas.height - nåværende[1]);
        } else {
            ctx.moveTo(nåværende[0],ctx.canvas.height - nåværende[1]);
        }*/
    }
    ctx.stroke();

    ctx.restore();
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


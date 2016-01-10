/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Statusbar(x,y,bredde,høyde,farge){
    SkjemObjekt.call(this,x,y,bredde,høyde);
    this.farge = farge;
    this.bakgrunnsfarge = "black";
    this.kantlinje = {
        lagd:false,
        tykkelse:0,
        fillStyle:"black"
    };
    this.nåværendeProssess = 1;
}

Statusbar.prototype = Object.create(SkjemObjekt.prototype);
Statusbar.prototype.constructor = Statusbar;

Statusbar.prototype.lagKantLinje = function(tykkelse,fillStyle){
    this.kantlinje.lagd = true;
    this.kantlinje.tykkelse = tykkelse;
    this.kantlinje.fillStyle = fillStyle;
};

Statusbar.prototype.tegn = function(){
    var halvBredde = this.bredde/2,halvHøyde = this.høyde/2;

    ctx.save();
    this.transformer();
    if(this.kantlinje.lagd) {
        ctx.fillStyle = this.kantlinje.fillStyle;
        ctx.fillRect(-this.kantlinje.tykkelse-halvBredde,-this.kantlinje.tykkelse-halvHøyde,2*this.kantlinje.tykkelse+2*halvBredde,2*this.kantlinje.tykkelse+2*halvHøyde);
    }
    ctx.fillStyle = this.bakgrunnsfarge;
    ctx.fillRect(-halvBredde,-halvHøyde,2*halvBredde,2*halvHøyde);
    ctx.fillStyle = this.farge;
    if(this.nåværendeProssess > 0) ctx.fillRect(-halvBredde,-halvHøyde,(this.nåværendeProssess*2*halvBredde),2*halvHøyde);
    ctx.restore();
};
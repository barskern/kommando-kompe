/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function MønsterObjekt(x,y,bredde,høyde){
    SkjemObjekt.call(this,x,y,bredde,høyde);
    this.mønster = false;
}

MønsterObjekt.prototype = Object.create(SkjemObjekt.prototype);
MønsterObjekt.prototype.constructor = MønsterObjekt;

MønsterObjekt.prototype.tegn = function(){
    if(this.mønster){
        ctx.save();
        ctx.fillStyle = this.mønster;
        this.transformer();
        ctx.fillRect(-this.bredde/2,-this.høyde/2,this.bredde,this.høyde);
        ctx.restore();
    }
};
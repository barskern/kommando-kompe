/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function VerdensObjekt(atlas,bildeNavn,globalX,globalY,bredde,høyde){
    BildeAtlasObjekt.call(this,atlas,bildeNavn,globalX-Spill.globalX,globalY-Spill.globalY,bredde,høyde);
    this.globalX = globalX;
    this.globalY = globalY;
}

VerdensObjekt.prototype = Object.create(BildeAtlasObjekt.prototype);
VerdensObjekt.prototype.constructor = VerdensObjekt;

VerdensObjekt.prototype.oppdater = function(){
    this.x = this.globalX - Spill.globalX;
    this.y = this.globalY - Spill.globalY;
};
/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Effekt(type,x,y,bredde,høyde){
    BildeAtlasObjekt.call(this,type.atlas,type.bildeNavn,x,y,bredde,høyde);
    this.type = type;
    this.skalTegnes = false;
}

Effekt.prototype = Object.create(BildeAtlasObjekt.prototype);
Effekt.prototype.constructor = Effekt;

Effekt.prototype.oppdater = (function(){
    var tidSidenStart = 0;
    return function(){
        if(this.skalTegnes){
            if((tidSidenStart += klokke.delta) > this.type.varighet) {
                this.skalTegnes = false;
                tidSidenStart = 0;
            }
        }
    };
})();

Effekt.prototype.tegn = function(){
    if(this.skalTegnes) BildeAtlasObjekt.prototype.tegn.call(this);
};
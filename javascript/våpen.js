/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Våpen(type,x,y,bredde,høyde){
    BildeObjekt.call(this,type.bane,x,y,bredde,høyde);
    this.type = type;
}

Våpen.typer = (function(){
    function Egenskaper(bane,relativeAnkerpunkt){
        this.bane = bane;
        this.relativtAnkerpunkt = relativeAnkerpunkt;
    }
    return {
        "MP5": new Egenskaper("mp5_1660x672.png",[(892/1660),(354/672)])
    };
})();

Våpen.prototype = Object.create(BildeObjekt.prototype);
Våpen.prototype.constructor = Våpen;

Våpen.prototype.oppdater = function(eier){
    if(eier){
        var eierAnkerX = Math.abs((eier.retningFartX < 0 ? 1 : 0) - eier.relativtVåpenAnkerpunkt[0]) * eier.bredde;
        var våpenAnkerY = Math.abs((eier.retningFartX < 0 ? 1 : 0) - this.type.relativtAnkerpunkt[0]) * this.bredde;
        this.x = eier.x + eierAnkerX - våpenAnkerY;
        this.y = eier.y + (eier.relativtVåpenAnkerpunkt[1] * eier.høyde) - (this.type.relativtAnkerpunkt[1] * this.høyde);
        this.retningFartX = eier.retningFartX;
    }
    this.reflekterX = (this.retningFartX < 0);
};

Våpen.prototype.hentType = function(type){
    return Våpen.typer[type];
};



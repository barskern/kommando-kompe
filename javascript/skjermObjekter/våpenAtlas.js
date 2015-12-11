/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function VåpenAtlas(type,x,y,bredde,høyde){
    BildeAtlasObjekt.call(this,type.atlas,type.navn,x,y,bredde,høyde);
    this.type = type;
}

VåpenAtlas.typer = (function(){
    function Egenskaper(atlas,navn,lyd,relativeAnkerpunkt){
        this.atlas = atlas;
        this.navn = navn;
        this.lyd = lyd;
        this.relativtAnkerpunkt = relativeAnkerpunkt;
    }
    return {
        SPAS12: new Egenskaper(Atlas.typer.Challagundla4Weapons,"Spas - 12",false,[(892/1660),(354/672)])
};
})();

VåpenAtlas.prototype = Object.create(BildeAtlasObjekt.prototype);
VåpenAtlas.prototype.constructor = VåpenAtlas;

VåpenAtlas.prototype.oppdater = function(eier){
    if(eier){
        var eierAnkerX = Math.abs((eier.retningFartX < 0 ? 1 : 0) - eier.relativtVåpenAnkerpunkt[0]) * eier.bredde;
        var våpenAnkerY = Math.abs((eier.retningFartX < 0 ? 1 : 0) - this.type.relativtAnkerpunkt[0]) * this.bredde;
        this.x = eier.x + eierAnkerX - våpenAnkerY;
        this.y = eier.y + (eier.relativtVåpenAnkerpunkt[1] * eier.høyde) - (this.type.relativtAnkerpunkt[1] * this.høyde);
        this.retningFartX = eier.retningFartX;
    }
    this.reflekterX = (this.retningFartX < 0);
};

VåpenAtlas.prototype.hentType = function(type){
    return VåpenAtlas.typer[type];
};



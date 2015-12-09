/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function BildeObjekt(bane,x,y,bredde,høyde){
    Ressurser.bildeHåndterer.last(bane);
    this.bane = bane;
    this.reflekterX = false;
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.høyde = høyde;

    this.matrise = Matrise.identitet();

    this.settBreddeHøyde = function(){
        var bilde = Ressurser.bildeHåndterer.hent(this.bane);
        this.bredde = ((this.bredde === 0 && (bilde.width / bilde.height) * this.høyde) || this.bredde);
        this.høyde = ((this.høyde === 0 && (bilde.height / bilde.width) * this.bredde) || this.høyde);
    };
    if(this.høyde === 0 || this.bredde === 0){
        Ressurser.nårRessurserKlare(this.settBreddeHøyde.bind(this));
    }

}

BildeObjekt.prototype.oppdater = function(){};

BildeObjekt.prototype.tegn = function(){
    var bilde = Ressurser.bildeHåndterer.hent(this.bane);
    if(bilde) {
        ctx.save();
        ctx.setTransform((this.reflekterX ? -1 : 1),0,0,1, this.x + (this.bredde/2), this.y + (this.høyde/2));
        ctx.drawImage(bilde, -this.bredde/2, -this.høyde/2, this.bredde, this.høyde);
        ctx.restore();
    }
};
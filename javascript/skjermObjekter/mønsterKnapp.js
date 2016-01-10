/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function MønsterKnapp(tekst,x,y,bredde,høyde,funksjonNårNede,funksjonNårSluppet,funksjonNårTrykket){
    MønsterObjekt.call(this,x,y,bredde,høyde);
    this.nårNede = funksjonNårNede;
    this.nårSluppet = funksjonNårSluppet;
    this.nårTrykket = funksjonNårTrykket;
    this.tekst = new TekstObjekt(tekst,0,0);
    this.kantlinje = {
        laget: false
    };
}

MønsterKnapp.prototype = Object.create(MønsterObjekt.prototype);
MønsterKnapp.prototype.constructor = MønsterKnapp;


MønsterKnapp.prototype.oppdater = function(){
    this.tekst.x = this.x + this.bredde/2;
    this.tekst.y = this.y + this.høyde/2;
    this.tekst.sentrerTeksten();
    if(this.bredde === 0){
        this.bredde = this.tekst.bredde + (this.kantlinje.laget? 2*this.kantlinje.tykkelse:3);
    }
};

MønsterKnapp.prototype.tegn = function(){
    MønsterObjekt.prototype.tegn.call(this);
    if(this.tekst) this.tekst.tegn();
    if(this.kantlinje.laget) {
        ctx.save();
        this.transformer(ctx);
        ctx.translate(-(this.bredde/2), -(this.høyde/2));
        ctx.fillStyle = this.kantlinje.fillStyle;
        ctx.fillRect(0,0,this.bredde,this.kantlinje.tykkelse);
        ctx.fillRect(this.bredde-this.kantlinje.tykkelse,0,this.kantlinje.tykkelse,this.høyde);
        ctx.fillRect(0,0,this.kantlinje.tykkelse,this.høyde);
        ctx.fillRect(0,this.høyde-this.kantlinje.tykkelse,this.bredde, this.kantlinje.tykkelse);
        ctx.restore();
    }
};

MønsterKnapp.prototype.lagKantLinje = function(tykkelse, fillStyle){
    this.kantlinje.tykkelse = tykkelse;
    this.kantlinje.fillStyle = fillStyle;
    this.kantlinje.laget = true;
};
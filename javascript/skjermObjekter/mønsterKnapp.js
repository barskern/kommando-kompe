/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function MønsterKnapp(tekst,mønster,x,y,bredde,høyde,funksjonNårNede,funksjonNårSluppet,funksjonNårTrykket){
    MønsterObjekt.call(this,mønster,x,y,bredde,høyde);
    this.nårNede = funksjonNårNede;
    this.nårSluppet = funksjonNårSluppet;
    this.nårTrykket = funksjonNårTrykket;
    this.tekst = new TekstObjekt(tekst,0,0);
}

MønsterKnapp.prototype = Object.create(MønsterObjekt.prototype);
MønsterKnapp.prototype.constructor = MønsterKnapp;


MønsterKnapp.prototype.oppdater = function(){
    this.tekst.x = this.x + this.bredde/2;
    this.tekst.y = this.y + this.høyde/2;
    this.tekst.sentrerTeksten();
};

MønsterKnapp.prototype.tegn = function(){
    MønsterObjekt.prototype.tegn.call(this);
    if(this.tekst) this.tekst.tegn();
};

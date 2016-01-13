/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function TekstObjekt(tekst,x,y,fillStyle,font){
    SkjemObjekt.call(this,x,y,0,16);
    this.tekst = tekst;
    this.font = (!font? "Arial" : font);
    this.textBaseline = "top";
    this.textAlign = "start";
    this.fillStyle = (!fillStyle?"black":fillStyle);
    this.kantlinje = {
        laget: false
    };
}

TekstObjekt.prototype = Object.create(SkjemObjekt.prototype);
TekstObjekt.prototype.constructor = TekstObjekt;

TekstObjekt.prototype.transformer = function(){
    SkjemObjekt.prototype.transformer.call(this);
    ctx.textBaseline = this.textBaseline;
    ctx.textAlign = this.textAlign;
    ctx.font = this.høyde + "px " + this.font;
    ctx.fillStyle = this.fillStyle;
};

TekstObjekt.prototype.settBreddeAvTekst = function(){
    ctx.save();
    this.transformer();
    this.bredde = ctx.measureText(this.tekst).width;
    ctx.restore();
};

TekstObjekt.prototype.sentrerTeksten = function(){
    this.settBreddeAvTekst();
    this.x -= (this.bredde/2);
    this.y -= (this.høyde/2);
};

TekstObjekt.prototype.lagKantLinje = function(tykkelse, strokeStyle){
    this.kantlinje.tykkelse = tykkelse;
    this.kantlinje.strokeStyle = strokeStyle;
    this.kantlinje.laget = true;
};

TekstObjekt.prototype.tegn = function(){
    ctx.save();
    this.transformer();
    ctx.fillText(this.tekst,-this.bredde/2,-this.høyde/2);
    if(this.kantlinje.laget) {
        ctx.strokeStyle = this.kantlinje.strokeStyle;
        ctx.lineWidth = this.kantlinje.tykkelse;
        ctx.strokeText(this.tekst,-this.bredde/2,-this.høyde/2);
    }
    ctx.restore();
};


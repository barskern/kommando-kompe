/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function TekstObjekt(tekst,x,y,fillStyle,font){
    this.tekst = tekst;
    this.x = x;
    this.y = y;
    this.font = (!font?"Arial":font);
    this.fontSize = 16;
    this.textBaseline = "top";
    this.textAlign = "start";
    this.fillStyle = (!fillStyle?"black":fillStyle);
}

TekstObjekt.prototype.gjørKlarKontekstKallSåFunksjon = function(funksjon){
    ctx.save();
    ctx.textBaseline = this.textBaseline;
    ctx.textAlign = this.textAlign;
    ctx.font = this.fontSize+"px "+this.font;
    ctx.fillStyle = this.fillStyle;
    if(funksjon) funksjon();
    ctx.restore();
};

TekstObjekt.prototype.settBreddeAvTekst = function(){
    this.gjørKlarKontekstKallSåFunksjon(function(){
        this.bredde = ctx.measureText(this.tekst).width;
    }.bind(this));
};

TekstObjekt.prototype.sentrerTeksten = function(){
    this.settBreddeAvTekst();
    this.x -= (this.bredde/2);
    this.y -= (this.fontSize/2);
};

TekstObjekt.prototype.tegn = function(){
    this.gjørKlarKontekstKallSåFunksjon(function(){
        ctx.fillText(this.tekst,this.x,this.y);
    }.bind(this));
};


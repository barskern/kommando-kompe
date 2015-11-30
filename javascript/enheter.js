/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spiller(bane,x,y,bredde,h�yde){
    Enhet.call(this,bane,x,y,bredde,h�yde);
}

Spiller.prototype = Object.create(Enhet.prototype);
Spiller.prototype.constructor = Spiller;

Spiller.prototype.oppdater = function(){
    Enhet.prototype.oppdater();
};


function Enhet(bane,x,y,bredde,h�yde){
    this.bane = bane;
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.h�yde = h�yde;
}

Enhet.prototype.oppdater = function(){
};
Enhet.prototype.tegn = function(){
    ctx.drawImage(Ressurser.hent(this.bane),this.x,this.y);
};




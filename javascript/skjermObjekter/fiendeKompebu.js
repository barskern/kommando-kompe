/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function FiendeKompebu(mål,globalX,globalY){
    Fiende.call(this,Atlas.typer.TING,"fiendeDagnysKompebu",mål,globalX,globalY,0,2.5*config.pikselPerMeter);

    this.fartsgrenseX = 2 * config.pikselPerMeter;

    this.våpen = new Våpen(this,mål,Våpen.typer.DAGNYSKOMPEBLASTER,0,0,1.4*config.pikselPerMeter,0);
    this.relativtVåpenAnkerpunkt = [0.68,0.3];

    this.akselerasjonX = config.pikselPerMeter/80;
    this.deakselerasjonX = config.pikselPerMeter * 4;

    this.akselerasjonY = config.pikselPerMeter/100;

    this.liv = 600;
    this.maxLiv = this.liv;
    this.poengForDrap = 500;
    this.tidSidenForrigeAngrep = Number.MAX_VALUE;
    this.tidMellomAngrep = 6;
}

FiendeKompebu.prototype = Object.create(Fiende.prototype);
FiendeKompebu.prototype.constructor = FiendeKompebu;

FiendeKompebu.prototype.oppdater = function(){
    Fiende.prototype.oppdater.call(this);
    this.våpen.oppdater(this);

    this.tidSidenForrigeAngrep += klokke.delta;

    if(this.x < 0 || this.x + this.bredde > ctx.canvas.width
        || Math.abs((this.mål.globalX + (this.mål.bredde/2)) - (this.globalX + (this.bredde/2))) - 3*config.pikselPerMeter > ((this.bredde/2)+(this.mål.bredde/2))){
        if(this.mål.globalX > this.globalX){
            this.settAkselerasjon(1,this.akselerasjonX);
        } else if(this.mål.globalX < this.globalX){
            this.settAkselerasjon(-1,this.akselerasjonX);
        }
    } else {
        this.retningFartX = (this.mål.globalX < this.globalX) ? -1 : 1;
        if(this.tidSidenForrigeAngrep > this.tidMellomAngrep){
            this.skyt();
            this.tidSidenForrigeAngrep = 0;
        }
    }
};

FiendeKompebu.prototype.tegn = function(){
    this.våpen.tegn();
    Fiende.prototype.tegn.call(this);
};

FiendeKompebu.prototype.skyt = function(){
    this.våpen.skyt();
};
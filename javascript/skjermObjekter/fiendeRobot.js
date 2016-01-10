/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function FiendeRobot(mål,globalX,globalY){
    Fiende.call(this,Atlas.typer.KommandoKompeAtlas,"fiendeRobot",mål,globalX,globalY,0,2*config.pikselPerMeter);

    this.fartsgrenseX = 2 * config.pikselPerMeter;

    this.våpen = new Våpen(this,false,Våpen.typer.ROBOTBRYSTKANON,0,0,0,0);
    this.relativtVåpenAnkerpunkt = [0.6,0.2];

    this.akselerasjonX = config.pikselPerMeter/80;
    this.deakselerasjonX = config.pikselPerMeter * 4;

    this.akselerasjonY = config.pikselPerMeter/100;

    this.poengForDrap = 100;
    this.angrepsPoeng = 15;
    this.tidSidenForrigeAngrep = Number.MAX_VALUE;
    this.tidMellomAngrep = 4;
}

FiendeRobot.prototype = Object.create(Fiende.prototype);
FiendeRobot.prototype.constructor = FiendeRobot;

FiendeRobot.prototype.oppdater = function(){
    Fiende.prototype.oppdater.call(this);
    this.våpen.oppdater(this);

    this.tidSidenForrigeAngrep += klokke.delta;

    //console.log("Mathabs = "+Math.abs((this.mål.globalX + (this.mål.bredde/2)) - (this.globalX + (this.bredde/2))));
    //console.log("bredde + bredde = "+((this.bredde/2)+(this.mål.bredde/2)));

    if(Math.abs((this.mål.globalX + (this.mål.bredde/2)) - (this.globalX + (this.bredde/2))) > ((this.bredde/2)+(this.mål.bredde/2))){
        if(this.mål.globalX > this.globalX){
            this.settAkselerasjon(1,this.akselerasjonX);
        } else if(this.mål.globalX < this.globalX){
            this.settAkselerasjon(-1,this.akselerasjonX);
        }
    } else {
        this.retningFartX = (this.mål.globalX < this.globalX) ? -1 : 1;
        if(this.tidSidenForrigeAngrep > this.tidMellomAngrep){
            this.mål.taSkade(this.angrepsPoeng);
            this.tidSidenForrigeAngrep = 0;
        }
    }
};

FiendeRobot.prototype.tegn = function(){
    Fiende.prototype.tegn.call(this);
    this.våpen.tegn();
};

FiendeRobot.prototype.skyt = function(){
    this.våpen.skyt();
};
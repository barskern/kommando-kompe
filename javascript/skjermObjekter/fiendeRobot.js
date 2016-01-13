/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function FiendeRobot(mål,globalX,globalY){
    Fiende.call(this,Atlas.typer.TING,"fiendeRobotOverkropp",mål,globalX,globalY,0,2*config.pikselPerMeter);

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

    this.animasjonsVerdier = {
        maxBeinUtslag: 40
    };

    this.atlasBildeLag(1,false,"fiendeRobotBein");
    this.skalerLag(1,0.9,0.6);
    this.settRelativPosLag(1,0.1,0.43);
    this.roterLagRundt(1,0.5,0.15);

    this.atlasBildeLag(2,false,"fiendeRobotBein");
    this.skalerLag(2,0.9,0.6);
    this.settRelativPosLag(2,0.1,0.43);
    this.roterLagRundt(2,0.5,0.15);

    this.atlasBildeLag(3,false,"fiendeRobotOverkropp");
}

FiendeRobot.prototype = Object.create(Fiende.prototype);
FiendeRobot.prototype.constructor = FiendeRobot;

FiendeRobot.prototype.oppdater = function(){
    Fiende.prototype.oppdater.call(this);
    this.våpen.oppdater(this);
    this.gåAnimasjon();

    this.tidSidenForrigeAngrep += klokke.delta;

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

FiendeRobot.prototype.gåAnimasjon = (function(){
    var fortegn = 1;
    return function(){
        var prosess = this.lag[2].rotasjon / this.animasjonsVerdier.maxBeinUtslag, fartAbs;
        if((fartAbs = Math.abs(this.fartX)) < 1){
            this.roterLag(1,-10*this.lag[1].rotasjon*klokke.delta,true);
            this.roterLag(2,-10*this.lag[2].rotasjon*klokke.delta,true);
        } else {
            if(prosess > 1) fortegn = -1;
            if(prosess < -1) fortegn = 1;
            this.roterLag(1,-0.5*fortegn*fartAbs*klokke.delta,true);
            this.roterLag(2,0.5*fortegn*fartAbs*klokke.delta,true);
        }
    }
})();
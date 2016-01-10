/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spiller(atlas,bildeNavn,globalX,globalY,bredde,høyde){
    Enhet.call(this,atlas,bildeNavn,globalX,globalY,bredde,høyde);
    this.liv = 400;
    this.maxLiv = this.liv;
    this.poeng = 0;

    this.helsebar = new Statusbar(0,0,this.bredde,9,"green");
    this.helsebar.lagKantLinje(1,"white");


    this.akselerasjonX = config.pikselPerMeter/7.33;
    this.akselerasjonY = config.pikselPerMeter/22;

    this.våpen = new Våpen(this,Fiende.nåværendeFiender,Våpen.typer.M97RIFLE,0,0,config.pikselPerMeter,0,Effekt.typer.GEVÆRLØPBLINK,
        [config.pikselPerMeter * 0.4,config.pikselPerMeter * 0.15]);
    this.relativtVåpenAnkerpunkt = [0.55,0.2];
}

Spiller.prototype = Object.create(Enhet.prototype);
Spiller.prototype.constructor = Spiller;

Spiller.prototype.nårMotstanderDrept = function(motstander){
    this.poeng += motstander.poengForDrap;
};

Spiller.prototype.init = function(){
    //Høyre D
    inngangsdata.leggTilTrykkeEvent('keydown',68,function(){
        this.settAkselerasjon(1,this.akselerasjonX);
        this.reflekterX = false;
    }.bind(this));

    //Venstre A
    inngangsdata.leggTilTrykkeEvent('keydown',65,function(){
        this.settAkselerasjon(-1,this.akselerasjonX);
        this.reflekterX = true;
    }.bind(this));

    //Hopp W
    inngangsdata.leggTilTrykkeEvent('keydown',87,this.hopp.bind(this,this.akselerasjonY));

    //Skyt Mellomrom
    inngangsdata.leggTilTrykkeEvent('keydown',32,this.skyt.bind(this));
};

Spiller.prototype.oppdater = function(){
    if(this.x < 200){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = 200;
    } else if(this.x > ctx.canvas.width - 200 - this.bredde){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = ctx.canvas.width - 200 - this.bredde;
    }

    Enhet.prototype.oppdater.call(this);

    this.helsebar.x = this.x;
    this.helsebar.y = this.y - 30;
    this.helsebar.nåværendeProssess = this.liv/this.maxLiv;

    this.våpen.oppdater(this);
};

Spiller.prototype.tegn = function(){
    Enhet.prototype.tegn.call(this);
    this.våpen.tegn();
    this.helsebar.tegn();
};

Spiller.prototype.skyt = function(){
    this.våpen.skyt();
};

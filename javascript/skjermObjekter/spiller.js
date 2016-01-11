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

    this.våpen = new Våpen(this,Fiende.nåværendeFiender,Våpen.typer.M97RIFLE,0,0,config.pikselPerMeter*0.9,0);
    this.relativtVåpenAnkerpunkt = [0.61,0.204];

    this.animasjonsVerdier = {
        maxBeinUtslag: 45
    };

    this.atlasBildeLag(1,false,"kommandoKalleVenstreBein");
    this.skalerLag(1,0.7,0.65);
    this.settRelativPosLag(1,-0.08,0.36);
    this.roterLagRundt(1,0.5,0.15);

    this.atlasBildeLag(2,false,"kommandoKalleVenstreBein");
    this.skalerLag(2,0.7,0.65);
    this.settRelativPosLag(2,-0.08,0.36);
    this.roterLagRundt(2,0.5,0.15);

    this.atlasBildeLag(3,false,"kommandoKalleOverkropp");

    this.atlasBildeLag(4,false,"kommandoKalleVenstreArm");
    this.settRelativPosLag(4,0.3,0.15);
    this.roterLagRundt(4,0.5,0.1);
    this.skalerLag(4,0.65,0.2,true);

    this.atlasBildeLag(5,false,"kommandoKalleHøyreArm");
    this.settRelativPosLag(5,0.08,0.17);
    this.skalerLag(5,0.65,0.2,true);

    this.effekter = {
        taSkade: new Effekt(Effekt.typer.BLOOD,0,0,600,0)

    };
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
        this.reflekter.x = false;
    }.bind(this));

    //Venstre A
    inngangsdata.leggTilTrykkeEvent('keydown',65,function(){
        this.settAkselerasjon(-1,this.akselerasjonX);
        this.reflekter.x = true;
    }.bind(this));

    //Hopp W
    inngangsdata.leggTilTrykkeEvent('keydown',87,this.hopp.bind(this,this.akselerasjonY));

    //Skyt Mellomrom
    inngangsdata.leggTilTrykkeEvent('keydown',32,this.skyt.bind(this));
};

Spiller.prototype.gåAnimasjon = (function(){
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

Spiller.prototype.oppdater = function(){
    if(this.x < 200){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = 200;
    } else if(this.x > ctx.canvas.width - 200 - this.bredde){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = ctx.canvas.width - 200 - this.bredde;
    }

    Enhet.prototype.oppdater.call(this);
    this.gåAnimasjon();

    this.helsebar.x = this.x;
    this.helsebar.y = this.y - 30;
    this.helsebar.nåværendeProssess = this.liv/this.maxLiv;

    this.våpen.oppdater(this);

    this.effekter.taSkade.oppdater();
};

Spiller.prototype.tegn = function(){
    Enhet.prototype.tegn.call(this);
    this.våpen.tegn();
    ctx.save();
    this.transformer();
    this.tegnLag(this.lag[this.lag.length-2]);
    this.tegnLag(this.lag[this.lag.length-1]);
    ctx.restore();
    this.helsebar.tegn();
    this.effekter.taSkade.tegn();
};

Spiller.prototype.skyt = function(){
    this.våpen.skyt();
};

Spiller.prototype.taSkade = function(mengde){
    Enhet.prototype.taSkade.call(this,mengde);
    this.effekter.taSkade.skalTegnes = true;
};

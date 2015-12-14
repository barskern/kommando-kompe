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

    this.akselerasjonX = config.pikselPerMeter/7.33;
    this.akselerasjonY = config.pikselPerMeter/22;

    this.inngangsdata = new Inngangsdata();
    this.inngangsdata.leggTilTrykkeEvent('keydown',68,this.settAkselerasjon.bind(this,1,this.akselerasjonX));    //Høyre D
    this.inngangsdata.leggTilTrykkeEvent('keydown',65,this.settAkselerasjon.bind(this,-1,this.akselerasjonX));   //Venstre A
    this.inngangsdata.leggTilTrykkeEvent('keydown',87,this.hopp.bind(this,this.akselerasjonY));                  //Hopp W
    this.inngangsdata.leggTilTrykkeEvent('keydown',32,this.skyt.bind(this));                                  //Skyt Mellomrom

    this.våpen = new Våpen(this,Fiende.alleSpawnedeFiender,Våpen.typer.M97Rifle,0,0,config.pikselPerMeter,0,Effekt.typer.GEVÆRLØPBLINK,
        [config.pikselPerMeter * 0.4,config.pikselPerMeter * 0.15]);
    this.relativtVåpenAnkerpunkt = [0.55,0.2];
}

Spiller.prototype = Object.create(Enhet.prototype);
Spiller.prototype.constructor = Spiller;

Spiller.prototype.oppdater = function(){
    this.inngangsdata.oppdater();
    if(this.x < 200){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = 200;
    }
    if(this.x > ctx.canvas.width - 200 - this.bredde){
        Spill.globalX += this.fartX * klokke.delta;
        this.x = ctx.canvas.width - 200 - this.bredde;
    }
    Enhet.prototype.oppdater.call(this);
};
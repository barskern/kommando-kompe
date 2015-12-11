/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function SpillerAtlas(atlas,bildeNavn,x,y,bredde,høyde){
    EnhetAtlas.call(this,atlas,bildeNavn,x,y,bredde,høyde);

    this.hastighetX = Spill.pikselPerMeter/7.33;
    this.hastighetY = Spill.pikselPerMeter/22;

    this.inngangsdata = new Inngangsdata();
    this.inngangsdata.leggTilTrykkeEvent('keydown',68,this.settAkselerasjon.bind(this,1,this.hastighetX));    //Høyre D
    this.inngangsdata.leggTilTrykkeEvent('keydown',65,this.settAkselerasjon.bind(this,-1,this.hastighetX));   //Venstre A
    this.inngangsdata.leggTilTrykkeEvent('keydown',32,this.hopp.bind(this,this.hastighetY));       //Hopp Mellomrom
}

SpillerAtlas.prototype = Object.create(EnhetAtlas.prototype);
SpillerAtlas.prototype.constructor = SpillerAtlas;

SpillerAtlas.prototype.oppdater = function(){
    this.inngangsdata.oppdater();

    if(this.x < 60){
        TerrengAtlas.nåværende.x -= this.fartX * klokke.delta;
        this.x = 60;
    }
    if(this.x > ctx.canvas.width - 60 - this.bredde){
        TerrengAtlas.nåværende.x -= this.fartX * klokke.delta;
        this.x = ctx.canvas.width - 60 - this.bredde;
    }
    EnhetAtlas.prototype.oppdater.call(this);
};
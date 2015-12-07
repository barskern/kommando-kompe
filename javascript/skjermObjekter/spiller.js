/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spiller(bane,x,y,bredde,høyde){
    Enhet.call(this,bane,x,y,bredde,høyde);

    this.hastighetX = 15;
    this.hastighetY = 5;

    this.inngangsdata = new Inngangsdata();
    this.inngangsdata.leggTilTrykkeEvent('keydown',68,this.settAkselerasjon.bind(this,1,this.hastighetX));    //Høyre D
    this.inngangsdata.leggTilTrykkeEvent('keydown',65,this.settAkselerasjon.bind(this,-1,this.hastighetX));   //Venstre A
    this.inngangsdata.leggTilTrykkeEvent('keydown',32,this.hopp.bind(this,this.hastighetY));       //Hopp Mellomrom
}

Spiller.prototype = Object.create(Enhet.prototype);
Spiller.prototype.constructor = Spiller;

Spiller.prototype.oppdater = function(){
    this.inngangsdata.oppdater();

    if(this.x < 60){
        Terreng.nåværende.x -= this.fartX * clock.delta;
        this.x = 60;
    }
    if(this.x > ctx.canvas.width - 60 - this.bredde){
        Terreng.nåværende.x -= this.fartX * clock.delta;
        this.x = ctx.canvas.width - 60 - this.bredde;
    }
    Enhet.prototype.oppdater.call(this);
};


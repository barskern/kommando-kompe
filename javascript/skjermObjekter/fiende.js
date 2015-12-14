/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Fiende(mål,type,globalX,globalY,bredde,høyde){
    Enhet.call(this,type.atlas,type.bildeNavn,globalX,globalY,bredde,høyde);
    this.type = type;
    this.mål = mål;
    this.erSpawnet = false;

    this.fartsgrenseX = 2 * config.pikselPerMeter;

    this.våpen = new Våpen(this,false,type.våpenType,0,0,0,0);
    this.relativtVåpenAnkerpunkt = type.relativtVåpenAnkerpunkt;
}

Fiende.prototype = Object.create(Enhet.prototype);
Fiende.prototype.constructor = Fiende;

Fiende.alleSpawnedeFiender = [];

Fiende.sorterAlleLagdeFiender = function(){
    Fiende.alleSpawnedeFiender.sort(function(fiende1,fiende2){
        return fiende1.globalX - fiende2.globalX;
    });
};

Fiende.prototype.spawn = function(){
    this.erSpawnet = true;
    Fiende.alleSpawnedeFiender.push(this);
};


Fiende.prototype.oppdater = function(){
    this.retningFartX = (this.mål.globalX < this.globalX) ? -1 : 1;
    Enhet.prototype.oppdater.call(this);

    Fiende.sorterAlleLagdeFiender();
    this.sjekkKollisjonMedEnheter(Fiende.alleSpawnedeFiender);

    if(Math.abs(this.mål.globalX - this.globalX) > (3*config.pikselPerMeter) || this.x < 0 || this.x > ctx.canvas.width - this.bredde){
        if(this.mål.globalX > this.globalX + 5){
            this.settAkselerasjon(1,this.type.nåværendeAkselerasjonX);
        } else if(this.mål.globalX < this.globalX - 5){
            this.settAkselerasjon(-1,this.type.akselerasjonY);
        }
    } else if(this.globalY + this.høyde === this.terrengHøyde) {
        this.retningFartX = (this.mål.globalX < this.globalX) ? -1 : 1;
        //this.skyt();
    }
};


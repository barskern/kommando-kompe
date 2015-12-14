/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Enhet(atlas,bildeNavn,globalX,globalY,bredde,høyde){
    VerdensObjekt.call(this,atlas,bildeNavn,globalX,globalY,bredde,høyde);
    this.liv = 100;
    this.død = false;

    this.fartX = 0;
    this.nåværendeAkselerasjonX = 0;
    this.fartsgrenseX = 4 * config.pikselPerMeter;
    this.retningFartX = 0;

    this.akselerasjonX = config.pikselPerMeter/7.33;
    this.deakselerasjonX = 10 * config.pikselPerMeter;

    this.akselerasjonY = config.pikselPerMeter/22;
    this.fartY = 0;

    this.våpen = undefined;
    this.relativtVåpenAnkerpunkt = [0,0];
}

Enhet.prototype = Object.create(VerdensObjekt.prototype);
Enhet.prototype.constructor = Enhet;

Enhet.gravitasjon = 9.81; // m/s^2


//Medlemsfunksjoner

Enhet.prototype.settAkselerasjon = function(retning, mengde){
    if((this.fartX > -this.fartsgrenseX || retning === 1) && (this.fartX < this.fartsgrenseX || retning === -1))
        this.nåværendeAkselerasjonX = (retning * mengde) * config.pikselPerMeter;
    else {
        this.nåværendeAkselerasjonX = 0;
        this.fartX = this.retningFartX * this.fartsgrenseX;
    }
    if(this.fartX * this.nåværendeAkselerasjonX < 0)
        this.nåværendeAkselerasjonX += (this.nåværendeAkselerasjonX/Math.abs(this.nåværendeAkselerasjonX)) * this.deakselerasjonX;
};

Enhet.prototype.hopp = function(mengde){
    if(this.y + this.høyde + 5 > this.terrengHøyde && this.y + this.høyde - 5 < this.terrengHøyde)
        this.fartY = mengde * config.pikselPerMeter;
};

Enhet.prototype.skyt = function(){
    if(this.våpen)
        this.våpen.skyt();
};

Enhet.prototype.erILive = function(){
    return !this.død;
};

Enhet.prototype.skad = function(mendge){
    this.liv -= mendge;
    if(this.liv < 0) this.drep();
};

Enhet.prototype.drep = function(){
    this.død = true;
    Fiende.alleSpawnedeFiender.splice(Fiende.alleSpawnedeFiender.indexOf(this),1);
};

Enhet.prototype.sjekkKollisjonMedEnheter = function(enheter){
    for(var i = 0; i < enheter.length; i++){
        var nåværende = enheter[i];
        if(nåværende !== this &&
            this.erSpawnet && this.erILive() &&
            nåværende.erSpawnet && nåværende.erILive() &&
            nåværende.globalX + nåværende.bredde > this.globalX &&
            nåværende.globalX < this.globalX + this.bredde){

            //nåværende.globalX += (this.retningFartX*this.bredde);
        }
    }
};


Enhet.prototype.oppdater = function(){
    this.reflekterX = (this.retningFartX !== 0 ? (this.retningFartX < 0) : this.reflekterX);
    this.oppdaterGlobalX();
    this.terrengHøyde = Terreng.nåværende.hentLineærY(this.globalX + (this.bredde/2));
    this.oppdaterGlobalY();
    VerdensObjekt.prototype.oppdater.call(this);
    if(this.våpen) this.våpen.oppdater(this);
};

Enhet.prototype.tegn = function(){
    BildeAtlasObjekt.prototype.tegn.call(this);
    if(this.våpen) this.våpen.tegn();
};


Enhet.prototype.oppdaterGlobalX = function(){
    this.fartX += this.nåværendeAkselerasjonX * klokke.delta;
    if(this.fartX * this.nåværendeAkselerasjonX < 0
        && -(this.deakselerasjonX * klokke.delta) < this.fartX
        && this.fartX < this.deakselerasjonX * klokke.delta)
        this.fartX = 0;
    this.nåværendeAkselerasjonX = (Math.abs(this.fartX) > 1 && (-this.retningFartX) * this.deakselerasjonX) || 0;
    this.globalX += this.fartX * klokke.delta;
    this.retningFartX = (this.fartX != 0 && this.fartX/Math.abs(this.fartX)) || this.retningFartX;
};

Enhet.prototype.oppdaterGlobalY = function(){
    this.globalY -= this.fartY * klokke.delta;
    if(this.globalY + this.høyde > this.terrengHøyde) this.globalY = this.terrengHøyde - this.høyde;
    if(this.globalY + this.høyde !== this.terrengHøyde) this.fartY -= config.pikselPerMeter * Enhet.gravitasjon * klokke.delta;
    else this.fartY = 0;
};

/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Enhet(atlas,bildeNavn,x,y,bredde,høyde){
    BildeAtlasObjekt.call(this,atlas,bildeNavn,x,y,bredde,høyde);

    this.fartX = 0;
    this.akselerasjonX = 0;
    this.fartsgrenseX = 4 * config.pikselPerMeter;
    this.deakselerasjonX = 10 * config.pikselPerMeter;
    this.retningFartX = 1;

    this.fartY = 0;

    this.våpen = undefined;
    this.relativtVåpenAnkerpunkt = [0,0];
}

Enhet.prototype = Object.create(BildeAtlasObjekt.prototype);
Enhet.prototype.constructor = Enhet;

Enhet.gravitasjon = 9.81; // m/s^2


//Medlemsfunksjoner

Enhet.prototype.settAkselerasjon = function(retning, mengde){
    if((this.fartX > -this.fartsgrenseX || retning === 1) && (this.fartX < this.fartsgrenseX || retning === -1))
        this.akselerasjonX = (retning * mengde) * config.pikselPerMeter;
    else {
        this.akselerasjonX = 0;
        this.fartX = this.retningFartX * this.fartsgrenseX;
    }
    if(this.fartX * this.akselerasjonX < 0)
        this.akselerasjonX += (this.akselerasjonX/Math.abs(this.akselerasjonX)) * this.deakselerasjonX;
};

Enhet.prototype.hopp = function(mengde){
    if(this.y + this.høyde + 5 > this.terrengHøyde && this.y + this.høyde - 5 < this.terrengHøyde)
        this.fartY = mengde * config.pikselPerMeter;
};

Enhet.prototype.skyt = function(){
    if(this.våpen)
        this.våpen.skyt();
};


Enhet.prototype.oppdater = function(){
    this.reflekterX = (this.retningFartX < 0);
    this.oppdaterX();
    this.terrengHøyde = Terreng.nåværende.hentLineærY(this.x + (this.bredde/2));
    this.oppdaterY();
    if(this.våpen)
        this.våpen.oppdater(this);
};

Enhet.prototype.tegn = function(){
    BildeAtlasObjekt.prototype.tegn.call(this);
    if(this.våpen)
        this.våpen.tegn();
};


Enhet.prototype.oppdaterX = function(){
    this.fartX += this.akselerasjonX * klokke.delta;
    if(this.fartX * this.akselerasjonX < 0
        && -(this.deakselerasjonX * klokke.delta) < this.fartX
        && this.fartX < this.deakselerasjonX * klokke.delta)
        this.fartX = 0;
    this.akselerasjonX = (Math.abs(this.fartX) > 1 && (-this.retningFartX) * this.deakselerasjonX) || 0;
    this.x += this.fartX * klokke.delta;
    this.retningFartX = (this.fartX != 0 && this.fartX/Math.abs(this.fartX)) || this.retningFartX;
};

Enhet.prototype.oppdaterY = function(){
    this.y -= this.fartY * klokke.delta;
    if(this.y + this.høyde > this.terrengHøyde)
        this.y = this.terrengHøyde - this.høyde;
    if(this.y + this.høyde !== this.terrengHøyde)
        this.fartY -= config.pikselPerMeter * Enhet.gravitasjon * klokke.delta;
    else
        this.fartY = 0
};

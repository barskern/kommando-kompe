/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Enhet(bane,x,y,bredde,høyde){
    BildeObjekt.call(this,bane,x,y,bredde,høyde);
    this.fartX = 0;
    this.akselerasjonX = 0;
    this.fartsgrenseX = 4 * Spill.pikselPerMeter;
    this.deakselerasjonX = 10 * Spill.pikselPerMeter;
    this.retningFartX = 1;

    this.fartY = 0;

    this.relativtVåpenAnkerpunkt = [(86/126),(52/259)];
    this.våpenAnkerpunkt = [0,0];
    this.våpen = new Våpen(Våpen.typer.MP5,0,0,0.8*Spill.pikselPerMeter,0);
    this.leggTilTilbakekallPåBreddeHøyde(function(){
        this.våpenAnkerpunkt = [this.relativtVåpenAnkerpunkt[0] * this.bredde,this.relativtVåpenAnkerpunkt[1] * this.høyde];
    }.bind(this));
}

Enhet.prototype = Object.create(BildeObjekt.prototype);
Enhet.prototype.constructor = Enhet;

Enhet.gravitasjon = 9.81; // m/s^2


//Medlemsfunksjoner

Enhet.prototype.settAkselerasjon = function(retning, mengde){
    if((this.fartX > -this.fartsgrenseX || retning === 1) && (this.fartX < this.fartsgrenseX || retning === -1))
        this.akselerasjonX = (retning * mengde) * Spill.pikselPerMeter;
    else {
        this.akselerasjonX = 0;
        this.fartX = this.retningFartX * this.fartsgrenseX;
    }
    if(this.fartX * this.akselerasjonX < 0)
        this.akselerasjonX += (this.akselerasjonX/Math.abs(this.akselerasjonX)) * this.deakselerasjonX;
};

Enhet.prototype.hopp = function(mengde){
    if(this.y + this.høyde + 5 > this.terrengHøyde && this.y + this.høyde - 5 < this.terrengHøyde)
        this.fartY = mengde * Spill.pikselPerMeter;
};

Enhet.prototype.oppdater = function(){
    BildeObjekt.prototype.oppdater.call(this);
    this.reflekterX = (this.retningFartX < 0);
    this.oppdaterX();
    this.terrengHøyde = Terreng.nåværende.hentLineærY(this.x + this.bredde/2);
    this.oppdaterY();
    this.våpen.oppdater(this);
};

Enhet.prototype.tegn = function(){
    BildeObjekt.prototype.tegn.call(this);
    this.våpen.tegn();
};

Enhet.prototype.oppdaterX = function(){
    this.fartX += this.akselerasjonX * clock.delta;
    if(this.fartX * this.akselerasjonX < 0
        && -(this.deakselerasjonX * clock.delta) < this.fartX
        && this.fartX < this.deakselerasjonX * clock.delta)
        this.fartX = 0;
    this.akselerasjonX = (Math.abs(this.fartX) > 1 && (-this.retningFartX) * this.deakselerasjonX) || 0;
    this.x += this.fartX * clock.delta;
    this.retningFartX = (this.fartX != 0 && this.fartX/Math.abs(this.fartX)) || this.retningFartX;
};

Enhet.prototype.oppdaterY = function(){
    this.y -= this.fartY * clock.delta;
    if(this.y + this.høyde > this.terrengHøyde)
        this.y = this.terrengHøyde - this.høyde;
    if(this.y + this.høyde !== this.terrengHøyde)
        this.fartY -= Spill.pikselPerMeter * Enhet.gravitasjon * clock.delta;
    else
        this.fartY = 0
};



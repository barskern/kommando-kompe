/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Enhet(bane,x,y,bredde,høyde){
    Ressurser.lastBilder(bane);
    this.bane = bane;
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.høyde = høyde;

    this.retningFartX = 1;
    this.fartX = 0;
    this.akselerasjonX = 0;
    this.fartsgrenseX = 4 * Spill.pikselPerMeter;
    this.deakselerasjonX = 10 * Spill.pikselPerMeter;

    this.fartY = 0;

    this.settBreddeHøyde = function(){
        var bilde = Ressurser.hentBilde(this.bane);
        this.bredde = ((this.bredde === 0 && (bilde.width / bilde.height) * this.høyde) || this.bredde);
        this.høyde = ((this.høyde === 0 && (bilde.height / bilde.width) * this.bredde) || this.høyde);
    };
    Ressurser.narKlar(this.settBreddeHøyde.bind(this));
}

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
    this.fartX += this.akselerasjonX * clock.delta;

    if(this.fartX * this.akselerasjonX < 0
        && -(this.deakselerasjonX * clock.delta) < this.fartX
        && this.fartX < this.deakselerasjonX * clock.delta)
        this.fartX = 0;

    this.akselerasjonX = (Math.abs(this.fartX) > 1 && (-this.retningFartX) * this.deakselerasjonX) || 0;

    this.x += this.fartX * clock.delta;
    this.retningFartX = (this.fartX != 0 && this.fartX/Math.abs(this.fartX)) || this.retningFartX;

    this.terrengHøyde = Terreng.nåværende.hentLineærY(this.x + this.bredde/2);

    this.y -= this.fartY * clock.delta;

    if(this.y + this.høyde > this.terrengHøyde)
        this.y = this.terrengHøyde - this.høyde;

    if(this.y + this.høyde !== this.terrengHøyde)
        this.fartY -= Spill.pikselPerMeter * Enhet.gravitasjon * clock.delta;
    else
        this.fartY = 0
};

Enhet.prototype.tegn = function(){
    var bilde = Ressurser.hentBilde(this.bane);
    if(bilde) {
        ctx.save();
        ctx.setTransform(this.retningFartX,0,0,1,this.x + (this.bredde/2),this.y + (this.høyde/2));
        ctx.drawImage(bilde, -this.bredde/2, -this.høyde/2, this.bredde, this.høyde);
        ctx.restore();
    }
};






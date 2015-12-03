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

    this.fartX = 0;
    this.fartsgrenseX = 6;

    this.fartY = 0;

    this.settBreddeHøyde = function(){
        var bilde = Ressurser.hentBilde(this.bane);
        this.bredde = ((this.bredde === 0 && (bilde.width / bilde.height) * this.høyde) || this.bredde);
        this.høyde = ((this.høyde === 0 && (bilde.height / bilde.width) * this.bredde) || this.høyde);
    };
    Ressurser.narKlar(this.settBreddeHøyde.bind(this));
}

Enhet.gravitasjon = 9.81;

//Medlemsfunksjoner

Enhet.prototype.move = function(retning, mengde){
    if(((this.fartX > -this.fartsgrenseX || retning === 1) && (this.fartX < this.fartsgrenseX || retning === -1))){
        this.fartX += (retning * mengde);
    }
};

Enhet.prototype.hopp = function(mengde){
    if(this.y + this.høyde + 10 > this.terrengHøyde && this.y + this.høyde - 10 < this.terrengHøyde)
        this.fartY = mengde;
};

Enhet.prototype.oppdater = function(){
    this.x += Spill.pikslerPerMeter * this.fartX * clock.delta;
    this.y -= Spill.pikslerPerMeter * this.fartY * clock.delta;
    this.terrengHøyde = Terreng.nåværende.hentLineærY(this.x + this.bredde/2);

    if(this.y + this.høyde > this.terrengHøyde)
        this.y = this.terrengHøyde - this.høyde;

    if(this.y + this.høyde !== this.terrengHøyde)
        this.fartY -= Spill.pikslerPerMeter/15 * Enhet.gravitasjon * clock.delta;
    else
        this.fartY = 0;
};

Enhet.prototype.tegn = function(){
    var bilde = Ressurser.hentBilde(this.bane);
    if(bilde) {
        ctx.drawImage(bilde, this.x, this.y, this.bredde, this.høyde);
    }
};






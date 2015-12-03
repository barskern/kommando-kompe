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

    this.settBreddeHøyde = function(){
        var bilde = Ressurser.hentBilde(this.bane);
        this.bredde = ((this.bredde === 0 && (bilde.width / bilde.height) * this.høyde) || this.bredde);
        this.høyde = ((this.høyde === 0 && (bilde.height / bilde.width) * this.bredde) || this.høyde);
    };
    Ressurser.narKlar(this.settBreddeHøyde.bind(this));
}

Enhet.prototype.oppdater = function(){

};


Enhet.prototype.tegn = function(){
    var bilde = Ressurser.hentBilde(this.bane);
    if(bilde) {
        ctx.drawImage(bilde, this.x, this.y, this.bredde, this.høyde);
    }
};




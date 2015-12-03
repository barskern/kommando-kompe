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
}

Spiller.prototype = Object.create(Enhet.prototype);
Spiller.prototype.constructor = Spiller;

Spiller.prototype.oppdater = function(){
    Enhet.prototype.oppdater.call(this);

    this.y = Terreng.nåværende.hentLineærY(this.x+this.bredde/2) - this.høyde;
    this.x += 80 * clock.delta;
};

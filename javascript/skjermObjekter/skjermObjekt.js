/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function SkjemObjekt(x,y,bredde,høyde){
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.høyde = høyde;
    this.rotasjon = 0;
    this.reflekterX = false;
    this.reflekterY = false;
}

SkjemObjekt.prototype.transformer = function(kontekst){
    kontekst = (!kontekst?ctx:kontekst);
    kontekst.translate(this.x+(this.bredde/2),this.y+(this.høyde/2));
    kontekst.rotate(this.rotasjon * (Math.PI/180));
    kontekst.scale((this.reflekterX?-1:1),(this.reflekterY?-1:1));
};
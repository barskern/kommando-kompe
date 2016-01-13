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
    this.reflekter = { x: false, y: false };
    this.skalar =  { x: 1, y:1 };
    this.roterRundt = { x: 0.5, y: 0.5 };
}

SkjemObjekt.prototype.transformer = function(kontekst){
    kontekst = (!kontekst?ctx:kontekst);
    kontekst.translate(this.x+(this.roterRundt.x * this.bredde),this.y+(this.roterRundt.y * this.høyde));
    kontekst.rotate(-(this.rotasjon * (Math.PI/180)));
    kontekst.scale(this.skalar.x * (this.reflekter.x?-1:1),this.skalar.y * (this.reflekter.y?-1:1));
};
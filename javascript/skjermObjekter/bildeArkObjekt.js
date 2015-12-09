/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function BildeArkObjekt(bane,x,y,bredde,høyde,rotasjon){
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.høyde = høyde;
    this.rotasjon = rotasjon;

    this.lag = [];
    this.settInnLag(0, bane, false);

    this.settBreddeHøyde = function(bane){
        var bilde = Ressurser.bildeHåndterer.hent(bane);
        this.bredde = ((this.bredde === 0 && (bilde.width / bilde.height) * this.høyde) || this.bredde);
        this.høyde = ((this.høyde === 0 && (bilde.height / bilde.width) * this.bredde) || this.høyde);
    };
    if(this.høyde === 0 || this.bredde === 0){
        Ressurser.nårRessurserKlare(this.settBreddeHøyde.bind(this,bane));
    }
}

BildeArkObjekt.prototype.settInnLag = function(indeks, bane, transformasjon){
    Ressurser.bildeHåndterer.last(bane);
    transformasjon = !transformasjon ? Matrise.identitet() : transformasjon;
    this.lag.splice(indeks, 0, {bane:bane, matrise:transformasjon});
};

BildeArkObjekt.prototype.oppdater = function(){

};

BildeArkObjekt.prototype.tegnLag = function(lag){
    var bilde = Ressurser.bildeHåndterer.hent(lag.bane);
    if(bilde){
        var m = lag.matrise;
        var bBredde = bilde.width;
        var bHøyde = bilde.height;
        var lagBredde = m[0][0]*this.bredde;
        var lagHøyde = m[1][1]*this.høyde;
        ctx.save();
        ctx.transform(lagBredde/bBredde, m[0][1], m[1][0], lagHøyde/bHøyde,
            m[2][0] + (lagBredde/2) - (this.bredde/2), m[2][1] + (lagHøyde/2) - (this.høyde/2));
        ctx.drawImage(bilde, (-bBredde/2), (-bHøyde/2), bBredde, bHøyde);
        ctx.restore();
    }
};

BildeArkObjekt.prototype.tegn = function(){
    ctx.save();
    ctx.translate(this.x + (this.bredde/2),this.y + (this.høyde/2)); // + (this.bredde/2)  + (this.høyde/2)
    ctx.rotate(this.rotasjon);
    this.lag.forEach(function(lag){
        this.tegnLag(lag);
    }.bind(this));
    ctx.restore();
};

BildeArkObjekt.tegnHjelpeLinje = function(x1,y1,x2,y2){
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
};
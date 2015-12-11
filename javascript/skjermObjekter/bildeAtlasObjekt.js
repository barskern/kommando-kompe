/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function BildeAtlasObjekt(atlas,bildeNavn,x,y,bredde,høyde){
    this.x = x;
    this.y = y;
    this.bredde = bredde;
    this.høyde = høyde;
    this.rotasjon = 0;
    this.atlas = atlas;
    this.bildeNavn = bildeNavn;
    this.reflekterX = false;
    this.reflekterY = false;

    this.lag = [];
    this.atlasBildeLag(0, false, bildeNavn);

    if(this.høyde === 0 || this.bredde === 0){
        Ressurser.nårKlareKall(this.settBreddeHøyde.bind(this,this.bildeNavn));
    }
}


BildeAtlasObjekt.tegnHjelpeLinje = function(x1,y1,x2,y2){
    ctx.save();
    ctx.strokeStyle = "black";
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.stroke();
    ctx.restore();
};

BildeAtlasObjekt.tegnGradient = function(x1,y1,x2,y2,x,y,bredde,høyde,farge1,farge2){
    ctx.save();
    ctx.translate(x,y);
    var overgang = ctx.createLinearGradient(x1,y1,x2,y2);
    overgang.addColorStop(0,farge1);
    overgang.addColorStop(1,farge2);
    ctx.fillStyle = overgang;
    ctx.fillRect(0,0,bredde,høyde);
    ctx.restore();
};



BildeAtlasObjekt.prototype.initLag = function(indeks, slettTidligere){
    if(!this.lag[indeks]) {
        this.lag.splice(indeks, (slettTidligere ? 1 : 0),
            {
                atlas: this.atlas, bildeNavn: undefined,
                rotasjon: 0, skalering: {x: 1, y: 1}, forflyttning: {x: 0, y: 0},
                reflekter: {x: false, y: false}
            }
        );
    }
};

BildeAtlasObjekt.prototype.atlasBildeLag = function(indeks, atlas, bildeNavn){
    var lag = this.lag[indeks];
    if(!lag){
        this.initLag(indeks, false);
        lag = this.lag[indeks];
    }
    lag.atlas = atlas;
    lag.bildeNavn = bildeNavn;
};

BildeAtlasObjekt.prototype.reflekterLag = function(indeks, reflekterX, reflekterY){
    var lagReflekter = this.lag[indeks].reflekter;
    lagReflekter.x = reflekterX;
    lagReflekter.y = reflekterY;
};

BildeAtlasObjekt.prototype.roterLag = function(indeks, mengde){
    this.lag[indeks].rotasjon += mengde;
};

BildeAtlasObjekt.prototype.skalerLag = function(indeks, xMengde, yMengde, nySkalering){
    nySkalering = (nySkalering === 'undefined');
    var skalering = this.lag[indeks].skalering;
    if(nySkalering){
        skalering.x = 1;
        skalering.y = 1;
    }
    skalering.x *= xMengde;
    skalering.y *= yMengde;
};

BildeAtlasObjekt.prototype.transformerLag = function(indeks, xMengde, yMengde){
    var lagForflyttning = this.lag[indeks].forflyttning;
    lagForflyttning.x += xMengde;
    lagForflyttning.y += yMengde;
};

BildeAtlasObjekt.prototype.tegnLag = function(lag){
    var bildeInfo = this.atlas.data[lag.bildeNavn];
    var atlasBilde = Ressurser.bildeHåndterer.atlas.hentBilde(this.atlas.navn);
    if(bildeInfo && atlasBilde){
        var lagBredde = this.bredde * lag.skalering.x;
        var lagHøyde = this.høyde * lag.skalering.y;
        ctx.save();
        ctx.translate(lag.forflyttning.x - (this.bredde/2) + lagBredde/2, lag.forflyttning.y - (this.høyde/2) + lagHøyde/2);
        ctx.rotate(lag.rotasjon * (Math.PI/180));
        ctx.scale((lag.reflekter.x ? -1 : 1),(lag.reflekter.y ? -1 : 1));
        ctx.drawImage(atlasBilde,
            bildeInfo.x, bildeInfo.y, bildeInfo.bredde, bildeInfo.høyde,
            (-lagBredde/2), (-lagHøyde/2), lagBredde, lagHøyde);
        ctx.restore();
    }
};

BildeAtlasObjekt.prototype.tegn = function(){
    ctx.save();
    ctx.translate(this.x + (this.bredde/2), this.y + (this.høyde/2));
    ctx.rotate(this.rotasjon * (Math.PI/180));
    ctx.scale((this.reflekterX ? -1 : 1),(this.reflekterY ? -1 : 1));
    this.lag.forEach(function(lag){
        this.tegnLag(lag);
    }.bind(this));
    ctx.restore();
};

BildeAtlasObjekt.prototype.settBreddeHøyde = function(bildeNavn, atlas, objekt){
    objekt = (!objekt ? this : objekt);
    atlas = (!atlas ? this.atlas : atlas);
    var bilde = atlas.data[bildeNavn];
    objekt.bredde = ((objekt.bredde === 0 && (bilde.bredde / bilde.høyde) * objekt.høyde) || objekt.bredde);
    objekt.høyde = ((objekt.høyde === 0 && (bilde.høyde / bilde.bredde) * objekt.bredde) || objekt.høyde);
};

BildeAtlasObjekt.prototype.settBreddeHøydeMedMinimum = function(bildeNavn, minimumsBredde, minimumsHøyde, atlas, objekt){
    objekt = (!objekt ? this : objekt);
    atlas = (!atlas ? this.atlas : atlas);
    var bilde = atlas.data[bildeNavn];
    if(minimumsBredde/minimumsHøyde <= bilde.bredde/bilde.høyde){
        objekt.høyde = minimumsHøyde;
        objekt.bredde = (bilde.bredde / bilde.høyde) * minimumsHøyde;
    } else {
        objekt.bredde = minimumsBredde;
        objekt.høyde = (bilde.høyde / bilde.bredde) * minimumsBredde;
    }
};
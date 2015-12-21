/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function BildeAtlasObjekt(atlas,bildeNavn,x,y,bredde,høyde){
    SkjemObjekt.call(this,x,y,bredde,høyde);
    this.atlas = atlas;
    this.bildeNavn = bildeNavn;
    this.bildeData = false;

    this.lag = [];

    Ressurser.nårKlareKall(function(){
        if(this.høyde === 0 || this.bredde === 0) this.settBreddeHøyde();
        this.atlasBildeLag(0, false, bildeNavn);
        this.lagBildeData();
    }.bind(this));
}

BildeAtlasObjekt.prototype = Object.create(SkjemObjekt.prototype);
BildeAtlasObjekt.prototype.constructor = BildeAtlasObjekt;


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


BildeAtlasObjekt.prototype.lagBildeData = function(){
    if(!this.bildeData && this.bredde && this.høyde){
        var tmpCanvas = document.createElement('canvas');
        tmpCanvas.width = 100000;
        tmpCanvas.height = 100000;
        var tmpctx = tmpCanvas.getContext('2d');
        BildeAtlasObjekt.prototype.tegn.call(this, tmpctx);
        this.bildeData = tmpctx.getImageData((this.x||0),this.y,this.bredde,this.høyde);
    }
};

BildeAtlasObjekt.prototype.initLag = function(indeks, slettTidligere){
    var lagObjekt = {
        atlas: this.atlas, bildeNavn: undefined,
        rotasjon: 0, relativX: 0, relativY: 0,
        bredde: this.bredde, høyde: this.høyde,
        reflekter: {x: false, y: false}, vis: true
    };
    if(!this.lag[indeks]) {
        this.lag.splice(indeks,0,lagObjekt);
    } else {
        if(slettTidligere){
           this.lag.splice(indeks,1,lagObjekt);
        }
    }
};

BildeAtlasObjekt.prototype.settSynlighetLag = function(indeks,synlighet){
    var lag = this.lag[indeks];
    if(lag) lag.vis = synlighet;
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
    var lag = this.lag[indeks];
    if(nySkalering){
        lag.bredde = this.bredde * xMengde;
        lag.høyde = this.høyde * xMengde;
    }
    lag.bredde *= xMengde;
    lag.høyde *= yMengde;
};

BildeAtlasObjekt.prototype.transformerLag = function(indeks, xMengde, yMengde){
    var lag = this.lag[indeks];
    lag.relativX += xMengde;
    lag.relativY += yMengde;
};

BildeAtlasObjekt.prototype.størrelseLag = function(indeks, bredde, høyde){
    var lag = this.lag[indeks];
    lag.bredde = bredde;
    lag.høyde = høyde;
};

BildeAtlasObjekt.prototype.tegnLag = function(lag, kontekst){
    kontekst = (!kontekst ? ctx : kontekst);
    var atlas = (lag.atlas || this.atlas);
    if(lag.bildeNavn) {
        var bildePosOgStørrelse = atlas.data[lag.bildeNavn];
        var atlasBilde = Ressurser.bildeHåndterer.atlas.hentBilde(atlas.navn);
        if (bildePosOgStørrelse && atlasBilde && lag.vis) {
            var lagBredde = lag.bredde;
            var lagHøyde = lag.høyde;
            kontekst.save();
            kontekst.translate(lag.relativX - (this.bredde / 2) + lagBredde / 2, lag.relativY - (this.høyde / 2) + lagHøyde / 2);
            kontekst.rotate(lag.rotasjon * (Math.PI / 180));
            kontekst.scale((lag.reflekter.x ? -1 : 1), (lag.reflekter.y ? -1 : 1));
            kontekst.drawImage(atlasBilde,
                bildePosOgStørrelse.x, bildePosOgStørrelse.y, bildePosOgStørrelse.bredde, bildePosOgStørrelse.høyde,
                (-lagBredde / 2), (-lagHøyde / 2), lagBredde, lagHøyde);
            kontekst.restore();
        }
    }
};


BildeAtlasObjekt.prototype.tegn = function(kontekst){
    kontekst = (!kontekst ? ctx : kontekst);
    kontekst.save();
    this.transformer(kontekst);
    this.lag.forEach(function(lag){
        this.tegnLag(lag,kontekst);
    }.bind(this));
    kontekst.restore();
};

BildeAtlasObjekt.prototype.settBreddeHøyde = function(bildeNavn, atlas, objekt){
    objekt = (!objekt ? this : objekt);
    atlas = (!atlas ? this.atlas : atlas);
    bildeNavn = (!bildeNavn ? this.bildeNavn : bildeNavn);
    if(bildeNavn && atlas && objekt) {
        var bilde = atlas.data[bildeNavn];
        objekt.bredde = ((objekt.bredde === 0 && (bilde.bredde / bilde.høyde) * objekt.høyde) || objekt.bredde);
        objekt.høyde = ((objekt.høyde === 0 && (bilde.høyde / bilde.bredde) * objekt.bredde) || objekt.høyde);
    }
};

BildeAtlasObjekt.prototype.settBreddeHøydeMedMinimum = function(bildeNavn, minimumsBredde, minimumsHøyde, atlas, objekt){
    objekt = (!objekt ? this : objekt);
    atlas = (!atlas ? this.atlas : atlas);
    if(bildeNavn){
        var bilde = atlas.data[bildeNavn];
        if(minimumsBredde/minimumsHøyde <= bilde.bredde/bilde.høyde){
            objekt.høyde = minimumsHøyde;
            objekt.bredde = (bilde.bredde / bilde.høyde) * minimumsHøyde;
        } else {
            objekt.bredde = minimumsBredde;
            objekt.høyde = (bilde.høyde / bilde.bredde) * minimumsBredde;
        }
    }
};
/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Våpen(eier,mål,type,globalX,globalY,bredde,høyde){
    VerdensObjekt.call(this,type.atlas,type.navn,globalX,globalY,bredde,høyde);

    this.eier = eier;
    this.mål = mål;
    this.type = type;
    this.prosjektiler = [];
    this.tidSidenSisteSkudd = Number.MAX_VALUE/2;

    this.lyd = new Lyd(type.lydType);

    if(this.type.effektType) {
        this.atlasBildeLag(1, this.type.effektType.atlas, this.type.effektType.bildeNavn);
        this.settSynlighetLag(1, false);
        this.størrelseLag(1, this.type.effektStørrelse[0], this.type.effektStørrelse[1]);
        this.settRelativPosLag(1,
            (this.type.relativtGeværløp[0] - ((this.type.effektStørrelse[0] / this.bredde) * this.type.effektType.relativtAnkerpunkt[0])),
            (this.type.relativtGeværløp[1] - ((this.type.effektStørrelse[1] / this.høyde) * this.type.effektType.relativtAnkerpunkt[1]))
        );
}

}

Våpen.prototype = Object.create(VerdensObjekt.prototype);
Våpen.prototype.constructor = Våpen;


Våpen.prototype.skyt = function(){
    if(this.tidSidenSisteSkudd > (1/this.type.skuddPerSekund)){
        this.prosjektiler.push(new Prosjektil(this,
            this.globalX+((this.reflekter.x ? -1 : 1)*0.3*this.bredde*this.type.relativtGeværløp[0]),
            this.globalY+(this.høyde*this.type.relativtGeværløp[1]),
            this.type.prosjektilType,!this.reflekter.x
        ));
        this.tidSidenSisteSkudd = 0;
        this.settSynlighetLag(1, true);

        if(this.lyd) this.lyd.avspill();
    }
};

Våpen.prototype.oppdater = function(eier){
    eier = (!eier ? this.eier : eier);
    this.tidSidenSisteSkudd += klokke.delta;
    if(this.type.effektType && this.tidSidenSisteSkudd > this.type.effektType.varighet) this.settSynlighetLag(1,false);

    if(eier){
        var eierAnkerX = Math.abs((eier.reflekter.x ? 1 : 0) - eier.relativtVåpenAnkerpunkt[0]) * eier.bredde;
        var våpenAnkerX = Math.abs((eier.reflekter.x ? 1 : 0) - this.type.relativtAnkerpunkt[0]) * this.bredde;
        var eierAnkerY = eier.relativtVåpenAnkerpunkt[1] * eier.høyde;
        var våpenAnkerY = this.type.relativtAnkerpunkt[1] * this.høyde;
        this.globalX = eier.globalX + eierAnkerX - våpenAnkerX;
        this.globalY = eier.globalY + eierAnkerY - våpenAnkerY;
        this.reflekter.x = eier.reflekter.x;
    }
    VerdensObjekt.prototype.oppdater.call(this);

    for(var i = 0; i < this.prosjektiler.length; i++){
        var prosjektil = this.prosjektiler[i];
        if(!prosjektil.død){
            prosjektil.oppdater(this.mål);
        } else {
            this.prosjektiler.splice(i,1);
        }
    }
};

Våpen.prototype.tegn = function(){
    this.prosjektiler.forEach(function(prosjektil){
        prosjektil.tegn();
    });
    BildeAtlasObjekt.prototype.tegn.call(this);
};


function Prosjektil(eier,globalX,globalY,type,positivRetning){
    this.eier = eier;
    this.globalX = globalX;
    this.globalY = globalY;
    this.x = globalX - Spill.globalX;
    this.y = globalY - Spill.globalY;
    this.type = type;
    this.positivRetning = positivRetning;
    this.død = false;
}

Prosjektil.prototype.oppdater = function(mål){
    if(mål) this.sjekkKollisjon(mål);
    this.globalX += ((this.positivRetning ? 1 : -1) * this.type.meterPerSekund * config.pikselPerMeter * klokke.delta);
    if(this.x > ctx.canvas.width || this.x < -this.type.bredde) this.død = true;
    this.x = this.globalX - Spill.globalX;
};

Prosjektil.prototype.hentKulePunkt = function(){
    return [(this.globalX+((this.positivRetning ? 1 : 0)*this.type.bredde)),(this.globalY+(this.type.høyde/2))];
};

Prosjektil.prototype.sjekkKollisjon = function(enheterEllerEnhet){
    var kulePunkt = this.hentKulePunkt();
    if(enheterEllerEnhet.constructor === Array){
        for(var i = 0; i < enheterEllerEnhet.length; i++) {
            if(this.sjekkKollisjon(enheterEllerEnhet[i])) break;
        }
    } else {
        if(!enheterEllerEnhet.død &&
            kulePunkt[0] > enheterEllerEnhet.globalX &&
            kulePunkt[0] < enheterEllerEnhet.globalX + enheterEllerEnhet.bredde &&
            kulePunkt[1] > enheterEllerEnhet.globalY &&
            kulePunkt[1] < enheterEllerEnhet.globalY + enheterEllerEnhet.høyde) {
            this.død = true;
            if(enheterEllerEnhet.truffetAvKuleLyd) enheterEllerEnhet.truffetAvKuleLyd.avspill();
            enheterEllerEnhet.taSkade(this.type.skade);
            if(enheterEllerEnhet.død){
                var våpen = this.eier;
                if(våpen){
                    var våpenEier = våpen.eier;
                    if(våpenEier && våpenEier.nårMotstanderDrept) våpenEier.nårMotstanderDrept(enheterEllerEnhet);
                }
            }
            return true;
        }
        return false;
    }
};

Prosjektil.prototype.tegn = function(){
    ctx.save();
    ctx.fillStyle = this.type.farge;
    ctx.translate(this.x, this.y);
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(this.type.bredde,0);
    ctx.lineTo(this.type.bredde,this.type.høyde);
    ctx.lineTo(0,this.type.høyde);
    ctx.fill();
    ctx.restore();
};


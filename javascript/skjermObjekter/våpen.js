/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Våpen(type,x,y,bredde,høyde){
    BildeAtlasObjekt.call(this,type.atlas,type.navn,x,y,bredde,høyde);
    this.type = type;
    this.skudd = [];
    this.tidSidenSisteSkudd = Number.MAX_VALUE/2;

    var nårKlar = function(){
        this.atlasBildeLag(1,Atlas.typer.effekter,"geværløpflamme");
        this.settSynlighetLag(1,false);
        this.transformerLag(1,this.bredde*this.type.relativtGeværløp[0],this.høyde*this.type.relativtGeværløp[1]-(this.høyde/2));
    }.bind(this);

    Ressurser.nårKlareKall(nårKlar);
}

Våpen.prototype = Object.create(BildeAtlasObjekt.prototype);
Våpen.prototype.constructor = Våpen;


Våpen.prototype.skyt = function(){
    if(this.tidSidenSisteSkudd > (1/this.type.skuddPerSekund)){
        this.skudd.push(new Prosjektil(
            this.x+((this.reflekterX ? -1 : 1)*this.bredde*this.type.relativtGeværløp[0]),
            this.y+(this.høyde*this.type.relativtGeværløp[1]),
            this.type.prosjektilType,!this.reflekterX
        ));
        this.tidSidenSisteSkudd = 0;
        this.settSynlighetLag(1,true);
    }
};

Våpen.prototype.oppdater = function(eier){
    this.tidSidenSisteSkudd += klokke.delta;
    if(this.tidSidenSisteSkudd > 0.08) this.settSynlighetLag(1,false);

    if(eier){
        var eierAnkerX = Math.abs((eier.reflekterX ? 1 : 0) - eier.relativtVåpenAnkerpunkt[0]) * eier.bredde;
        var våpenAnkerX = Math.abs((eier.reflekterX ? 1 : 0) - this.type.relativtAnkerpunkt[0]) * this.bredde;
        var eierAnkerY = eier.relativtVåpenAnkerpunkt[1] * eier.høyde;
        var våpenAnkerY = this.type.relativtAnkerpunkt[1] * this.høyde;
        this.x = eier.x + eierAnkerX - våpenAnkerX;
        this.y = eier.y + eierAnkerY - våpenAnkerY;
        this.reflekterX = eier.reflekterX;
    }

    for(var i = 0; i < this.skudd.length; i++){
        var nåværende = this.skudd[i];
        if(!nåværende.erUteAvSpillet){
            nåværende.oppdater();
        } else {
            this.skudd.splice(i,1);
        }
    }
};

Våpen.prototype.tegn = function(){
    BildeAtlasObjekt.prototype.tegn.call(this);
    this.skudd.forEach(function(skudd){
        skudd.tegn();
    });
};


function Prosjektil(x,y,type,positivRetning){
    this.x = x;
    this.y = y;
    this.type = type;
    this.positivRetning = positivRetning;
    this.erUteAvSpillet = false;
}

Prosjektil.prototype.oppdater = function(){
    this.x += ((this.positivRetning ? 1 : -1) * this.type.meterPerSekund * config.pikselPerMeter * klokke.delta);
    if(this.x > ctx.canvas.width || this.x < -this.type.bredde) this.erUteAvSpillet = true;
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


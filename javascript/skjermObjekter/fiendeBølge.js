/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function FiendeBølge(mål,globalX,globalY,typer,fiendeTypeIndeks,sekundPerFiende){
    this.mål = mål;
    this.globalX = globalX;
    this.globalY = globalY;
    this.typer = typer;
    this.fiendeTypeIndeks = fiendeTypeIndeks;
    this.sekundPerFiende = sekundPerFiende;
    this.tidSidenSistFiende = Number.MAX_VALUE/2;
    this.erTom = false;
    this.bølgeFiender = [];
    this.uSpawnedeFiender = (function(){
        var resultat = [];
        for(var i = 0; i < this.fiendeTypeIndeks.length; i++) {
            var nåværende = this.fiendeTypeIndeks[i];
            if (typeof nåværende === "number") {
                if (nåværende < this.typer.length) {
                    var fi = new this.typer[nåværende](mål,globalX,globalY);
                    resultat.push(fi);
                }
            }
        }
        return resultat;
    }.bind(this))();
}

FiendeBølge.prototype.oppdater = function(){
    this.tidSidenSistFiende += klokke.delta;

    if(this.tidSidenSistFiende > this.sekundPerFiende){
        this.spawnFiende();
        this.tidSidenSistFiende = 0;
    }
    for(var i = 0; i < this.bølgeFiender.length; i++){
        var nåværende = this.bølgeFiender[i];
        if(!nåværende.død){
            nåværende.oppdater();
        } else {
            this.bølgeFiender.splice(i,1);
            if(this.uSpawnedeFiender.length == 0 && this.bølgeFiender.length == 0) {
                this.erTom = true;
                break;
            }
            i--;
        }
    }
};

FiendeBølge.prototype.spawnFiende = function(){
    if(this.uSpawnedeFiender.length > 0){
        var fi = this.uSpawnedeFiender.shift();
        fi.globalX = (Spill.globalX + ctx.canvas.width / 2) + (ctx.canvas.width * (Math.random() > 0.5 ? 1 : -1));
        fi.akselerasjonX *= Math.random() + 0.5;
        fi.fartsgrenseX *= Math.random() + 0.5;
        fi.spawn();
        this.bølgeFiender.push(fi);
    }
};

FiendeBølge.prototype.tegn = function(){
    this.bølgeFiender.forEach(function(fiende){
        if(fiende) fiende.tegn();
    });
};
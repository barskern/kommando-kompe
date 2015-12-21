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
    this.fiender = [];
    this.uSpawnedeFiender = (function(){
        var resultat = [];
        for(var i = 0; i < this.fiendeTypeIndeks.length; i++) {
            var nåværende = this.fiendeTypeIndeks[i];
            if (typeof nåværende === "number") {
                if (nåværende < this.typer.length) {
                    var type = this.typer[nåværende];
                    var fi = new Fiende(this.mål, type, this.globalX, this.globalY, type.bredde, type.høyde);
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
    for(var i = 0; i < this.fiender.length; i++){
        var nåværende = this.fiender[i];
        if(!nåværende.død){
            nåværende.oppdater();
        } else {
            this.fiender.splice(i,1);
            i--;
        }
    }
};

FiendeBølge.prototype.spawnFiende = function(){
    if(this.uSpawnedeFiender.length > 0){
        var fi = this.uSpawnedeFiender.shift();
        fi.spawn();
        fi.globalX = this.mål.globalX + 1000*(Math.random() > 0.5 ? 1 : -1);
        this.fiender.push(fi);
    }
};

FiendeBølge.prototype.tegn = function(){
    this.fiender.forEach(function(fiende){
        if(fiende) fiende.tegn();
    });
};
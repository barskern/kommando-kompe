/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Fiende(atlas,bildeNavn,mål,globalX,globalY,bredde,høyde){
    Enhet.call(this,atlas,bildeNavn,globalX,globalY,bredde,høyde);
    this.mål = mål;
    this.erSpawnet = false;

    this.poengForDrap = 0;

    this.helsebar = new Statusbar(this.x,this.y,this.bredde,9,"red");
    this.helsebar.lagKantLinje(1,"white");
}

Fiende.prototype = Object.create(Enhet.prototype);
Fiende.prototype.constructor = Fiende;

Fiende.nåværendeFiender = [];

Fiende.sorterAlleLagdeFiender = function(){
    Fiende.nåværendeFiender.sort(function(fiende1, fiende2){
        return fiende1.globalX - fiende2.globalX;
    });
};

Fiende.prototype.spawn = function(){
    this.erSpawnet = true;
    Fiende.nåværendeFiender.push(this);
};

Fiende.prototype.drep = function(){
    Enhet.prototype.drep.call(this);
    Fiende.nåværendeFiender.splice(Fiende.nåværendeFiender.indexOf(this),1);
};

Fiende.prototype.oppdater = function(){
    this.retningFartX = (this.mål.globalX < this.globalX) ? -1 : 1;
    this.reflekterX = (this.retningFartX < 0);
    Enhet.prototype.oppdater.call(this);

    this.helsebar.x = this.x;
    this.helsebar.y = this.y - 20;
    this.helsebar.nåværendeProssess = this.liv/this.maxLiv;
};

Fiende.prototype.tegn = function(){
    Enhet.prototype.tegn.call(this);
    this.helsebar.tegn();
};


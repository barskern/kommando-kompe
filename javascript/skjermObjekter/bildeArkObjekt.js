/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function BildeArkObjekt(bane,x,y,bredde,høyde){
    this.lag = [];
    this.settInnLag(0, bane, [x,y,bredde,høyde], Matrise.identitet());
}

BildeArkObjekt.prototype.settInnLag = function(indeks,bane,matrise){
    matrise = !matrise ? Matrise.identitet() : matrise;
    this.lag.splice(indeks,0,[bane,matrise]);
};

BildeArkObjekt.prototype.tegn = function(){
    this.lag.forEach(function(lag){

    });
};
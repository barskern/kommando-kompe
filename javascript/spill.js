/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill() {
    this.underKonstruksjon = new BildeObjekt("underKonstruksjonBannere.png",0,0,600,0); //TODO Midlertidig banner for å vise at siden er under konstruksjon
    this.terreng = new Terreng("landskapEksempel640x417.jpg",[[-Number.MAX_VALUE,400-60,1],[Number.MAX_VALUE,400-60,1]]);
    this.terreng.settSomNåværende();
    this.spiller = new Spiller("KommandoKalleFigur.png",100,400-44,0,1.8 * Spill.pikselPerMeter);

    this.oppdater = function(){
        this.terreng.oppdater();
        this.spiller.oppdater();
    };
    this.tegn = function(){
        this.terreng.tegn();
        this.spiller.tegn();
        this.underKonstruksjon.tegn();
    };
}

Spill.pikselPerMeter = 110;
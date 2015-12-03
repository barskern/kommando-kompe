/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill() {
    this.terreng = new Terreng([[0,400 - 150,20,1],[130,400-40,20,1],[300,400 - 100,20,1],[600,400 - 60,20,1]]);
    this.terreng.settSomNåværende();
    this.spiller = new Spiller("KommandoKalleFigur.png",50,0,0,1.8*Spill.pikslerPerMeter);

    this.oppdater = function(){
        this.terreng.oppdater();
        this.spiller.oppdater();
    };
    this.tegn = function(){
        this.spiller.tegn();
        this.terreng.tegn();
    };
}

Spill.pikslerPerMeter = 40;
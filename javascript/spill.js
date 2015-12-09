/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill() {
    this.terreng = new Terreng("landskapEksempel640x417.jpg",[[-Number.MAX_VALUE,400-60,1],[Number.MAX_VALUE,400-60,1]]);
    this.terreng.settSomNåværende();
    this.spiller = new Spiller("KommandoKalleFigur.png",100,400-44,0,1.8*Spill.pikselPerMeter);
    this.bao = new BildeArkObjekt("CommandoCompe.png",300,200,0,Spill.pikselPerMeter,0);

    Ressurser.bildeHåndterer.atlas.last("Challagundla4Weapons.png");

    this.oppdater = function(){
        this.terreng.oppdater();
        this.spiller.oppdater();
    };
    this.tegn = function(){
        //ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.fillStyle = "white";
        ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
        this.terreng.tegn();
        this.spiller.tegn();

        BildeArkObjekt.tegnHjelpeLinje(0,200,600,200);
        BildeArkObjekt.tegnHjelpeLinje(300,0,300,400);

        this.bao.tegn();
    };
}

Spill.pikselPerMeter = 110;
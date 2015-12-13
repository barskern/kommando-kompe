/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill() {
    this.terreng = new Terreng(Terreng.typer.SKOGLAND);
    this.terreng.settSomNåværende();

    this.spiller = new Spiller(Atlas.typer.spillerOgTerreng,"KommandoKalleFigur",2*config.pikselPerMeter,config.pikselPerMeter,0,1.8*config.pikselPerMeter,0);

    this.init = function(){
        this.terreng.init();
    };


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

        /*for(var i = 1; i < Math.max(ctx.canvas.width,ctx.canvas.height)/config.pikselPerMeter; i++){
            BildeAtlasObjekt.tegnHjelpeLinje(i*config.pikselPerMeter,0,i*config.pikselPerMeter,ctx.canvas.height);
            BildeAtlasObjekt.tegnHjelpeLinje(0,i*config.pikselPerMeter,ctx.canvas.width,i*config.pikselPerMeter);
        }*/

    };
}
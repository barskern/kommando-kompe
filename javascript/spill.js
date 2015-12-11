/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill() {
    this.terreng = new TerrengAtlas(Atlas.typer.spillerOgTerreng,"landskapEksempel640x417",
        [[-Number.MAX_VALUE,400-60,1],[Number.MAX_VALUE,400-60,1]]);
    this.terreng.settSomNåværende();

    this.spiller = new SpillerAtlas(Atlas.typer.spillerOgTerreng,"KommandoKalleFigur",2*Spill.pikselPerMeter,Spill.pikselPerMeter,0,1.8*Spill.pikselPerMeter,0);

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

        /*for(var i = 1; i < Math.max(ctx.canvas.width,ctx.canvas.height)/Spill.pikselPerMeter; i++){
            BildeAtlasObjekt.tegnHjelpeLinje(i*Spill.pikselPerMeter,0,i*Spill.pikselPerMeter,ctx.canvas.height);
            BildeAtlasObjekt.tegnHjelpeLinje(0,i*Spill.pikselPerMeter,ctx.canvas.width,i*Spill.pikselPerMeter);
        }*/

    };
}

Spill.pikselPerMeter = 110;
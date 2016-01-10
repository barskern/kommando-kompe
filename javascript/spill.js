/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill(levelNavn, levelNummer) {

    this.level = new Level(1);



    this.init = function(){
        this.level.init();
        this.alleKlikkbareObjekter = [this.level.tilMenyen];
    };

    this.oppdater = function(){
        this.level.oppdater();
    };

    this.tegn = function(){
        this.level.tegn();

        //Tegn rutenett
        /*for(var i = 1; i < Math.max(ctx.canvas.width,ctx.canvas.height)/config.pikselPerMeter; i++){
            BildeAtlasObjekt.tegnHjelpeLinje(i*config.pikselPerMeter,0,i*config.pikselPerMeter,ctx.canvas.height);
            BildeAtlasObjekt.tegnHjelpeLinje(0,i*config.pikselPerMeter,ctx.canvas.width,i*config.pikselPerMeter);
        }*/
    };
}
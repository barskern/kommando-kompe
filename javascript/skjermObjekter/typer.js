/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

Terreng.typer = (function(){
    function Egenskap(atlas,bildeNavn,initNøkkelpunktKart){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.initNøkkelpunktKart = initNøkkelpunktKart;
        this.nøkkelpunktKart = undefined;
    }
    return {
        SKOGLAND: new Egenskap(Atlas.typer.spillerOgTerreng,"landskapEksempel640x417",function(){
                return [[-Number.MAX_VALUE, 0.85 * ctx.canvas.height, Terreng.typer.GRESS], [Number.MAX_VALUE, 0.85 * ctx.canvas.height, Terreng.typer.GRESS]];
            }
        )
    };
})();

Prosjektil.typer = (function(){
    function Egenskaper(bredde,høyde,meterPerSekund,farge){
        this.bredde = bredde;
        this.høyde = høyde;
        this.meterPerSekund = meterPerSekund;
        this.farge = farge;
    }
    return {
        VANLIG: new Egenskaper(config.pikselPerMeter,config.pikselPerMeter*0.02,12,"yellow")
    };
})();

Våpen.typer = (function(){
    function Egenskaper(atlas,navn,lyd,relativeAnkerpunkt,relativtGeværløp,skuddPerMinutt,prosjektilType){
        this.atlas = atlas;
        this.navn = navn;
        this.lyd = lyd;
        this.relativtAnkerpunkt = relativeAnkerpunkt;
        this.relativtGeværløp = relativtGeværløp;
        this.skuddPerSekund = skuddPerMinutt / 60;
        this.prosjektilType = prosjektilType;
    }
    return {
        SPAS12: new Egenskaper(Atlas.typer.Challagundla4Weapons,"Spas - 12",false,[(892/1660),(354/672)],[0,0],30,Prosjektil.typer.VANLIG),
        M97Rifle: new Egenskaper(Atlas.typer.Challagundla4Weapons,"M97 Rifle",false,[0.33,0.5],[0,0],200,Prosjektil.typer.VANLIG)
    };
})();
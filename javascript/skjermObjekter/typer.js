/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var Mønster = {};
Mønster.typer = {};

Ressurser.nårKlareKall(function() {
    Mønster.typer = (function () {
        function Egenskaper(mønster){
            this.mønster = mønster;
        }
        var alleMønster = {}, atlasType = Atlas.typer.mønster, mønsterJSON = atlasType.hentJSON(), atlasBilde = atlasType.hentBilde();
        for(var nåværendeNavn in mønsterJSON){
            if(mønsterJSON.hasOwnProperty(nåværendeNavn)) {
                var nåværende = mønsterJSON[nåværendeNavn];
                var tmpcanvas = document.createElement('canvas'), tmpctx = tmpcanvas.getContext('2d');
                tmpcanvas.width = nåværende.bredde;
                tmpcanvas.height = nåværende.høyde;
                tmpctx.drawImage(atlasBilde,nåværende.x,nåværende.y,nåværende.bredde,nåværende.høyde,0,0,nåværende.bredde,nåværende.høyde);
                if(!alleMønster[nåværendeNavn]) alleMønster[nåværendeNavn] = new Egenskaper(tmpctx.createPattern(tmpcanvas,"repeat"));
            }
        }
        return alleMønster;
    })();
});

Terreng.typer = (function(){
    function Egenskaper(atlas,bildeNavn,initNøkkelpunktKart){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.initNøkkelpunktKart = initNøkkelpunktKart;
        this.nøkkelpunktKart = undefined;
    }
    return {
        SKOGLAND: new Egenskaper(Atlas.typer.spillerOgTerreng,"landskapEksempel640x417",function(){
                return [[-Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1], [Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1]];
            }
        )
    };
})();

Effekt.typer = (function(){
    function Egenskaper(atlas,bildeNavn,varighet){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.varighet = varighet;
    }
    return {
        GEVÆRLØPBLINK: new Egenskaper(Atlas.typer.effekter,"geværløpflamme",0.08)
    }
})();

Prosjektil.typer = (function(){
    function Egenskaper(bredde,høyde,meterPerSekund,skade,farge){
        this.bredde = bredde;
        this.høyde = høyde;
        this.meterPerSekund = meterPerSekund;
        this.farge = farge;
        this.skade = skade;
    }
    return {
        VANLIG: new Egenskaper(config.pikselPerMeter,config.pikselPerMeter*0.02,12,20,"red"),
        STORKULE: new Egenskaper(config.pikselPerMeter*0.2,config.pikselPerMeter*0.2,10,10,"yellow")
    };
})();

Våpen.typer = (function(){
    function Egenskaper(atlas,navn,lyd,relativeAnkerpunkt,relativtGeværløp,skuddPerMinutt,prosjektilType,effekt){
        this.atlas = atlas;
        this.navn = navn;
        this.lyd = lyd;
        this.relativtAnkerpunkt = relativeAnkerpunkt;
        this.relativtGeværløp = relativtGeværløp;
        this.skuddPerSekund = skuddPerMinutt / 60;
        this.prosjektilType = prosjektilType;
        this.effekt = effekt;
    }
    return {
        ROBOTBRYSTKANON: new Egenskaper(false,false,false,[0,0],[0,0],40,Prosjektil.typer.STORKULE),
        SPAS12: new Egenskaper(Atlas.typer.Challagundla4Weapons,"Spas - 12",false,[(892/1660),(354/672)],[0,0],30,Prosjektil.typer.VANLIG),
        M97Rifle: new Egenskaper(Atlas.typer.Challagundla4Weapons,"M97 Rifle",false,[0.33,0.5],[0.9,0.22],500,Prosjektil.typer.VANLIG)
    };
})();

Fiende.typer = (function(){
    function Egenskaper(atlas,bildeNavn,bredde,høyde,våpenType,relativtVåpenAnkerpunkt,akselerasjonX,akselerasjonY,poengForDrap){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.bredde = bredde;
        this.høyde = høyde;
        this.våpenType = våpenType;
        this.relativtVåpenAnkerpunkt = relativtVåpenAnkerpunkt;
        this.nåværendeAkselerasjonX = akselerasjonX;
        this.akselerasjonY = akselerasjonY;
        this.poengForDrap = poengForDrap;
    }
    return {
        ROBOT: new Egenskaper(Atlas.typer.enheter,"fiendeRobot",0,2*config.pikselPerMeter,
            Våpen.typer.ROBOTBRYSTKANON,[0.6,0.2],
            config.pikselPerMeter/80,config.pikselPerMeter/100,100)
    };
})();
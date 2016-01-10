/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var Mønster = {};
Mønster.typer = (function () {
    function Egenskaper(atlas,bildeNavn){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.mønster = false;

        Ressurser.nårKlareKall(function(){
            var nåværende = this.atlas.hentJSON()[this.bildeNavn], tmpcanvas = document.createElement('canvas'), tmpctx = tmpcanvas.getContext('2d');
            tmpcanvas.width = nåværende.bredde;
            tmpcanvas.height = nåværende.høyde;
            tmpctx.drawImage(this.atlas.hentBilde(),nåværende.x,nåværende.y,nåværende.bredde,nåværende.høyde,0,0,nåværende.bredde,nåværende.høyde);
            this.mønster = tmpctx.createPattern(tmpcanvas,"repeat");
        }.bind(this));

    }
    return {
        KAMUFLASJE: new Egenskaper(Atlas.typer.KommandoKompeAtlas, "kamuflasjeMonster"),
        METALL: new Egenskaper(Atlas.typer.KommandoKompeAtlas, "metallMonster")
    };
})();

Terreng.typer = (function(){
    function Egenskaper(atlas,bildeNavn,initNøkkelpunktKart){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.initNøkkelpunktKart = initNøkkelpunktKart;
        this.nøkkelpunktKart = undefined;
    }
    return {
        SKOGLAND: new Egenskaper(Atlas.typer.KommandoKompeAtlas,"skogland",function(){
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
        GEVÆRLØPBLINK: new Egenskaper(Atlas.typer.KommandoKompeAtlas,"geværlopflamme",0.08),
        BLOOD: new Egenskaper(Atlas.typer.KommandoKompeAtlas,"blodEffekt",3)
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
        M4A1PULSERIFLE: new Egenskaper(Atlas.typer.KommandoKompeAtlas,"M4A1_PulseRifle",false,[0,0],[0,0],300,Prosjektil.typer.VANLIG),
        M97RIFLE: new Egenskaper(Atlas.typer.KommandoKompeAtlas,"M97Rifle",false,[0.33,0.5],[0.9,0.22],500,Prosjektil.typer.VANLIG)
    };
})();
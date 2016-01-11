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

        Ressurser.nårRessurserKlareKall(function(){
            var nåværende = this.atlas.hentJSON()[this.bildeNavn], tmpcanvas = document.createElement('canvas'), tmpctx = tmpcanvas.getContext('2d');
            tmpcanvas.width = nåværende.bredde;
            tmpcanvas.height = nåværende.høyde;
            tmpctx.drawImage(this.atlas.hentBilde(),nåværende.x,nåværende.y,nåværende.bredde,nåværende.høyde,0,0,nåværende.bredde,nåværende.høyde);
            this.mønster = tmpctx.createPattern(tmpcanvas,"repeat");
        }.bind(this));

    }
    return {
        KAMUFLASJE: new Egenskaper(Atlas.typer.TING, "kamuflasjeMonster"),
        METALL: new Egenskaper(Atlas.typer.TING, "metallMonster")
    };
})();

Lyd.typer = (function() {
    function Egenskaper(lydNavn){
        Ressurser.filHåndterer.last.lyd("lyder/"+lydNavn);
        this.lydNavn = lydNavn;
        this.hentBuffer = function(){
            return Ressurser.filHåndterer.hent.lyd("lyder/"+this.lydNavn);
        }
    }

    return {
        BAKGRUNN: new Egenskaper("menyBakgrunn.mp3"),
        SUBMACHINEGUN: new Egenskaper("submachinegun.mp3"),
        PISTOL: new Egenskaper("pistol.mp3"),
        KULETREFFERMETALL: new Egenskaper("kuleTrefferMetall.mp3")
    };
})();


Terreng.typer = (function(){
    function Egenskaper(atlas,bildeNavn,bildeKomponenter,initNøkkelpunktKart){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.komponenter = bildeKomponenter;
        this.initNøkkelpunktKart = initNøkkelpunktKart;
        this.nøkkelpunktKart = undefined;
    }
    return {
        SKOGLAND: new Egenskaper(Atlas.typer.LANDSKAP,"skogland",1,function(){
                return [[-Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1], [Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1]];
            }
        ),
        URBAN: new Egenskaper(Atlas.typer.LANDSKAP,"urban4Komponent",function(){
                return [[-Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1], [Number.MAX_VALUE, 0.85 * ctx.canvas.height, 1]];
        })
    };
})();

Effekt.typer = (function(){
    function Egenskaper(atlas,bildeNavn,relativtAnkerpunkt,varighet){
        this.atlas = atlas;
        this.bildeNavn = bildeNavn;
        this.varighet = varighet;
        this.relativtAnkerpunkt = relativtAnkerpunkt;
    }
    return {
        GEVÆRLØPBLINK: new Egenskaper(Atlas.typer.TING,"geværlopflamme",[0,0.5],0.08),
        BLOOD: new Egenskaper(Atlas.typer.TING,"blodEffekt",[0,0],3)
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
        STORKULE: new Egenskaper(config.pikselPerMeter*0.2,config.pikselPerMeter*0.2,10,10,"yellow"),
        PLASMA: new Egenskaper(config.pikselPerMeter*0.6,config.pikselPerMeter*0.02,11,26,"purple")
    };
})();

Våpen.typer = (function(){
    function Egenskaper(atlas,navn,lydType,relativeAnkerpunkt,relativtGeværløp,skuddPerMinutt,prosjektilType,effektType,effektStørrelse){
        this.atlas = atlas;
        this.navn = navn;
        this.lydType = lydType;
        this.relativtAnkerpunkt = relativeAnkerpunkt;
        this.relativtGeværløp = relativtGeværløp;
        this.skuddPerSekund = skuddPerMinutt / 60;
        this.prosjektilType = prosjektilType;
        this.effektType = effektType;
        this.effektStørrelse = effektStørrelse;
    }
    return {
        ROBOTBRYSTKANON: new Egenskaper(false,false,false,[0,0],[0,0],40,Prosjektil.typer.STORKULE),
        M4A1PULSERIFLE: new Egenskaper(Atlas.typer.TING,"M4A1_PulseRifle",Lyd.typer.PISTOL,[0.3,0.5],[0.94,0.25],300,
            Prosjektil.typer.PLASMA,Effekt.typer.GEVÆRLØPBLINK,[config.pikselPerMeter * 0.4,config.pikselPerMeter * 0.15]),
        M97RIFLE: new Egenskaper(Atlas.typer.TING,"M97Rifle",Lyd.typer.PISTOL,[0.33,0.5],[0.9,0.21],500,
            Prosjektil.typer.VANLIG,Effekt.typer.GEVÆRLØPBLINK,[config.pikselPerMeter * 0.4,config.pikselPerMeter * 0.15])
    };
})();
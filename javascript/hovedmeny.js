/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Hovedmeny(){

    this.overskrift = new TekstObjekt("Kommando Kompe",0,0,"black","Stencil");
    this.spillKnapp = new MønsterKnapp("SPILL",undefined,100,100,170,70,
        function(){this.tekst.fillStyle = "white";},
        function(){this.tekst.fillStyle = "black"},
        function(){StatusHåndterer.byttStatus(StatusHåndterer.typer.SPILL)});
    this.alleKlikkbareObjekter = [this.spillKnapp];
}

Hovedmeny.prototype.init = function(){
    this.spillKnapp.mønster = Mønster.typer["metalLiten"].mønster;
    this.spillKnapp.tekst.fillStyle = "black";
    this.spillKnapp.tekst.font = "Stencil";
    this.spillKnapp.tekst.fontSize = 50;

    this.overskrift.fontSize = 70;
    this.overskrift.settBreddeAvTekst();
};

Hovedmeny.prototype.oppdater = function(){
    (function SentrerKnapper(){
        var senterCanvasX = ctx.canvas.width/2;
        var senterCanvasY = ctx.canvas.height/2;
        this.overskrift.x = senterCanvasX - this.overskrift.bredde/2;
        this.overskrift.y = senterCanvasY - this.overskrift.fontSize/2 - (100+this.overskrift.fontSize);
        this.spillKnapp.x = senterCanvasX - this.spillKnapp.bredde/2;
        this.spillKnapp.y = senterCanvasY - this.spillKnapp.høyde/2 - 50;
    }.bind(this))();

    this.spillKnapp.oppdater();
};

Hovedmeny.prototype.tegn = function(){
    ctx.fillStyle = Mønster.typer["norskKamuflasje2Liten"].mønster;
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.spillKnapp.tegn();
    this.overskrift.tegn();
};
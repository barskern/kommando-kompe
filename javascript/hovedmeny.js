/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

function Hovedmeny(){
    this.fjesHopping = {xFart:100,yFart:0,xAks:0,yAks:9.81};
}

Hovedmeny.prototype.init = function(){
    this.overskrift = new TekstObjekt("Kommando Kompe",0,0,"black","Stencil");
    this.bunnTekst = new TekstObjekt("Av Ole Martin Ruud og Emil Barkeland",0,0,"black","Stencil");

    this.spillKnapp = new MønsterKnapp("NYTT SPILL",0,0,300,70,
        function(){
            this.tekst.fillStyle = "white";
            this.tekst.kantlinje.strokeStyle = "black";
            var reduserMed = 4;
            this.skalar.y = this.skalar.x = (this.bredde-2*reduserMed)/this.bredde;
        },
        function(){
            this.tekst.fillStyle = "black";
            this.tekst.kantlinje.strokeStyle = "white";
            this.skalar.x = this.skalar.y = 1;
        },
        function(){
            StatusHåndterer.byttStatus(StatusHåndterer.typer.SPILL,["skogland", 1]);
        }
    );

    this.kommandoKompeFjes = new BildeAtlasObjekt(Atlas.typer.TING, "KommandoKompeAnsikt",0,200,200,0);
    this.kommandoKompeFjes.rotasjon = 12;

    this.alleKlikkbareObjekter = [this.spillKnapp];


    this.overskrift.høyde = 70;
    this.overskrift.lagKantLinje(1,"white");
    this.overskrift.settBreddeAvTekst();

    this.bunnTekst.høyde = 12;

    this.spillKnapp.lagKantLinje(2,"white");
    this.spillKnapp.mønster = Mønster.typer.METALL.mønster;
    this.spillKnapp.tekst.fillStyle = "black";
    this.spillKnapp.tekst.font = "Stencil";
    this.spillKnapp.tekst.høyde = 50;
    this.spillKnapp.tekst.lagKantLinje(1,"white");

    this.lyd = new Lyd(Lyd.typer.BAKGRUNN);
    this.lyd.loop = true;
    this.lyd.avspill();
};

Hovedmeny.prototype.oppdater = function(){
    var senterCanvasX = ctx.canvas.width/2;
    var senterCanvasY = ctx.canvas.height/2;

    this.overskrift.x = senterCanvasX - this.overskrift.bredde/2;
    this.overskrift.y = senterCanvasY - this.overskrift.høyde/2 - (100 + this.overskrift.høyde);
    this.bunnTekst.y = 2*senterCanvasY - this.bunnTekst.høyde - 4;
    this.bunnTekst.x = 4;
    this.spillKnapp.x = senterCanvasX - this.spillKnapp.bredde/2;
    this.spillKnapp.y = senterCanvasY - this.spillKnapp.høyde/2 - 50;

    this.fjesHopping.yFart += this.fjesHopping.yAks;
    this.fjesHopping.xFart += this.fjesHopping.xAks;
    if(this.kommandoKompeFjes.y + this.kommandoKompeFjes.høyde > 2*senterCanvasY) this.fjesHopping.yFart = -400;
    if(this.kommandoKompeFjes.x < 0 || this.kommandoKompeFjes.x + this.kommandoKompeFjes.bredde > 2*senterCanvasX) {
        this.fjesHopping.xFart = -this.fjesHopping.xFart;
        this.kommandoKompeFjes.reflekter.x = !this.kommandoKompeFjes.reflekter.x;
        this.kommandoKompeFjes.rotasjon = -this.kommandoKompeFjes.rotasjon;
    }

    this.kommandoKompeFjes.x += this.fjesHopping.xFart*klokke.delta;
    this.kommandoKompeFjes.y += this.fjesHopping.yFart*klokke.delta;

    this.spillKnapp.oppdater();
};

Hovedmeny.prototype.tegn = function(){
    ctx.fillStyle = Mønster.typer.KAMUFLASJE.mønster;
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);

    this.spillKnapp.tegn();
    this.overskrift.tegn();
    this.kommandoKompeFjes.tegn();
    this.bunnTekst.tegn();
};
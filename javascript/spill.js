/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */


function Spill(levelNavn, levelNummer) {

    this.levelNummer = levelNummer;
    this.levelErOver = false;

    this.tidMellomRunder = 5;
    this.runde = {nr:0,startet:false,sluttet:false,tidSidenForrige:0};

    this.visAnnonsering = false;
    this.tidSomAnnonseringSkalVises = 5;
    this.nåværendeAnnonseringsTid = 0;
    this.annonseringsTittel = new TekstObjekt("",0,0,"black","Stencil");
    this.poengTekstObjekt = new TekstObjekt("Poeng: ",4,4,"black","Stencil");
}

Spill.prototype.lagNyFiendeBølge = function(){
    this.runde.nr++;
    this.runde.starter = true;
    var arr = [];
    for(var i = 0; i < 1.6 * this.runde.nr; i++) arr[i] = 0;

    this.fiendeBølge = new FiendeBølge(this.nåværendeFiendeMål,1000,200,[FiendeRobot],arr,1.7);

    var senterCanvasX = ctx.canvas.width/2;
    var senterCanvasY = ctx.canvas.height/2;

    this.visAnnonsering = true;
    this.nåværendeAnnonseringsTid = 0;
    this.annonseringsTittel.tekst = "Runde "+this.runde.nr+" starter";
    this.annonseringsTittel.x = senterCanvasX;
    this.annonseringsTittel.y = 0.4*senterCanvasY;
    this.annonseringsTittel.sentrerTeksten();

    this.runde.sluttet = false;
    this.runde.startet = true;
};

Spill.prototype.init = function(){
    this.runde.nr = 0;

    this.tilMenyen = new MønsterKnapp("EXIT",ctx.canvas.width-5-120,5,120,60,
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
            StatusHåndterer.byttStatus(StatusHåndterer.typer.HOVEDMENY);
        }
    );

    this.tilMenyen.lagKantLinje(2,"white");
    this.tilMenyen.mønster = Mønster.typer.METALL.mønster;
    this.tilMenyen.tekst.fillStyle = "black";
    this.tilMenyen.tekst.font = "Stencil";
    this.tilMenyen.tekst.høyde = 50;
    this.tilMenyen.tekst.lagKantLinje(1,"white");

    this.terreng = new Terreng(Terreng.typer.URBAN);
    this.terreng.settSomNåværende();

    Spill.globalX = 0;
    Spill.globalY = 0;


    this.spiller = new Spiller(Atlas.typer.TING,"kommandoKalleOverkropp",2*config.pikselPerMeter,ctx.canvas.height,
        0,1.8*config.pikselPerMeter,0);

    this.nåværendeFiendeMål = this.spiller;

    this.fiendeBølge = {};

    this.lagNyFiendeBølge();
    this.runde.startet = true;

    this.terreng.init();
    this.spiller.init();

    this.poengTekstObjekt.høyde = 32;
    this.annonseringsTittel.høyde = 50;
    this.annonseringsTittel.lagKantLinje(1,"white");

    this.alleKlikkbareObjekter = [this.tilMenyen];
};

Spill.prototype.oppdater = function(){
    this.tilMenyen.oppdater();
    if(this.spiller.død){
        var tmpPoengTekstObj = this.poengTekstObjekt;
        var senterCanvasX = ctx.canvas.width/2;
        var senterCanvasY = ctx.canvas.height/2;
        this.annonseringsTittel.settBreddeAvTekst();

        this.visAnnonsering = true;
        this.nåværendeAnnonseringsTid = 0;
        this.annonseringsTittel.tekst = "Du døde! Prøv igjen!";
        this.annonseringsTittel.x = senterCanvasX;
        this.annonseringsTittel.y = 0.4*senterCanvasY;
        this.annonseringsTittel.sentrerTeksten();

        tmpPoengTekstObj.høyde = this.annonseringsTittel.høyde;
        tmpPoengTekstObj.lagKantLinje(1,"white");
        tmpPoengTekstObj.tekst = "Du fikk "+this.spiller.poeng.toString()+" poeng";
        tmpPoengTekstObj.x = senterCanvasX;
        tmpPoengTekstObj.y = 0.6*senterCanvasY;
        tmpPoengTekstObj.sentrerTeksten();
    } else {
        this.terreng.oppdater();
        this.spiller.oppdater();

        this.poengTekstObjekt.tekst = "Poeng : " + this.spiller.poeng.toString();

        if (this.fiendeBølge.erTom && !this.runde.sluttet) {
            this.runde.sluttet = true;
            var senterCanvasX = ctx.canvas.width / 2;
            var senterCanvasY = ctx.canvas.height / 2;
            this.annonseringsTittel.settBreddeAvTekst();

            this.visAnnonsering = true;
            this.nåværendeAnnonseringsTid = 0;
            this.annonseringsTittel.tekst = "Runde " + this.runde.nr + " bestått!";
            this.annonseringsTittel.x = senterCanvasX;
            this.annonseringsTittel.y = 0.4 * senterCanvasY;
            this.annonseringsTittel.sentrerTeksten();
        }

        if (this.runde.sluttet) {
            if ((this.runde.tidSidenForrige += klokke.delta) > this.tidMellomRunder) {
                this.runde.tidSidenForrige = 0;
                this.lagNyFiendeBølge();
            }
        }
        if (this.runde.startet) {
            this.fiendeBølge.oppdater();
        }

        if (this.visAnnonsering && (this.nåværendeAnnonseringsTid += klokke.delta) > this.tidSomAnnonseringSkalVises) {
            this.nåværendeAnnonseringsTid = 0;
            this.visAnnonsering = false;
        }
    }
};

Spill.prototype.tegn = function(){

    ctx.fillStyle = "white";
    ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
    this.terreng.tegn();

    this.fiendeBølge.tegn();
    this.spiller.tegn();

    this.poengTekstObjekt.tegn();
    this.tilMenyen.tegn();

    if(this.visAnnonsering) this.annonseringsTittel.tegn();

    //Tegn rutenett
    /*for(var i = 1; i < Math.max(ctx.canvas.width,ctx.canvas.height)/config.pikselPerMeter; i++){
     BildeAtlasObjekt.tegnHjelpeLinje(i*config.pikselPerMeter,0,i*config.pikselPerMeter,ctx.canvas.height);
     BildeAtlasObjekt.tegnHjelpeLinje(0,i*config.pikselPerMeter,ctx.canvas.width,i*config.pikselPerMeter);
     }*/

};
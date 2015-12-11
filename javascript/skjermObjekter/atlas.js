/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var Atlas = {};

Atlas.typer = (function(){
    function Egenskap(navn){
        Ressurser.bildeHåndterer.atlas.last(navn);
        this.navn = navn;
        this.data = false;

        Ressurser.nårKlareKall(function(){
            this.data = JSON.parse(Ressurser.bildeHåndterer.atlas.hentJSON(this.navn));
        }.bind(this));
    }

    return {
        Challagundla4Weapons: new Egenskap("Challagundla4Weapons"),
        spillerOgTerreng: new Egenskap("spillerOgTerreng")
    };
})();
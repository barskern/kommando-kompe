/**
 *  ______  __      ______  __    __  ______  ______  ______  __  __   __  ______  __  __  __  __  _____
 * /\  __ \/\ \    /\  ___\/\ "-./  \/\  __ \/\  == \/\__  _\/\ \/\ "-.\ \/\  == \/\ \/\ \/\ \/\ \/\  __-.
 * \ \ \/\ \ \ \___\ \  __\\ \ \-./\ \ \  __ \ \  __<\/_/\ \/\ \ \ \ \-.  \ \  __<\ \ \_\ \ \ \_\ \ \ \/\ \
 *  \ \_____\ \_____\ \_____\ \_\ \ \_\ \_\ \_\ \_\ \_\ \ \_\ \ \_\ \_\\"\_\ \_\ \_\ \_____\ \_____\ \____-
 *   \/_____/\/_____/\/_____/\/_/  \/_/\/_/\/_/\/_/ /_/  \/_/  \/_/\/_/ \/_/\/_/ /_/\/_____/\/_____/\/____/
 *
 */

var Matrise = {
    identitet: function(){
        return math.diag([1,1,1]);
    },
    oppdaterMatrise: function(eier){
        var sin = math.sin(eier.rotasjon*(math.pi/180));
        var cos = math.cos(eier.rotasjon*(math.pi/180));
        var skalering = math.diag([eier.skalering.x,eier.skalering.y,1]);
        var rotasjon = math.matrix([[cos,sin,0],[-sin,cos,0],[0,0,1]]);
        var transformasjon = math.matrix([[1,0,0],[0,1,0],[eier.forflyttning.x, eier.forflyttning.y,1]]);
        return math.multiply(transformasjon, math.multiply(rotasjon, skalering));
    }
};
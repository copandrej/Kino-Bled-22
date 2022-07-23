let temp = null;
function zapri(el) {
    if (temp != null) {
        let buff = temp;
        temp = null;
        zapri(buff);
    }
    if (el.clientHeight >= 45) {
        el.style.height = "41px";
        temp = null;
    }
    else {
        el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
        temp = el;
    }

}

function poravnaj(el) {
    if (el.clientHeight >= 45) el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
}


window.addEventListener("load", () => {
    /** DOM 
     * debug pred spremembo skrije Četrtek ker težave z Č-jem, 
     * po spremembi displaya nazaj
     * safari
    */
    const spremeni = document.getElementsByClassName("dan");
    const prevedi = document.getElementsByClassName("prevedi");
    const debug = document.getElementById("debug");
    const dnevi = document.getElementsByClassName("skri");

    // Dnevi v tednu + jezik browserja
    const DneviSlo = ["PONEDELJEK", "TOREK", "SREDA", "&#268ETRTEK", "PETEK", "SOBOTA", "NEDELJA"];
    const DneviEng = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];
    const userLang = navigator.language || navigator.userLanguage;

    let trenutniJezik = "";
    let trenutnaLokacija = "park";
    $(".park").css("color", "#df6437");

    if (userLang == "sl" && trenutniJezik != "sl")
        spremembaJezika("sl");
    else if (userLang != "sl" && trenutniJezik != "en")
        spremembaJezika("en");

    // gumb za nastavljanje jezika
    $(".slo").click(() => { spremembaJezika("sl"); });
    $(".eng").click(() => { spremembaJezika("en"); });


    //gumb za lokacijo

    $(".fes").click(() => {
        resetColor();
        $(".fes").css("color", "#df6437");
        vsebina(trenutniJezik, "fes"); 
    });
    $(".itc").click(() => { 
        resetColor();
        $(".itc").css("color", "#df6437");
        vsebina(trenutniJezik, "itc"); 
    });
    $(".park").click(() => { 
        resetColor();
        $(".park").css("color", "#df6437");
        vsebina(trenutniJezik, "park"); });

    function resetColor() {
        $(".fes").css("color", "#ffebc6");
        $(".itc").css("color", "#ffebc6");
        $(".park").css("color", "#ffebc6");
    }
    /**
     * 
     * najprej spemeni dneve v tednu, da je to čim hitreje nato vsebina() spremeni še program
     */
    function spremembaJezika(Jezik) {
        if (Jezik == "sl") {
            trenutniJezik = "sl";
            //zgoraj opisan hrošč "debug"
            debug.style.display = "none";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerHTML = DneviSlo[i];
            debug.style.display = "inline";
            prevedi[0].innerHTML = "KUPI VSTOPNICE";
            prevedi[1].innerHTML = "PI&#352ITE NAM";
            vsebina(trenutniJezik);

        } else {
            trenutniJezik = "en";
            debug.style.display = "none";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerHTML = DneviEng[i];
            debug.style.display = "inline";
            prevedi[0].innerHTML = "BUY TICKETS";
            prevedi[1].innerHTML = "EMAIL US";
            vsebina(trenutniJezik);
        }
    }

    /**
     * ajax request za json vsebino priloženo v mapi vsebina,
     * js prebere in zgradi html strukturo za dinamično veliko vsebino
     * prostor za izbolšavo z api ali bazo
     */
    function vsebina(jezik, lokacija) {
        let imeDatoteke = `./vsebina/${jezik}.json`
        $.getJSON(imeDatoteke, (data) => {
            for (let i = 0; i < dnevi.length; i++) {
                let string = "";
                for (let k = 0; k < data[DneviEng[i]].length; k++) {
                    string += `<h3>${data[DneviEng[i]][k].naslov}</h3><p>`;
                    for (let j = 0; j < data[DneviEng[i]][k].vrstice.length; j++) {
                        string += `${data[DneviEng[i]][k].vrstice[j]}<br>`
                    }
                    string += "</p>"
                }
                dnevi[i].innerHTML = string;
                poravnaj(dnevi[i].parentNode);
            }
        });
    }
});
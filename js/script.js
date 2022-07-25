/*Malo grša kot lani, ampak sem moral dodati funkcionalnost da se ostale zaprejo*/
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
    } else {
        el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
        temp = el;
    }
}

/*poravna elemente da so zliti z vsebino*/
function poravnaj(el) {
    if (el.clientHeight >= 45) el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
}


window.addEventListener("load", () => {
    /** DOM 
     * debug pred spremembo skrije Četrtek ker težave z Č-jem, 
     * po spremembi displaya nazaj
     * safari -> realno to sploh ne pomaga sadge
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

    $("#down").click(() => { 
        $(".arrow").css("border-color", "transparent");
     });


    //gumbi za lokacijo
    $(".fes").click(() => {
        resetColor();
        $(".fes").css("color", "#df6437");
        trenutnaLokacija = "fes";
        vsebina(trenutniJezik, trenutnaLokacija);
    });
    $(".itc").click(() => {
        resetColor();
        $(".itc").css("color", "#df6437");
        trenutnaLokacija = "itc";
        vsebina(trenutniJezik, trenutnaLokacija);
    });
    $(".park").click(() => {
        resetColor();
        trenutnaLokacija = "park";
        $(".park").css("color", "#df6437");
        vsebina(trenutniJezik, trenutnaLokacija);
    });

    /*popucaj barva pritisnjenih gumbov*/
    function resetColor() {
        $(".fes").css("color", "#ffebc6");
        $(".itc").css("color", "#ffebc6");
        $(".park").css("color", "#ffebc6");
    }

    /**najprej spemeni dneve v tednu, da je to čim hitreje nato vsebina() spremeni še program -> function vsebina(). 
     * To bi se dalo tudi lepše napisati, ampak je bilo naknadnjo skalirano in raje nisem spremenil.
     */
    function spremembaJezika(Jezik) {
        if (Jezik == "sl") {
            trenutniJezik = "sl";
            //zgoraj opisan hrošč "debug"
            debug.style.display = "none";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerHTML = DneviSlo[i];
            debug.style.display = "inline";
            prevedi[0].innerHTML = " 14 AVGUST    2022";
            prevedi[1].innerHTML = "IZBERITE PRIZORIŠČE:";
            prevedi[2].innerHTML = "FESTIVALNA";
            prevedi[3].innerHTML = "DRUGO";
            prevedi[4].innerHTML = "VSTOP PROST";
            prevedi[5].innerHTML = '<a class="no-display" href="https://olaii.com/event/1922/kino-bled-2022?lang=sl" target="_blank" style="display: none;">KUPI VSTOPNICE</a>';
            prevedi[6].innerHTML = "PI&#352ITE NAM";
            vsebina(trenutniJezik, trenutnaLokacija);

        } else {
            trenutniJezik = "en";
            debug.style.display = "none";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerHTML = DneviEng[i];
            debug.style.display = "inline";
            prevedi[0].innerHTML = " 14 AUGUST    2022";
            prevedi[1].innerHTML = "SELECT THE VENUE:";
            prevedi[2].innerHTML = "FESTIVAL HALL";
            prevedi[3].innerHTML = "OTHER";
            prevedi[4].innerHTML = "FREE ENTRY";
            prevedi[5].innerHTML = '<a class="no-display" href="https://olaii.com/event/1922/kino-bled-2022?lang=en" target="_blank" style="display: none;">BUY TICKETS</a>';
            prevedi[6].innerHTML = "EMAIL US";
            vsebina(trenutniJezik, trenutnaLokacija);
        }
    }

    /**
     * request za js object vsebino priloženo v mapi vsebina,
     * js prebere in zgradi html strukturo za dinamično veliko vsebino
     * prostor za izbolšavo z api ali bazo
     */
    
    function vsebina(jezik, lokacija = "park") {
        let imeDatoteke = `./vsebina/${jezik}.json`
        /*$.getJSON(imeDatoteke, (data) => {*/
        if (jezik == "sl")
            data = slJson;
        else
            data = enJson;

        if (lokacija == "fes") {
            $(".display").css("display", "none");
            $(".no-display").css("display", "block");

        }
        else {
            $(".display").css("display", "block");
            $(".no-display").css("display", "none");
        }

        for (let i = 0; i < dnevi.length; i++) {
            let string = "";
            for (let k = 0; k < data[lokacija][DneviEng[i]].length; k++) {
                string += `<h3>${data[lokacija][DneviEng[i]][k].naslov}</h3><p>`;
                for (let j = 0; j < data[lokacija][DneviEng[i]][k].vrstice.length; j++) {
                    string += `${data[lokacija][DneviEng[i]][k].vrstice[j]}<br>`
                }
                string += "</p>"
            }
            dnevi[i].innerHTML = string;
            poravnaj(dnevi[i].parentNode);
        }
        /*});*/
    }
});

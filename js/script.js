function zapri(el) {
    (el.clientHeight >= 45) ? el.style.height = "41px" : el.style.height = (el.childNodes[3].clientHeight + 41).toString() + "px";
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
    const DneviSlo = ["TOREK", "SREDA", "&#268ETRTEK", "PETEK", "SOBOTA"];
    const DneviEng = ["TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    const userLang = navigator.language || navigator.userLanguage;

    let trenutniJezik = ""

    if (userLang == "sl" && trenutniJezik != "sl")
        spremembaJezika("sl");
    else if (userLang != "sl" && trenutniJezik != "en")
        spremembaJezika("en");

    // gumb za nastavljanje jezika
    $(".slo").click(() => { spremembaJezika("sl"); });
    $(".eng").click(() => { spremembaJezika("en"); });


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
            prevedi[0].innerHTML = "ZAVOD ASPEKT    PREDSTAVLJA";
            prevedi[1].innerHTML = "VSTOP PROST";
            prevedi[2].innerHTML = "PI&#352ITE NAM";
            vsebina(trenutniJezik);

        } else {
            trenutniJezik = "en";
            debug.style.display = "none";
            for (let i = 0; i < spremeni.length; i++)
                spremeni[i].innerHTML = DneviEng[i];
            debug.style.display = "inline";
            prevedi[0].innerHTML = "ASPEKT INSTITUTE    PRESENTS";
            prevedi[1].innerHTML = "FREE ENTRY";
            prevedi[2].innerHTML = "EMAIL US";
            vsebina(trenutniJezik);
        }
    }

    /**
     * ajax request za json vsebino priloženo v mapi vsebina,
     * js prebere in zgradi html strukturo za dinamično veliko vsebino
     * prostor za izbolšavo z api ali bazo
     */
    function vsebina(jezik) {
        let imeDatoteke = `vsebina/${jezik}.json`
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
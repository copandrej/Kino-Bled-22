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
        vsebina(trenutniJezik, "park");
    });

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
    function vsebina(jezik, lokacija="park") {
        let imeDatoteke = `./vsebina/${jezik}.json`
        /*$.getJSON(imeDatoteke, (data) => {*/
        data = enJson;
        for (let i = 0; i < dnevi.length; i++) {
            let string = "";
            console.log(lokacija, data[lokacija]);
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


const enJson = {
    "park":
    {
        "MONDAY": [
            {
                "naslov": "DEMO V PARKU",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "123",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ],
        "TUESDAY": [
            {
                "naslov": "123",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ],
        "WEDNESDAY": [
            {
                "naslov": "32",
                "vrstice": [
                    "<a target='_blank' href='https://www.mojaobcina.si/prenosi/novice/bled/212079_etmvabilokolesarskizajtrk.pdf'>european mobility week: cyclist breakfast</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            },
            {
                "naslov": "18:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/4351434924950484/'>photo exhibition opening: Martin Krivec</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank'href='https://www.imdb.com/title/tt0056591/'>One Fine Day (83’)</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "Firefly Club (7’)",
                    "<a target='_blank'href='https://www.imdb.com/title/tt3521126/'>The Disaster Artist (104’)</a>"
                ]
            }
        ],
        "THURSDAY": [
            {
                "naslov": "17:30",
                "vrstice": [
                    "<a href='https://www.facebook.com/events/546848996416533/' target='_blank'>travelogue: Greece</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "Bike (3’)",
                    "<a target='_blank'href='https://www.imdb.com/title/tt3422078/'>April and the Extraordinary World (105’)</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.emeraldparadise.at/?lang=sl&fbclid=IwAR3aAm7nKjEhT7q7gcMcDCJBiWPdC6Q1fq8ITxDApzQS2HSK_C3_KE4KMuo'>Emerald Paradise (59’)</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            }
        ],
        "FRIDAY": [
            {
                "naslov": "10:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.bled.si/en/events/2021090112071356/guided-tour-of-bled'>guided tour of Bled</a>",
                    "<a href='https://goo.gl/maps/sep7vTan7DtZj3bx5' target='_blank'>@Tourist information centre</a>"
                ]
            },
            {
                "naslov": "17:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/183328980546508/'>workshop: Physiolosophy</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt10288566/'>Another Round (117’)</a>"
                ]
            },
            {
                "naslov": "21:30",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8359848/'>Climax (96’)</a>"
                ]
            }
        ],
        "SATURDAY": [
            {
                "naslov": "21:00",
                "vrstice": [
                    "Easter (7’)",
                    "<a target='_blank' href='https://www.imdb.com/title/tt5805752/?ref_=fn_al_tt_1'>Brigsby Bear (97’)</a>"
                ]
            }
        ],
        "SUNDAY": [
            {
                "naslov": "19:00",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ]
    },
    "fes":
    {
        "MONDAY": [
            {
                "naslov": "PONEDELJEK V FESTIVALNI",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ],
        "TUESDAY": [
            {
                "naslov": "test",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ],
        "WEDNESDAY": [
            {
                "naslov": "18:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/4351434924950484/'>photo exhibition opening: Martin Krivec</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank'href='https://www.imdb.com/title/tt0056591/'>One Fine Day (83’)</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "Firefly Club (7’)",
                    "<a target='_blank'href='https://www.imdb.com/title/tt3521126/'>The Disaster Artist (104’)</a>"
                ]
            }
        ],
        "THURSDAY": [
            {
                "naslov": "more testing",
                "vrstice": [
                    "<a href='https://www.facebook.com/events/546848996416533/' target='_blank'>travelogue: Greece</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.emeraldparadise.at/?lang=sl&fbclid=IwAR3aAm7nKjEhT7q7gcMcDCJBiWPdC6Q1fq8ITxDApzQS2HSK_C3_KE4KMuo'>Emerald Paradise (59’)</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            }
        ],
        "FRIDAY": [
            {
                "naslov": "17:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/183328980546508/'>workshop: Physiolosophy</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt10288566/'>Another Round (117’)</a>"
                ]
            },
            {
                "naslov": "21:30",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8359848/'>Climax (96’)</a>"
                ]
            }
        ],
        "SATURDAY": [
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt11394298/?ref_=nv_sr_srsg_0'>The Mole Agent (84’)</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "Easter (7’)",
                    "<a target='_blank' href='https://www.imdb.com/title/tt5805752/?ref_=fn_al_tt_1'>Brigsby Bear (97’)</a>"
                ]
            }
        ],
        "SUNDAY": [
            {
                "naslov": "19:00",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ]
    },
    "itc":
    {
        "MONDAY": [
            {
                "naslov": "PONEDELJEK V ITC",
                "vrstice": [
                    "festival opening"
                ]
            }
        ],
        "TUESDAY": [
            {
                "naslov": "19:00",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ],
        "WEDNESDAY": [
            {
                "naslov": "21:00",
                "vrstice": [
                    "Firefly Club (7’)",
                    "<a target='_blank'href='https://www.imdb.com/title/tt3521126/'>The Disaster Artist (104’)</a>"
                ]
            }
        ],
        "THURSDAY": [
            {
                "naslov": "17:30",
                "vrstice": [
                    "<a href='https://www.facebook.com/events/546848996416533/' target='_blank'>travelogue: Greece</a>",
                    "<a href='https://goo.gl/maps/UVfN6wr5MRfTd2sX6' target='_blank'>@Infocenter Triglavska roža Bled</a>"
                ]
            }
        ],
        "FRIDAY": [
            {
                "naslov": "10:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.bled.si/en/events/2021090112071356/guided-tour-of-bled'>guided tour of Bled</a>",
                    "<a href='https://goo.gl/maps/sep7vTan7DtZj3bx5' target='_blank'>@Tourist information centre</a>"
                ]
            },
            {
                "naslov": "17:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/183328980546508/'>workshop: Physiolosophy</a>"
                ]
            },
            {
                "naslov": "19:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt10288566/'>Another Round (117’)</a>"
                ]
            },
            {
                "naslov": "21:30",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8359848/'>Climax (96’)</a>"
                ]
            }
        ],
        "SATURDAY": [
            {
                "naslov": "12:30",
                "vrstice": [
                    "<a target='_blank' href='https://www.facebook.com/events/402498801257873/'>debate: Me, you and us in a relationship</a>",
                    "<a href='https://goo.gl/maps/VeBPAY4QCmNjsc5q6' target='_blank'>@Tavci Vegan Cafe</a>"
                ]
            },
            {
                "naslov": "21:00",
                "vrstice": [
                    "Easter (7’)",
                    "<a target='_blank' href='https://www.imdb.com/title/tt5805752/?ref_=fn_al_tt_1'>Brigsby Bear (97’)</a>"
                ]
            }
        ],
        "SUNDAY": [
            {
                "naslov": "19:00",
                "vrstice": [
                    "festival opening"
                ]
            },
            {
                "naslov": "20:00",
                "vrstice": [
                    "<a target='_blank' href='https://www.imdb.com/title/tt8151874/'>Honey Boy (94')</a>"
                ]
            }
        ]
    }
}
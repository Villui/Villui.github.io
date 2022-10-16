(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            let date = new Date();
            let lopp = "EL";
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();
            if (h > 12) {
                h-=12;
                lopp = "PL";
            }
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s + lopp;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        let eesnimi = document.getElementById("fname");
        let perenimi = document.getElementById("lname");
        let linn = document.getElementById("linn");
        let kink = document.getElementById("v1");
        let kontaktivaba = document.getElementById("v2");
        let kiirtellimus = document.getElementById("v3");
        let tavatellimus = document.getElementById("v4");
        if (linn.value === "") {
            alert("Palun valige linn nimekirjast!");
            linn.focus();
            return;
        } 
        else if (eesnimi.value === "") {
            alert("Palun täitke eesnime väli!");
            eesnimi.focus();
            return;
        }
        else if (perenimi.value === "") {
            alert("Palun täitke perenime väli!");
            perenimi.focus();
            return;
        }
        else if (/\d/.test(eesnimi.value) || /\d/.test(perenimi.value)) { //Selle viisi leidsin internetist: https://codingbeautydev.com/blog/javascript-check-if-string-contains-numbers/
            alert("Tekstiväljad ei tohi numbreid sisaldada!");
        }
        else if (!kiirtellimus.checked && !tavatellimus.checked) {
            alert("Palun valige tellimuskiirus!");
        }
        else {
            let hind = 0;
            if (linn.value === "trt" || linn.value === "nrv") {
                hind += 2.5;
            }
            else if (linn.value === "prn") {
                hind += 3;
            }
            if (kink.checked) {
                hind += 5;
            }
            if (kontaktivaba.checked) {
                hind += 1;
            }
            if (kiirtellimus.checked) {
                hind += 5;
            }
            e.innerHTML = hind + "&euro;";
        }        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let pärnuKolledž = new Microsoft.Maps.Location(
            58.38500, 
            24.48833
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 7,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    let pärnuPin = new Microsoft.Maps.Pushpin(pärnuKolledž, {
        id: "pärnuKolledž",
        title: "Pärnu kolledž",
        });

    let ülikooliInfo = new Microsoft.Maps.Infobox(centerPoint, {
        title: "Tartu Ülikool",
        visible: false,
        });
    let pärnuInfo = new Microsoft.Maps.Infobox(pärnuKolledž, {
        title: "Pärnu Kolledž",
        visible: false,
        });

    ülikooliInfo.setMap(map);
    pärnuInfo.setMap(map);
    map.entities.push(pushpin);
    map.entities.push(pärnuPin);
    Microsoft.Maps.Events.addHandler(pushpin, "click", pushpinClicked);
    Microsoft.Maps.Events.addHandler(pärnuPin, "click", pushpinClicked);
    console.log(pärnuPin.id)
    console.log(pushpin.id)

    function pushpinClicked(e) {
        if (e.target.id) {
          if (e.target.id == 10) {
            ülikooliInfo.setOptions({
              visible: true,
            });
          } else if (e.target.id == 11) {
            pärnuInfo.setOptions({
              visible: true,
            });
          }
        }
      }
}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE


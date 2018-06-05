(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/* ------- Model ------- */
module.exports = [
    {
        id: 1,
        name: "Pantheon",
        imageURL: "images/pantheon.jpeg",
        description: "Iconic temple built circa 118 to 125 A.D. with a dome & Renaissance tombs, including Raphael's.",
        address: "Piazza della Rotonda, 00186 Roma RM, Italy",
        number: "+39 06 6830 0230",
        hours: "0900 - 1800 Daily. 0830 - 1730 on Sundays.",
        closestTransitStop: "Corso/minghetti",
        website: "",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187791-d197714-Reviews-Pantheon-Rome_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Pantheon,_Rome",
        notes: "",
        lat: 41.898691,
        lng: 12.476873,
        yelpBusinessID: "pantheon-basilica-di-santa-maria-ad-martyres-roma"
    },{
        id: 2,
        name: "Colesseum",
        imageURL: "images/colosseum.jpg",
        description: "Monumental 3-tiered Roman amphitheater once used for gladiatorial games, with guided tour option.",
        address: "Piazza del Colosseo, 1, 00184 Roma RM, Italy",
        number: "+39 06 3996 7700",
        hours: "0830 - 1900 Daily.",
        closestTransitStop: "Colosseo",
        website: "https://www.coopculture.it/en/colosseo-e-shop.cfm",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187791-d192285-Reviews-Colosseum-Rome_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Colosseum",
        notes: "",
        lat: 41.890370,
        lng: 12.492252,
        yelpBusinessID: "colosseo-roma?osq=Colosseum" 
    },{
        id: 3,
        name: "Catacombs of St. Callixtus",
        imageURL: "images/catacombs_of_st._callixtus.jpg",
        description: "Ancient Christian burial tunnels containing 3rd-century frescoes & the crypts of martyrs & popes.",
        address: "Via Appia Antica, 110/126, 00179 Roma RM, Italy",
        number: "+39 06 513 0151",
        hours: "0900 - 1200, 1400 - 1500 Daily. Closed Wednesdays.",
        closestTransitStop: "Catacombe S.callisto",
        website: "http://www.catacombe.roma.it/en/info_biglietti.php",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187791-d208557-Reviews-Catacombe_di_San_Callisto-Rome_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Catacomb_of_Callixtus",
        notes: "",
        lat: 41.860904,
        lng: 12.508740,
        yelpBusinessID: "" 
    },{
        id: 4,
        name: "Villa Medici",
        imageURL: "images/villa_medici.jpg",
        description: "16th-century cardinal's villa with landscaped gardens, offering tours & temporary art exhibitions.",
        address: "Viale della Trinità dei Monti, 1, 00187 Roma RM, Italy",
        number: "+39 06 67611",
        hours: "1000 - 1800 Daily. Closed Modays.",
        closestTransitStop: "Spagna",
        website: "https://www.lonelyplanet.com/italy/rome/attractions/villa-medici/a/poi-sig/390035/359975",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187791-d590483-Reviews-Villa_Medici_Accademia_di_Francia_a_Roma-Rome_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Villa_Medici",
        notes: "",
        lat: 41.908564,
        lng: 12.482590,
        yelpBusinessID: "accademia-di-francia-villa-medici-roma?osq=Villa+Medici" 
    },{
        id: 5,
        name: "Museum Leonardo Da Vinci Experience",
        imageURL: "images/museum_leonardo_da_vinci_experience.jpeg",
        description: "A unique museum dedicated to Leonardo Da Vinci with recognized masterpieces reproduced in full scale and worked with traditional materials and procedures of the renaissance workshops.",
        address: "Via della Conciliazione, 19-21, 00193 Roma RM, Italy",
        number: "+39 06 683 3316",
        hours: "0900 - 1930 Daily.",
        closestTransitStop: "LGT Sassia/s. Spirito (H)",
        website: "http://www.leonardodavincimuseo.com/en/",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187791-d10660982-Reviews-Museo_Leonardo_Da_Vinci_Experience-Rome_Lazio.html",
        wikiLink: "",
        notes: "",
        lat: 41.902111,
        lng: 12.461670,
        yelpBusinessID: "" 
    },{
        id: 6,
        name: "Vatican City",
        imageURL: "images/vatican_city.jpg",
        description: "Vatican City, a city-state surrounded by Rome, Italy, is the headquarters of the Roman Catholic Church. It is the home to the Pope and a trove of iconic art and architecture.",
        address: "Città del Vaticano 00120",
        number: "",
        hours: "Open Daily",
        closestTransitStop: "Cavalleggeri/S. Pietro",
        website: "http://www.vaticanstate.va/content/vaticanstate/en/monumenti.html",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187793-d1968471-Reviews-Vatican_City-Vatican_City_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Vatican_City",
        notes: "",
        lat: 41.902283,
        lng: 12.450763,
        yelpBusinessID: "" 
    },{
        id: 7,
        name: "Sistine Chapel",
        imageURL: "images/sistine_chapel.jpg",
        description: "Famous chapel in the Vatican Museums, best known for Michelangelo's 16th-century painted ceiling.",
        address: "00120 Vatican City",
        number: "",
        hours: "0900 - 1800 Daily. Sundays closed or reduced hours.",
        closestTransitStop: "Ottaviano",
        website: "http://www.museivaticani.va/content/museivaticani/en/collezioni/musei/cappella-sistina.html",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187793-d190130-Reviews-Sistine_Chapel-Vatican_City_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/Sistine_Chapel",
        notes: "",
        lat: 41.903091,
        lng: 12.454473,
        yelpBusinessID: "cappella-sistina-roma?osq=sistine+chapel" 
    },{
        id: 8,
        name: "St. Peter's Basilica",
        imageURL: "images/st._peter's_basilica.jpg",
        description: "Late Renaissance church by architects including Michelangelo & holding up to 20,000 worshippers.",
        address: "Piazza San Pietro, 00120 Città del Vaticano, Vatican City",
        number: "+39 06 6982",
        hours: "0700 - 1830 Daily. Holy Mass 0830 Daily.",
        closestTransitStop: "LGT Sassia/s. Spirito (H)",
        website: "http://www.museivaticani.va/content/museivaticani/en/visita-i-musei/scegli-la-visita/musei-e-collezioni/musei-vaticani-e-basilica-di-san-pietro.html",
        tripAdvisor: "https://www.tripadvisor.com/Attraction_Review-g187793-d631111-Reviews-St_Peter_s_Basilica-Vatican_City_Lazio.html",
        wikiLink: "https://en.wikipedia.org/wiki/St._Peter%27s_Basilica",
        notes: "",
        lat: 41.902318,
        lng: 12.453894,
        yelpBusinessID: "basilica-di-san-pietro-roma-4?osq=sistine+chapel" 
    }
];

},{}],2:[function(require,module,exports){
/* ------- Model ------- */
var results = require('./data.js');
window.results = results;

},{"./data.js":1}]},{},[2]);
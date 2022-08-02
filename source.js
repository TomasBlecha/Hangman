const obesenec = document.querySelector("#obesenec");
const hadanka = document.querySelector("#hadanka");
const hinty = document.querySelector("#hinty");
const textHint = document.querySelector("#textHint");
const winText = document.querySelector("#winText");
const spravnaOdpoved = document.querySelector("#spravnaOdpoved");
const drag_pole = document.querySelector("#drag_pole");
const abeceda = document.querySelector("#abeceda");
const zatvor = document.querySelector("#closed");
const restart = document.querySelector("#restart");
const next = document.querySelector("#next");
const znova = document.querySelector("#znova");
const napoviem = document.querySelector("#napoviem");
const backdrop1 = document.querySelector("#backdrop1");
const backdrop2 = document.querySelector("#backdrop2");
const backdrop3 = document.querySelector("#backdrop3");
const backdrop4 = document.querySelector("#backdrop4");

var hadka = [];
var doplnovacka = [];
var poleIndexov = [0,1,2,3,4,5,6,7,8,9];

let spravna = "";
let napovOnOff = 0;
let napoveda = "";
let uspechy = 0; // pocet spravne uhadnutych
let indexor = 0; // na indexe ktorej hadanke si
let pocet_spravnych = 0; // pocet spravnych pismenok
let spravne_pismeno = 0; // ci zvolene pismenko je spravne
let entered = 0; // ci vstupil do odovzdavacieho pola
let cislo_obr = 0; // ktory obesenec je zobrazeny





function shuffle(){
    let tentoIndex = poleIndexov.length,  ranIndex;

  
  while (tentoIndex != 0) {

    
    ranIndex = Math.floor(Math.random() * tentoIndex);
    tentoIndex--;

    
    [poleIndexov[tentoIndex], poleIndexov[ranIndex]] = [
      poleIndexov[ranIndex], poleIndexov[tentoIndex]];
  }
  console.log(poleIndexov);
  localStorage.setItem("poleIndexov", poleIndexov);
  localStorage.setItem("indexor", indexor);
}

function vyplnenieHadka(hadkan){   // doplny v hadanke slepe policka
    
    hadka = hadkan;
    
    for (let i = 0; i < hadka.length; i++) {
        
        doplnovacka[i] = "_";
        
    }
}

function getDataFromJSON(index) {  //vytiahne data z JSON
    
    fetch("./souce.json").then(function(response) {
        return response.json();
    }).then(function(obj) {
        console.log(obj);
        console.log(poleIndexov);
        napoveda = obj.hadanky[index].hint;
        hadka = obj.hadanky[index].src;
        console.log(hadka);
        console.log(napoveda);
        vyplnenieHadka(hadka);
        doplnenieHadanky();
    })
    
}
function vyhra(){
    backdrop4.style.display = "block"
    const vyhraText = document.createElement("span");
    vyhraText.innerText = "Your final score is "+ uspechy + "/10.";
    winText.appendChild(vyhraText);
    

}
function prehra(){
    indexor ++;
    if(indexor != 10){
    backdrop2.style.display = "block"
    const spravnaXD = document.createElement("span");
    spravnaOdpoved.innerHTML = '';
    spravna = "";
    spravnaXD.innerText = "";
    hadka.forEach(znak => {
        spravna += znak;
    });
    spravnaXD.innerHTML = "The right answer was "+ spravna + ".";
    spravnaOdpoved.appendChild(spravnaXD);
    }
    else{
        vyhra();
    }
    
}
function levelPrejdeny(){
    
    indexor ++;
    uspechy ++;
    if(indexor != 10){
        backdrop3.style.display = "block"
        
    }
    else{
        vyhra();
    }
}

function doplnenieHadanky() {  //nalepi pole slepych znakov do sekcie hadanka
    hadanka.innerHTML = '';
    
    for (let i = 0; i < doplnovacka.length; i++) {
        
        const pismenkoHadanky = document.createElement("span");
        pismenkoHadanky.innerHTML = doplnovacka[i];
        pismenkoHadanky.style.margin = "2px"
        hadanka.appendChild(pismenkoHadanky);
        
    }
}
function kontrolaTextu (pismeno) {    // kontrola spravnosti zvoleneho textu a vyhri
    console.log(doplnovacka);
    for (let i = 0; i < hadka.length; i++) {
        if(hadka[i] == pismeno) {
            doplnovacka[i] = pismeno;
            spravne_pismeno = 1;
            pocet_spravnych ++;

        }
    }
    if(pocet_spravnych == doplnovacka.length) {
        pocet_spravnych = 0;
        levelPrejdeny();
        
    }
    doplnenieHadanky();
    obesenie();
    spravne_pismeno = 0;
    
}
function obesenie() {  // generuje obrazky obesenca a kontrola prehry
    if(spravne_pismeno == 0){
        const obrazok = document.createElement("img");
        cislo_obr++;
        obesenec.innerHTML = ''
        switch (cislo_obr) {
            case 1:
                obrazok.src = './obesency/hlavo.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 2:
                obrazok.src = './obesency/telo.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 3:
                obrazok.src = './obesency/ruka1.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 4:
                obrazok.src = './obesency/ruka2.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 5:
                obrazok.src = './obesency/noha1.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 6:
                obrazok.src = './obesency/noha2.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 7:
                obrazok.src = './obesency/lano.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 8:
                obrazok.src = './obesency/uvedomenie.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 9:
                obrazok.src = './obesency/moment.jpg'
                obesenec.appendChild(obrazok);
                break;
            case 10:
                obrazok.src = './obesency/final.jpg'
                obesenec.appendChild(obrazok);
                break;
            default:
                break;
        }
        if(cislo_obr == 10){
            pocet_spravnych = 0;
            prehra();
        }
    }
}

const loadAlphabet = (event) => { // naplni abecedu
    abeceda.innerHTML = '';
    let i = 0;
    //console.log("som vnutry");
    for(i; i < 26; i++){
        const letter = document.createElement("span");
        
        letter.style.margin = "5px"
        letter.style.marginTop = "10px"
        letter.style.padding = "3px"
        letter.style.display = "flex"
        letter.style.border = "2px solid"
        letter.style.fontSize = "25px"
        letter.style.width = "fit-content"
        letter.style.height = "fit-content"
        letter.style.borderRadius = "5px"
        letter.draggable = "true"

        
        let pismeno = String.fromCharCode(65+i);
        letter.setAttribute("letter-id", pismeno)
        letter.innerText = pismeno;
        abeceda.appendChild(letter);
        //console.log(letter);
        letter.addEventListener("dragend", (event) => {
            if(entered){
                let zvolene_pismeno = letter.getAttribute("letter-id");
                //console.log("ulozilo sa:", zvolene_pismeno);
                abeceda.removeChild(letter);
                //console.log("letter deleted");
                entered = 0;
                kontrolaTextu(zvolene_pismeno);
            }
        })
        letter.addEventListener('touchstart', (event) => {
            let zvolene_pismeno = letter.getAttribute("letter-id");
            abeceda.removeChild(letter);
            kontrolaTextu(zvolene_pismeno);
        })

        document.addEventListener("dragenter",(event) => {
            if(event.target.className == "drag_pole" ){
                //console.log("vosiel do pola");
                
                entered = 1;
            }
        })
        
        document.addEventListener("dragleave",(event) => {
            if(event.target.className == "drag_pole" ){
                
                setTimeout(() => {entered = 0;}, 30);
                //console.log("vysiel z pola");
            }
        })
        
        

    }
    
}

zatvor.addEventListener("click", () => {
    backdrop1.style.display = "none";
})
next.addEventListener("click", () => {
    backdrop3.style.display = "none";
    abeceda.innerHTML = '';
    obesenec .innerHTML = '';
    hadanka.innerHTML ='';
    textHint.innerHTML = '';
    hadka = [];
    napoveda = "";
    doplnovacka =[];
    loadAlphabet();
    //indexor++;
    //uspechy++;
    cislo_obr = 0;
    napovOnOff = 0;
    localStorage.setItem("indexor",indexor);
    localStorage.setItem("uspechy", uspechy);
    getDataFromJSON(poleIndexov[indexor]);
    
    
})
restart.addEventListener("click", () => {
    backdrop2.style.display = "none"
    abeceda.innerHTML = '';
    obesenec .innerHTML = '';
    hadanka.innerHTML ='';
    textHint.innerHTML = '';
    hadka = [];
    napoveda = "";
    doplnovacka =[];
    loadAlphabet();
    //indexor++;
    //uspechy++;
    cislo_obr = 0;
    napovOnOff = 0;
    localStorage.setItem("indexor",indexor);
    
    getDataFromJSON(poleIndexov[indexor]);
})
napoviem.addEventListener("click", () => {

    const slovoNapoveda = document.createElement("span");
    slovoNapoveda.innerText = napoveda;
    textHint.appendChild(slovoNapoveda);
    if(napovOnOff == 0){
        textHint.style.display = "block"
        napovOnOff = 1;
    }
    else{
        textHint.style.display = "none"
        napovOnOff = 0;
        textHint.innerHTML = '';
    }
})
znova.addEventListener("click", () => {
    backdrop4.style.display = "none";
    abeceda.innerHTML = '';
    obesenec .innerHTML = '';
    hadanka.innerHTML ='';
    textHint.innerHTML = '';
    hadka = [];
    napoveda = "";
    doplnovacka =[];
    cislo_obr = 0;
    napovOnOff = 0;
    uspechy = 0;
    indexor = 0;
    pocet_spravnych = 0;
    spravne_pismeno = 0;
    entered = 0;
    shuffle();
    localStorage.setItem("uspechy",uspechy);
    localStorage.setItem("poleIndexov",poleIndexov);
    localStorage.setItem("indexor",indexor);
    getDataFromJSON(poleIndexov[indexor]);
    loadAlphabet();
})

if(!localStorage.getItem("poleIndexov")){
    shuffle();
}
else {
    poleIndexov = [];
    poleIndexov = localStorage.getItem("poleIndexov").split(",");
    indexor = localStorage.getItem("indexor");
    if(!localStorage.getItem("uspechy")){
        localStorage.setItem("uspechy",uspechy);
    }
    else{
        uspechy = localStorage.getItem("uspechy");
    }
}

getDataFromJSON(poleIndexov[indexor]);
loadAlphabet();
//TODO  interface 
navigator.serviceWorker.register("./serviceWorker.js")
    .then((reg) => {
        console.log("service worker registered", reg);
    })
    .catch(err => {
        console.log("error", err);
    })
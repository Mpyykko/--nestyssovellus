window.addEventListener('load',lataaJson);


//// ajax hommaa

function lataaJotain(){
  console.log('Ladataan jotain');

  let xhttp = new XMLHttpRequest();

  xhttp.open('GET','data.html',true);
  xhttp.send();

}

function lataaJotainTxt(){
  console.log('Ladataan txt');
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function(){

    console.log(this.responseXML);
    parseXMLData(this.responseXML);


  }
  xhttp.open('GET','data.txt');
  xhttp.send();
}


function parseXMLData(){

}

JSONdata = null;

function lataaJson(){
  let ajax = new XMLHttpRequest();
  ajax.onload = function(){
    JSONdata = this.responseText;
    console.log(JSONdata);

  }
  ajax.open('GET','data.json', true);
  ajax.send();

}

// käyttäjän rooli
let onYllapitaja = false;



// haetaan äänestykset, jos niitä on tallennettu ja jos ei niin palautuu tyhjä lista
let kysymykset = JSON.parse(localStorage.getItem('kysymykset')) || [];

// muuttujat
const kysymysInput = document.getElementById('kysymysInput');
const vaihtoehto1Input = document.getElementById('vaihtoehto1Input');
const vaihtoehto2Input = document.getElementById('vaihtoehto2Input');
const lisaaKysymysButton = document.getElementById('lisaaKysymys');
const kysymyksetDiv = document.getElementById('kysymykset');
const poistuButton = document.getElementById('poistu');
const lisaaAanestysButton = document.getElementById('lisaaAanestys');
let kirjautuneena = document.getElementById('kirjautumisInfo');



document.addEventListener('DOMContentLoaded', function() {
  const valikkoButton = document.getElementById('valikkoButton');
  const loggausValikko = document.getElementById('loggausValikko');
  const loggausPoistuButton = document.getElementById('loggausPoistu');
  const yllapitoKirjauduButton = document.getElementById('yllapitoKirjaudu');
  


  // ylläpitäjän kirjautuminen

  // valikko tulee esille
  valikkoButton.addEventListener('click', function() {
      loggausValikko.style.display = 'flex';
      lataaJotainTxt();
      lataaJotain();
    
  });

  // valikko sulkeutuu ja kirjautumistiedot tyhjennentään
  function suljeJaTyhjenna() {
      loggausValikko.style.display = 'none';
      document.querySelectorAll('#loggausValikko .syottotekstit').forEach(function(input) {
          input.value = '';
      });
  }

  // tyhjennetään myös virheilmoitus  jos on 
  loggausPoistuButton.addEventListener('click', function(){
    document.getElementById('virheilmoitus').innerHTML = '';

    suljeJaTyhjenna();


});

// tunnusten tarkistus
yllapitoKirjauduButton.addEventListener('click', function() {
    let tunnus = document.getElementById('tunnus').value;
    let salasana = document.getElementById('salasana').value;
    
    if (tunnus === 'Admin' && salasana === 'Pass') {
        onYllapitaja = true;
        document.getElementById('virheilmoitus').innerHTML = '';
        kirjautuneena.innerHTML= `Kirjautuneena: ${tunnus}`;
        suljeJaTyhjenna();
        paivitaNakyma();
        
    } else {
        document.getElementById('virheilmoitus').innerHTML = 'Tarkista tiedot';
        document.querySelectorAll('#loggausValikko .syottotekstit').forEach(function(input) {
          input.value = '';
      });
      
    }
});

});



// lisää äänestys-lomake
document.addEventListener('DOMContentLoaded', function() {
  
  const aanestyslomake = document.getElementById('aanestyslomake');
  aanestyslomake.style.display = 'none';
  lisaaAanestysButton.style.display = 'none';

  lisaaAanestysButton.addEventListener('click', function() {
       //näytetään lomake
      aanestyslomake.style.display = 'flex';
  });

  lisaaKysymysButton.addEventListener('click', function() {
     
    
      // lisätään äänestys listalle
      lisaaAanestys();

      let syotot = document.querySelectorAll('#aanestyslomake .syottotekstit');

    // käy läpi kaikki inputit ja tyhjennä ne
      syotot.forEach(function(syotto) {
      syotto.value = '';
    });
    

  });
  poistuButton.addEventListener('click', function() {
    // poistutaan valikosta
    aanestyslomake.style.display = 'none';

    let syotot = document.querySelectorAll('#aanestyslomake .syottotekstit');

    // tyhjennetään kaikki syotetyt tiedot
      syotot.forEach(function(syotto) {
      syotto.value = '';
    });
  
   
});
});


// päivitetään näkymä roolien mukaan
paivitaNakyma();

// funktio lisää uuden äänestyksen
function lisaaAanestys() {
  // äänestyksen tiedot
  const kysymys = kysymysInput.value;
  const vaihtoehto1 = vaihtoehto1Input.value;
  const vaihtoehto2 = vaihtoehto2Input.value;

  // lisätään kysymys listaan
  kysymykset.push({ kysymys, vaihtoehdot: [vaihtoehto1, vaihtoehto2], aanet: [0, 0] });

  // päivitetään heti kun uusi äänestys on lisätty
  paivitaNakyma();

  // tallenetaan äänestykset 
  localStorage.setItem('kysymykset', JSON.stringify(kysymykset));
}

// funktio päivitetään näkymä
function paivitaNakyma() {
  if(kysymykset.length === 0){
    lisaaAanestysButton.style.display = 'flex';
}
  kysymyksetDiv.innerHTML = '';


  kysymykset.forEach((kysymys, index) => {
      const div = document.createElement('div');
      div.classList.add('yksittainenAanestys');

      const kaikkiAanet = kysymys.aanet.reduce((a, b) => a + b, 0);
      const aanet1 = kaikkiAanet > 0 ? (kysymys.aanet[0] / kaikkiAanet * 100).toFixed(1) : 0;
      const aanet2 = kaikkiAanet > 0 ? (kysymys.aanet[1] / kaikkiAanet * 100).toFixed(1) : 0;

      div.innerHTML = `
        <h3>${kysymys.kysymys}</h3>
        <div class="vaihtoehto">
            <button class="aanestysNappi vaihtoehto1Nappi">${kysymys.vaihtoehdot[0]} (${kysymys.aanet[0]} ääntä, ${aanet1}%)</button>
        </div>
        <div class="vaihtoehto">
            <button class="aanestysNappi vaihtoehto2Nappi">${kysymys.vaihtoehdot[1]} (${kysymys.aanet[1]} ääntä, ${aanet2}%)</button>
        </div>
      `;

      if (onYllapitaja) {
          
          div.innerHTML += `<button class="poistaAanestysNappi">Poista äänestys</button>`;
          lisaaAanestysButton.style.display = 'flex';
          kirjauduUlos.style.display = 'block';
          valikkoButton.style.display = 'none';
          
      }

     

      // lisää tapahtumankäsittelijät
      div.querySelector('.vaihtoehto1Nappi').addEventListener('click', () => aanesta(index, 0));
      div.querySelector('.vaihtoehto2Nappi').addEventListener('click', () => aanesta(index, 1));

      if (onYllapitaja) {
          div.querySelector('.poistaAanestysNappi').addEventListener('click', () => poistaAanestys(index));
      
        }


      kysymyksetDiv.appendChild(div);
  });
}
/////////////////////////////////////////////////////////////////////////////
// ulos kirjautuminen
const kirjauduUlos = document.getElementById('kirjauduUlos');


kirjauduUlos.addEventListener('click', function() {
    
    console.log('Toimiiko uloskirjaus?');
    kirjauduUlos.style.display = 'none';
    lisaaAanestysButton.style.display = 'none';
    kirjautuneena.innerHTML = '';
    valikkoButton.style.display = 'flex';
    onYllapitaja = false;
    paivitaNakyma();
});

/////////////////////////////////////////////////////////////////////////////


// äänestystyksen päivitys
function aanesta(kysymysIndexi, vaihtoehtoIndexi) {
  kysymykset[kysymysIndexi].aanet[vaihtoehtoIndexi]++;
  paivitaNakyma();
  localStorage.setItem('kysymykset', JSON.stringify(kysymykset));
}

//poistaa äänestyksen
function poistaAanestys(indexi) {
  kysymykset.splice(indexi, 1);
  paivitaNakyma();
  localStorage.setItem('kysymykset', JSON.stringify(kysymykset));
}

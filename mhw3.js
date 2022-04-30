const immagini = document.querySelectorAll('.immagine');
const ricarica = document.querySelector('button');
const corpo = document.querySelector('.testo');
const risposta = {};
let uno;
let due;
let tre;

for(const immagine of immagini){
    immagine.addEventListener('click', selezionaImmagine);
}

ricarica.addEventListener('click', ricaricapagina);

function selezionaImmagine(event){

    let cbox = event.currentTarget.querySelector('.checkbox');
    cbox.src = 'images/checked.png';
    event.currentTarget.classList.add('selezionato');
    if(event.currentTarget.classList.contains('nonselezionato')){
        event.currentTarget.classList.remove('nonselezionato');
    }
    
    for( const immagine of immagini){
        if(immagine.dataset.questionId === event.currentTarget.dataset.questionId && immagine.dataset.choiceId !== event.currentTarget.dataset.choiceId){
            immagine.classList.add('nonselezionato');
            immagine.classList.remove('selezionato');
            let cbx = immagine.querySelector('.checkbox');
            cbx.src = 'images/unchecked.png';  
        }
    }

    if (event.currentTarget.dataset.questionId === 'one'){
        risposta.uno = event.currentTarget.dataset.choiceId;
        uno = true;
    }

    if (event.currentTarget.dataset.questionId === 'two'){
        risposta.due = event.currentTarget.dataset.choiceId;
        due = true;
    }
   
    if (event.currentTarget.dataset.questionId === 'three'){
        risposta.tre = event.currentTarget.dataset.choiceId;
        tre = true;
    }

    if (uno && due && tre ){
        for(const immagine of immagini){
            immagine.removeEventListener('click', selezionaImmagine);
        }  
        
        esito(risposta.uno, risposta.due, risposta.tre);
        corpo.classList.add('visibile');
        //ricarica.classList.add('visibile');
    }
} 

function esito(){
    let titolo = document.querySelector('#tit');
    let paragrafo = document.querySelector('#cont');

    if(risposta.due === risposta.tre ){

        titolo.textContent = RESULTS_MAP[risposta.due]['title'];
        paragrafo.textContent = RESULTS_MAP[risposta.due]['contents'];
    }

    else{

        titolo.textContent = RESULTS_MAP[risposta.uno]['title'];
        paragrafo.textContent = RESULTS_MAP[risposta.uno]['contents'];

    }
}

function ricaricapagina (event) {
    
    for(immagine of immagini){
        immagine.addEventListener('click', selezionaImmagine);

        if(immagine.classList.contains('selezionato')){
            immagine.classList.remove('selezionato');
            let cbx = immagine.querySelector('.checkbox');
            cbx.src = 'images/unchecked.png';
        }

        else if(immagine.classList.contains('nonselezionato')){
            immagine.classList.remove('nonselezionato');
        }
        corpo.classList.remove('visibile');
        //ricarica.classList.remove('visibile');
        uno = due = tre = false;
    }
}


function onJson(json) {

    console.log('JSON ricevuto');


    const library = document.querySelector('#view');
    library.innerHTML = '';

      const doc = json.docs;

      const nome = doc.name;
      const genere = doc.family;
      const carboidrati = doc.nutrition.carbohydrates;
      const proteine = doc.nutrition.protein;
      const grassi = doc.nutrition.fat;
      const calorie = doc.nutrition.calories;
      const zuccheri = doc.nutrition.sugar;
  
      const foto = document.createElement('div');
      foto.classList.add('foto');
      
      const caption = document.createElement('span');
      caption.textContent = nome;
      const gen = document.createElement('span');
      gen.textContent = nome;
      const carb = document.createElement('span');
      carb.textContent = nome;
      const pro = document.createElement('span');
      pro.textContent = nome;
      const gra = document.createElement('span');
      gra.textContent = nome;
      const cal = document.createElement('span');
      cal.textContent = nome;
      const zucc = document.createElement('span');
      zucc.textContent = nome;
      
      foto.appendChild(caption);
      foto.appendChild(gen);
      foto.appendChild(carb);
      foto.appendChild(pro);
      foto.appendChild(gra);
      foto.appendChild(cal);
      foto.appendChild(zucc);
      
      library.appendChild(foto);
    }
  
  
  function onResponse(response) {
    console.log('Risposta ricevuta');
    return response.json();
  }
  
  function search(event)
  {
    
    event.preventDefault();
    
    const nome_input = document.querySelector('#nome');
    const nome_value = encodeURIComponent(nome_input.value);
    console.log('Eseguo ricerca: ' + nome_value);
  
    rest_url = 'https://www.fruityvice.com/api/fruit/name=' +nome_value;
    console.log('URL: ' + rest_url);
  
    fetch(rest_url).then(onResponse).then(onJson);
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', search)
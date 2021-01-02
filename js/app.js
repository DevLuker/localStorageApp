//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListener();
function eventListener(){    
    formulario.addEventListener('submit', agregarTweet);
    document.addEventListener('DOMContentLoaded', mostrarLocalStorageHTML);

}

//Funciones
function agregarTweet(e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;
    if(tweet === ''){
        mostrarError('No se puede enviar datos vacíos');
        return;
    }
    obtenerTweet(tweet);
    
}

function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);

}

function obtenerTweet(tweet){

    const tweetObject = {
        id: Date.now(),
        tweet    
    }    
    
    tweets = [...tweets, tweetObject];
    crearHtml(tweets); 
    formulario.reset();   
}

function crearHtml(){
    limpiarHtml();    
    if(tweets.length > 0){
        tweets.forEach(tweet => {
            const li = document.createElement('li');
            const btnEliminar = document.createElement('a');
            btnEliminar.textContent = 'X';
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.onclick = () => {
                eliminarTweet(tweet.id);
            }

            li.textContent = tweet.tweet;
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
        });
    } 
    
    sincronizarLocalStorage();
}

function limpiarHtml(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}

function eliminarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHtml();
}

function sincronizarLocalStorage(){
    localStorage.setItem('tweet', JSON.stringify(tweets));
}

function mostrarLocalStorageHTML(){
    tweets =  JSON.parse(localStorage.getItem('tweet')) || [];
    crearHtml();
}
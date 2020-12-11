let checkJugador = document.getElementById('check17');

const encontradoOrNot = (e) =>{
    console.log(e);
    let elementoPadre = e.target.parentElement.parentElement.parentElement;
    if (e.target.checked){
        elementoPadre.classList.replace('jugador-prueba-no-encontrado', 'jugador-prueba-encontrado');
    }
    else{
        elementoPadre.classList.replace('jugador-prueba-encontrado', 'jugador-prueba-no-encontrado');
    }
}
checkJugador.addEventListener('click', encontradoOrNot);
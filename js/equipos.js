/*********************** Equipos ***********************/

class Equipo{
    constructor(equipo){
        this.id = equipo.id;
        this.escudo = equipo.escudo;
        this.nombre = equipo.nombre;
        this.estadio = equipo.estadio;
        this.fundacion = equipo.fundacion;
        this.presidente = equipo.presidente;
        this.jugadores = new Array();
    }
    agregarJugador(jugador){
        this.jugadores.push(jugador);
    }
    agregarJugadores(jugadores){
        jugadores.forEach(jugador => {
            this.jugadores.push(jugador);
        });
    }
}

let equipos = new Array();


const listaEquipos = document.getElementById('lista_equipos');

const getEquipos = async () => {
    return new Promise ((resolve, reject) => {
        axios({
            method : 'GET',
            url: 'https://immense-mountain-28279.herokuapp.com/api/equipos',
        }).then (res => {
            resolve(res.data);
        }).catch (error => console.error(error));
    })
}
const rellenarMenuEquipos = (equipos) => {
    let fragment = document.createDocumentFragment();
    for (const equipo of equipos){
        let elemento = document.createElement('LI');
        let escudo = document.createElement('IMG');
        escudo.src = `media/equipos/${equipo.escudo}`;
        escudo.alt = equipo.nombre;
        escudo.classList.add('icono-menu-equipo');
        elemento.appendChild(escudo);
        fragment.appendChild(elemento);
    }
    listaEquipos.appendChild(fragment);
}
const cargarEquipos = async () => {
    try{
        let equiposData = await getEquipos();
        equiposData.forEach(equipo => {
            equipos.push(new Equipo(equipo));
        });
        rellenarMenuEquipos(equipos);
        listaEquipos.classList.add('lista_equipos');
    } catch (error){
        throw new Error(error);
    }
}
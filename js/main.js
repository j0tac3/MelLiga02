const cargarEquiposJugadores = () => {
    for (let equipo of equipos) {
        rellenarEquipoJugadores(jugadores, equipo);
    }
}
rellenarEquipoJugadores = (jugadores, equipo) => {
    for (let jugador of jugadores) {
        let jugadoresEquipo = jugadores.filter(jugador => jugador.equipo_id == equipo.id && jugador.seccion == 'Base');
        equipo.jugadores = jugadoresEquipo;
        //equipo.jugadores.push(new Jugador(jugador));
    }
}
const cargaInicial = async () => {
    await cargarEquipos();
    await cargarJugadores();
    cargarEquiposJugadores()
    if (window.location.pathname == '/index.html'){
        cargarTarjetasJugadores(equipos[0]);
    }
}

cargaInicial();
listaEquipos.addEventListener('click', cambiarTarjetasJugadores)
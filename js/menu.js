const menuLateral = document.getElementById('menu-lateral');
const menuLateralLista = document.getElementById('menu-lateral_lista');
const iconoMenuLateral = document.getElementById('icono-menu_lateral');

const mostrarOcultarMenu = () => {
    let menuVisible = document.getElementsByClassName('menu-lateral_visible');
    if (menuVisible.length > 0){
        menuLateral.classList.remove('menu-lateral_visible');
    }
    else {
        menuLateral.classList.add('menu-lateral_visible');
    }
}

menuLateral.addEventListener('click', mostrarOcultarMenu);
iconoMenuLateral.addEventListener('click', mostrarOcultarMenu);
const plikPole = document.querySelector('.plik-pole'),
    filtrOpcje = document.querySelector('.filtr button'),
    podgladZdjecia = document.querySelector('.podglad-zdjecia img'),
    wybierzZdjeciePrzycisk = document.querySelector('.wybierz-zdjecie');


const zaladujZdjecie = () => {
    let plik = plikPole.files[0];
    if (!plik) return;
    podgladZdjecia.src = URL.createObjectURL(plik);
    podgladZdjecia.addEventListener('load', () => {
        document.querySelector('.blok').classList.remove('wylaczony');
    });
}


filtrOpcje.forEach(opcja => {
    opcja.addEventListener('click', () => {
        document.querySelector('.filtr .aktywny').classList.remove('aktywny');
        opcja.classList.add('aktywny');
    });
});

plikPole.addEventListener('change', zaladujZdjecie);

wybierzZdjeciePrzycisk.addEventListener('click', () => plikPole.click());
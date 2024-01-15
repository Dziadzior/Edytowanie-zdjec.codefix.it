const plikPole = document.querySelector('.plik-pole'),
    filtrOpcje = document.querySelectorAll('.filtr button'),
    filtrNazwa = document.querySelector('.filtr-info .nazwa'),
    filtrWartosc = document.querySelector('.pasek .wartosc'),
    filtrPasek = document.querySelector('.pasek input'),
    podgladZdjecia = document.querySelector('.podglad-zdjecia img'),
    wybierzZdjeciePrzycisk = document.querySelector('.wybierz-zdjecie');

let jasnosc = 100,
    saturacja = 100,
    inwersja = 0,
    skala = 0;

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
        filtrNazwa.innerText = opcja.innerText;
    });
});

const aktualizacjaFiltr = () => {
    filtrWartosc.innerText = `${filtrPasek.value}%`;
    const wybranyFiltr = document.querySelector('.filtr .aktywny');

    if (wybranyFiltr.id === 'jasnosc') {
        jasnosc = filtrPasek.value;
    } else if(wybranyFiltr.id === 'saturacja') {
        saturacja = filtrPasek.value;
    } else if(wybranyFiltr.id === 'inwersja') {
        inwersja = filtrPasek.value;
    } else {
        skala = filtrPasek.value;
    }
}

plikPole.addEventListener('change', zaladujZdjecie);
filtrPasek.addEventListener('input', aktualizacjaFiltr);
wybierzZdjeciePrzycisk.addEventListener('click', () => plikPole.click());
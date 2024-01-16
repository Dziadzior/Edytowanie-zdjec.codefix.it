const plikPole = document.querySelector('.plik-pole'),
    filtrOpcje = document.querySelectorAll('.filtr button'),
    filtrNazwa = document.querySelector('.filtr-info .nazwa'),
    filtrWartosc = document.querySelector('.pasek .wartosc'),
    filtrPasek = document.querySelector('.pasek input'),
    obrotOpcje = document.querySelectorAll('.obrot button'),
    podgladZdjecia = document.querySelector('.podglad-zdjecia img'),
    resetujFiltryPrzycisk = document.querySelector('.reset-filtry'),
    wybierzZdjeciePrzycisk = document.querySelector('.wybierz-zdjecie'),
    zapiszZdjeciePrzycisk = document.querySelector('.zapisz-zdjecie');

let jasnosc = 100,
    saturacja = 100,
    inwersja = 0,
    skala = 0;

let obrot = 0, przePoziomo = 1, przePionowo = 1;

const dodanieFiltrow = () => {
    podgladZdjecia.style.transform = `rotate(${obrot}deg) scale(${przePoziomo}, ${przePionowo})`;
    podgladZdjecia.style.filter = `brightness(${jasnosc}%) saturate(${saturacja}%) invert(${inwersja}%) grayscale(${skala}%)`
}

const zaladujZdjecie = () => {
    let plik = plikPole.files[0];
    if (!plik) return;
    podgladZdjecia.src = URL.createObjectURL(plik);
    podgladZdjecia.addEventListener('load', () => {
        resetujFiltryPrzycisk.click();
        document.querySelector('.blok').classList.remove('wylaczony');
    });
}


filtrOpcje.forEach(opcja => {
    opcja.addEventListener('click', () => {
        document.querySelector('.filtr .aktywny').classList.remove('aktywny');
        opcja.classList.add('aktywny');
        filtrNazwa.innerText = opcja.innerText;

        if (opcja.id === "jasnosc") {
            filtrPasek.max = "200";
            filtrPasek.value = jasnosc;
            filtrWartosc.innerText = `${jasnosc}%`;
        } else if (opcja.id === "saturacja") {
            filtrPasek.max = "200";
            filtrPasek.value = saturacja;
            filtrWartosc.innerText = `${saturacja}%`;
        } else if (opcja.id === "inwersja") {
            filtrPasek.max = "100";
            filtrPasek.value = inwersja;
            filtrWartosc.innerText = `${inwersja}%`;
        } else {
            filtrPasek.max = "100";
            filtrPasek.value = skala;
            filtrWartosc.innerText = `${skala}%`;
        }
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

    dodanieFiltrow();
}


obrotOpcje.forEach(opcja => {
    opcja.addEventListener('click', () => {
        if (opcja.id === 'lewa') {
            obrot -= 90;
        } else if (opcja.id === 'prawa') {
            obrot += 90;
        } else if (opcja.id === 'pionowo') {
            przePionowo = przePionowo === 1 ? -1 : 1;
        } else {
            przePoziomo = przePoziomo === 1 ? -1 : 1;
        }
        dodanieFiltrow();
    })
})

const resetujFiltry = () => {
    jasnosc = 100,
    saturacja = 100,
    inwersja = 0,
    skala = 0;
    obrot = 0, przePoziomo = 1, przePionowo = 1;
    filtrOpcje[0].click();

    dodanieFiltrow();
}

const zapiszZdjecie = () => { 
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = podgladZdjecia.naturalWidth;
    canvas.height = podgladZdjecia.naturalHeight;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    if (obrot !== 0) {
        ctx.rotate(obrot * Math.PI / 180);
    }
    ctx.scale(przePoziomo, przePionowo);
    ctx.filter = `brightness(${jasnosc}%) saturate(${saturacja}%) invert(${inwersja}%) grayscale(${skala}%)`;
    ctx.drawImage(podgladZdjecia, -canvas.width / 2, -canvas.height / 2, canvas.width, canvas.height);
    
    const link = document.createElement('a');
    link.download = 'zdjecie.jpg';
    link.href = canvas.toDataURL();
    link.click();
}

plikPole.addEventListener('change', zaladujZdjecie);
filtrPasek.addEventListener('input', aktualizacjaFiltr);
resetujFiltryPrzycisk.addEventListener('click', resetujFiltry);
zapiszZdjeciePrzycisk.addEventListener('click', zapiszZdjecie);
wybierzZdjeciePrzycisk.addEventListener('click', () => plikPole.click());
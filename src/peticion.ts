import {Activity} from "./utils/activity";

//O6KsUnkEtYLvwwkzJYDwguXU3YlXZkk11BBD2UdT43iqScf5wJv3Zw4z
let a:any = 'a';
let endpoint = 'http://bored.api.lewagon.com/api/activity/';

let span = document.getElementsByTagName('p')[1]
async function mostrarInfo() {
    const tipo = obtenActividad()
    endpoint += `?tipe=${tipo}`
    a = await buscaImagen(tipo)
    console.log('hola')
    console.log(a)
     fetch(endpoint).then((respuesta) => respuesta.json()).then((data) =>{
        let actividad: Activity = data;
        span.innerHTML = `
        <div class="card mb-3">
            <img src="${a}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${actividad.activity}</h5>
                <p class="card-text">
                Esta actividad esta pensada para ${actividad.participants} personas <br>
                El precio de esta actividad ${actividad.price} € <br>
                Nivel de la accesibilidad ${actividad.accessibility}
                
                </p>
                <p class="card-text"><small class="text-body-secondary">${actividad.participants <= 1 ? 'Disfruta de tu soledad' : 'Pásalo bien en familia'} <br>

                
                </small></p>
            </div>
        </div>
        
        `
     })
}

function obtenActividad(){
    let actividad = document.getElementById("tipos") as HTMLSelectElement;

    return actividad.value;
}


// async function buscaImagen(tipo:String,a:any): Promise<string>{
//     await fetch(`https://api.pexels.com/v1/search?query=${tipo}`, {
//         headers: {
//           'Authorization': 'O6KsUnkEtYLvwwkzJYDwguXU3YlXZkk11BBD2UdT43iqScf5wJv3Zw4z', // Si necesitas autenticación con token
//         }
//       }).then((respuesta) => respuesta.json()).then((data) =>{ 
//         let Photos: Photos = data;
//         console.log('busca imagen')
//         console.log(Photos.photos[1].src.landscape)
//         a = Photos.photos[1].src.landscape
//     })
// }

async function buscaImagen(tipo: string ): Promise<string | undefined> {
    try {
        const respuesta = await fetch(`https://api.pexels.com/v1/search?query=${tipo}`, {
            headers: {
                Authorization: 'O6KsUnkEtYLvwwkzJYDwguXU3YlXZkk11BBD2UdT43iqScf5wJv3Zw4z'
            }
        });
        const data = await respuesta.json();
        
        if (data.photos && data.photos.length > 0) {
            console.log(data.photos[0].src.original);
            return data.photos[0].src.original;
        } else {
            console.error('No se encontraron fotos para la actividad.');
            return undefined;
        }
    } catch (error) {
        console.error('Error en la solicitud de imágenes:', error);
        return undefined;
    }
}
document.getElementById("boton")?.addEventListener("click", mostrarInfo);

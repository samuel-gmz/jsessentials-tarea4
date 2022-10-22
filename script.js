document.getElementById('api-products').addEventListener('click', () => {
    document.getElementById('container').style.display = 'grid'
    document.getElementById('pagination').style.display = 'flex'
    document.getElementById('api-products').style.display = 'none'
    document.getElementById('local-products').style.display = 'flex'
    document.getElementById('container2').style.display = 'none'
    getProducts()
})

document.getElementById('local-products').addEventListener('click', () => {
    document.getElementById('container2').style.display = 'grid'
    document.getElementById('pagination').style.display = 'none'
    document.getElementById('local-products').style.display = 'none'
    document.getElementById('api-products').style.display = 'flex'
    document.getElementById('container').style.display = 'none'
    showProducts()
})

const productos = [
    {
        title: "PC GAME Empire Earth 3",
        thumbnail: "https://aux3.iconspalace.com/uploads/6354194641088929997.png"
    },
    {
        title: "PC GAME Mount & Blade",
        thumbnail: "https://aux.iconspalace.com/uploads/19245604371472085559.png"
    },
    {
        title: "PC GAME Crysis Warhead",
        thumbnail: "https://aux.iconspalace.com/uploads/1614758672232510841.png"
    },
    {
        title: "PC GAME Team Fortress 2",
        thumbnail: "https://aux4.iconspalace.com/uploads/836564662833596194.png"
    },
    {
        title: "PC GAME Doom 3",
        thumbnail: "https://aux.iconspalace.com/uploads/18600674542003481910.png"
    },
    {
        title: "PC GAME The Witcher Enhanced Edition",
        thumbnail: "https://aux.iconspalace.com/uploads/16331055941707220572.png"
    },
    {
        title: "PC GAME Unreal Tournament 3",
        thumbnail: "https://aux.iconspalace.com/uploads/210510018424822349.png"
    },
    {
        title: "PC GAME Stranglehold",
        thumbnail: "https://aux.iconspalace.com/uploads/2054722076565361177.png"
    }
]

const isOK = true

const customFetch = (time, task) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(isOK) {
                resolve(task)
            } else {
                reject("Error")
            }
        })
    }, time)
}

const showProducts = () => {
    let arrayProductos = customFetch(2000, productos).then(
        data => {
            let products = ''
            for(let i=0; i<data.length; i++) {
                products += `<div class="product">
                <img class="thumbnail" src="${data[i].thumbnail}">
                <h3 class="title">${data[i].title}</h3>
                </div>`
            }
            document.getElementById('container2').innerHTML = products
        }
    )
    
}

let offsetLet = 0

const btnAnterior = document.getElementById('btnAnterior')
const btnSiguiente = document.getElementById('btnSiguiente')

btnSiguiente.addEventListener('click', () => {
    offsetLet += 8
    getProducts()
})

btnAnterior.addEventListener('click', () => {
    if (offsetLet >= 8) {
        offsetLet -= 8
        getProducts()
    }
})

const getProducts = async () => {
    const respuesta = await axios.get('https://api.mercadolibre.com/sites/MLC/search?q=videogames', {
        params: {
            limit: 8,
            offset: offsetLet
        }
    })

    dibujar(respuesta)
}   

const dibujar = (respuesta) => {
    let products = ''
    respuesta.data.results.forEach(product => {
        products += `<div class="product">
        <img class="thumbnail" src="http://http2.mlstatic.com/D_${product.thumbnail_id}-I.jpg">
        <h3 class="title">${product.title}</h3>
        </div>`
    })
    document.getElementById('container').innerHTML = products
}
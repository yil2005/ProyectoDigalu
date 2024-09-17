document.addEventListener('DOMContentLoaded', () => {
    // Obtener los datos del usuario del localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Verificar si hay datos y mostrarlos en la página
    if (userData) {
        console.log('Datos del usuario:', userData);

        // Mostrar los datos del usuario en el HTML
        document.getElementById('user-email').textContent = userData.correo;
        document.getElementById('user-id').textContent = `ID de usuario: ${userData.id_usuario}`;

        // Mostrar el div con la información del usuario
        document.getElementById('user-info').style.display = 'block';
    } else {
        console.log('No hay datos de usuario almacenados.');

        // Ocultar el div si no hay datos de usuario
        document.getElementById('user-info').style.display = 'none';
    }

    // Llamada a la función para cargar la galería
    GalleryCard();
});


let cart = []; // Array para almacenar los productos seleccionados

async function GalleryCard() {
    try {
        // Obtener los datos del usuario del localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        const id_usuario = userData ? userData.id_usuario : null;

        // Si no hay id_usuario, no continúa
        if (!id_usuario) {
            console.log('No hay usuario logueado.');
            return;
        }

        const response = await fetch('./data/dataimg.json');
        const data = await response.json();
        let selectionproducts = document.getElementById('products');
        let gallery = document.createElement('div');
        gallery.setAttribute('class', 'gallerycontainer');

        console.log(data);
        data.forEach(({ nombre, url, precio, starts }) => {
            const card = document.createElement('div');
            const img = document.createElement('img');
            const price = document.createElement('p');
            const name = document.createElement('p');
            const icon = document.createElement('i');
            const containerInfo = document.createElement('div');
            const rating = document.createElement('div');
            
            // Añadiendo texto a los elementos
            name.append(document.createTextNode(nombre));
            price.appendChild(document.createTextNode(precio || 'N/A'));

            // Añadiendo clases CSS
            img.setAttribute("class", "imgshopping");
            card.setAttribute("class", "card");
            icon.setAttribute("class", "bx bx-cart-download");
            containerInfo.setAttribute("class", "info");
            rating.setAttribute("class", "rating");

            // Configurar el sistema de rating con estrellas
            for (let i = 5; i > 0; i--) {
                const inputStar = document.createElement('input');
                const labelStar = document.createElement('label');
                
                inputStar.value = i;
                inputStar.name = `rating-${nombre}`; // Para que cada producto tenga su propio grupo de radios
                inputStar.id = `star${i}-${nombre}`;
                inputStar.type = "radio";
                if (i === starts) {
                    inputStar.checked = true; // Marca la estrella correspondiente al valor de starts
                }
                
                labelStar.htmlFor = inputStar.id;
                
                rating.appendChild(inputStar);
                rating.appendChild(labelStar);
            }

            // Añadir funcionalidad para agregar productos al carrito
            card.addEventListener('click', () => {
                addToCart({ nombre, precio, url, carrito_user: id_usuario }); // Añadir el id_usuario al producto
            });

            // Añadir elementos a la tarjeta
            img.src = url;
            card.appendChild(img);
            card.appendChild(icon);
            containerInfo.appendChild(name);
            containerInfo.appendChild(price);
            card.appendChild(containerInfo);
            card.appendChild(rating);
            gallery.appendChild(card);
        });

        // Añadir la galería al contenedor principal
        selectionproducts.appendChild(gallery);

    } catch (error) {
        console.log(error);
    }
}

// Función para agregar productos al carrito
function addToCart(product) {
    cart.push(product); // Añadir el producto al array del carrito
    displayCart(); // Actualizar la vista del carrito
}

// Función para mostrar el carrito
function displayCart() {
    let cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; // Limpiar el contenido actual

    cart.forEach((product, index) => {
        let productElement = document.createElement('div');
        productElement.innerHTML = `<p>${product.nombre} - ${product.precio} - Usuario: ${product.carrito_user}</p>`;
        
        // Botón para eliminar un producto del carrito
        let removeButton = document.createElement('button');
        removeButton.innerText = 'Eliminar';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });

        productElement.appendChild(removeButton);
        cartContainer.appendChild(productElement);
    });
}

// Función para eliminar productos del carrito
function removeFromCart(index) {
    cart.splice(index, 1); // Eliminar el producto del array del carrito
    displayCart(); // Actualizar la vista del carrito
}

// Llamada a la función para cargar la galería
GalleryCard();
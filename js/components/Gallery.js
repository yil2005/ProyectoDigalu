

async function GalleryCard(){
    try {
        const response = await fetch('./data/dataimg.json')
        const data = await response.json()
        let selectionproducts = document.getElementById('products')
        let gallery = document.createElement('div');
        gallery.setAttribute('class', 'gallerycontainer')
        
        console.log(data);
        data.forEach(({nombre, url, precio})=> { 
            const card = document.createElement('div');                
            const img = document.createElement('img');
            const price = document.createElement('p');
            const name = document.createElement('p')
            const icon = document.createElement('i');
            name.append(document.createTextNode(nombre))
            price.appendChild(document.createTextNode(precio))
            img.setAttribute("class", "imgshopping")
            card.setAttribute("class", "card");
            icon.setAttribute("class", "bx bx-cart-download")            
            img.src = url;
            card.appendChild(img)            
            card.appendChild(icon)
            card.appendChild(name)
            card.appendChild(price)                        
            gallery.appendChild(card)            

            
        });
        selectionproducts.appendChild(gallery)
            
      
    } catch (error) {
        
    }



}

GalleryCard();






async function GalleryCard(){
    try {
        const response = await fetch('./data/dataimg.json')
        const data = await response.json()
        let gallery = document.createElement('div');
        gallery.setAttribute('class', 'gallerycontainer')
        
        console.log(data);
        data.forEach(({nombre, url, precio})=> { 
            const card = document.createElement('div');                
            const img = document.createElement('img');
            const price = document.createElement('p');
            price .appendChild(document.createTextNode(precio))
            img.setAttribute("class", "imgshopping")
            card.setAttribute("class", "card");
            
            img.src = url;
            card.appendChild(img)
            card.appendChild(price)
            gallery.appendChild(card)

            
        });
        document.body.appendChild(gallery)
            
      
    } catch (error) {
        
    }



}

GalleryCard();




<<<<<<< HEAD:static/Script.js
        // GET
=======
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Olivanders</title>
    <link rel="stylesheet" type="text/css" media="screen" href="bonito.css">
    <div align="center"><img src="img/olivlogo.png" width="500" height="220"></div>
</head>

<body>  
    <form class="add-item">
        <input type="text" name="name" placeholder="Item Name" required/>
        <input type="text" name="sell_in" placeholder="Sell in" />
        <input type="text" name="quality" placeholder="Quality" required />
        <input type="submit" value="Añadir Item" />
        <input type="reset" value="Reset" />
        <input type="button" name="delete" value="Eliminar Item" />
    </form>
    <br >
    <form class="filter-item">
    <!--    <input id="itemName" type="text" name="name" placeholder="Item Name" />
        <input type="text" name="sell_in" placeholder="Sell in" />
        <input type="text" name="quality" placeholder="Quality" /> --> 
        <input type="submit" value="Filtrar Item" />  
        </form>

        <button class="button button1" id="inventario">Inventario</button>
        <button class="button button2" id="updateQuality">Update Quality</button>
    
        <ul id="itemList"></ul>
        <ul id="itemsName"></ul>

    <script>


        // GET del inventario
>>>>>>> Miquel:client-side-js/index.html

    
        function inventario() {

            var miInit = { method: 'GET',
                           mode: 'cors',
                           // cambiarlo a force-cache => carga del disco
                           cache: 'default' };


            fetch('http://127.0.0.1:5000/inventario', miInit)
                .then((response) => {
                    if(response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => itemsTable(json))
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);  
                    }  
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

<<<<<<< HEAD:static/Script.js
        // intentar cachear con la cabecera mirando network de chrome

        function itemsTable(json) {
            let contenido="";
            $.each(json, function(index, item) {
                contenido += "<tr><th scope='row'>" + item.name + "</th>" +
                    "<td>" + item.sell_in + "</td>" +
                    "<td>" + item.quality + "</td></tr>"
                });
            $("#structureTable").html(contenido);
        }

=======
                // La devolucion de la lista de Items
                function logItems(items) {
            const itemsList = document.querySelector('#itemList');
            itemList.innerHTML = items.map((item, i) => {
                return `
                        <li>
                            <p id="item${i}"> ${item.name}  
                                            ${item.sell_in}  
                                            ${item.quality}</p>
                        </li>
                        `;
            }).join('');
        }

        
        // GET del update quality
        const inventButtons = document.querySelector('#updateQuality');
        inventButtons.addEventListener("click", updateQuality);

        function updateQuality() {

            var myInit = { method: 'GET',
                           mode: 'cors',
                           // cambiarlo a force-cache => carga del disco
                           cache: 'default' };


            fetch('http://127.0.0.1:5000/update-quality', myInit)
                .then((response) => {
                    if(response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => logItems(json))
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);  
                    }  
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

>>>>>>> Miquel:client-side-js/index.html

        // POST
        // curl -d name="Conjured Mana Cake" -d sell_in=5 -d quality=8
        // http://192.168.0.19:5000/items

        //let data = {name: "Conjured Mana Cake",
          //          sell_in: 5,
          //          quality: 8};

        let formulario = document.querySelector('.add-item');
        formulario.addEventListener('submit', addItem);

        function addItem(e) {
            e.preventDefault();
            // elementos del formulario en un array-like object:
            // form.elements 
            // pag 396 libro rhino
            logForm();

            let data = { name: this.elements.name.value,
                         // sellin => bad request, status 400
                         // sin valor => mensaje del servidor en consola
                         // en XHR and fetch: message: {sell_in: "sellIn required"}
                         sell_in: this.elements.sell_in.value,
                         quality: this.elements.quality.value};

            fetch('http://127.0.0.1:5000/items', {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }



        //  Creando función para filtrar items (sin funcionar)
        let formularios = document.querySelector('.filter-item');
        formularios.addEventListener('submit', getItems);

        function getItems(itemName) {

            var mHeaders = new Headers();

            var mInit = { method: 'GET',
                           headers: mHeaders,
                           mode: 'cors',
                           cache: 'default' };
            fetch('http://127.0.0.1:5000/items/name/Salmon', mInit)
            .then((response) => {
                    if(response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => logNameItems(json))
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);  
                    }  
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

        function logNameItems(items) {
            const itemsName = document.querySelector('#itemsName');
            itemsName.innerHTML = items.map((item, i) => {
                return `
                        <li>
                            <p id="item${i}"> ${item.name}  
                                            ${item.sell_in}  
                                            ${item.quality}</p>
                        </li>
                        `;
            }).join('');
        }
//

        // DELETE
        // curl -d name="Conjured Mana Cake" -d sell_in=5 -d quality=8
        // http://127.0.0.1/items -X DELETE

        formulario.delete.addEventListener('click', deleteItemPromise);

        function deleteItem() {
            // elementos del formulario en un array-like object:
            // form.elements 
            // pag 396 libro rhino
            logForm();

            let data = { name: formulario.elements.name.value,
                         // sellin => bad request, status 400
                         // sin valor => mensaje del servidor en consola
                         // en XHR and fetch: message: {sell_in: "sellIn required"}
                         sell_in: formulario.elements.sell_in.value,
                         quality: formulario.elements.quality.value };

            fetch('http://127.0.0.1:5000/items', {
                method: 'DELETE',
                body: JSON.stringify(data), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                    if (response.ok) {
                        console.log("Response OK Status:", response.status);
                        console.log("Reponse OK status text:", response.statusText);
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                    }
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

        // delete Item con promesas
        
        function deleteItemPromise() {
            // elementos del formulario en un array-like object:
            // form.elements 
            // pag 396 libro rhino
            logForm();

            let data = { name: formulario.elements.name.value,
                         // sellin => bad request, status 400
                         // sin valor => mensaje del servidor en consola
                         // en XHR and fetch: message: {sell_in: "sellIn required"}
                         sell_in: formulario.elements.sell_in.value,
                         quality: formulario.elements.quality.value };
            
            const promesa = new Promise((resolve, reject) => {
                    
                    fetch('http://127.0.0.1:5000/items', {
                        method: 'DELETE',
                        body: JSON.stringify(data), // data can be `string` or {object}!
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        if (response.ok) {
                            setTimeout(() => { resolve(response.statusText)}, 5000);
                        } else {
                            reject(response.statusText);
                        }
                    })
                });
            
            promesa.then(statusText => console.log(`"Item eliminado: ${statusText}`))
                   .then(() => inventario())
                   .catch((statusText) => {
                        console.log(`Item NO borrado: ${statusText}`);
                    });

            console.log("El código sigue sin esperar al setTimeout");              
        }


        function logForm() {
            // for sobre form.elements no sirve
            // porque muestra buttons tb
            let formulario = document.querySelector('.add-item');
            console.log( formulario.elements.name.value,
                         formulario.elements.sell_in.value,
                         formulario.elements.quality.value);
        }

        /**
         * Limpiar tabla
         */

        function cleanTable() {
            //Limpieza de ID $("#X").Y("");
            $("#NombreProducto").val("");
            $("#NombreSellIn").val("");
            $("#NombreQuality").val("");
        }
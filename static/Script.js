
        // GET del inventario

        function inventario() {
            var miHeaders = new Headers();

            var miInit = { method: 'GET',
                           mode: 'cors',
                           headers: miHeaders,
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


        function updateQuality() {

            var miHeaders = new Headers();

            var miInit = { method: 'GET',
                           mode: 'cors',
                           headers: miHeaders,
                           // cambiarlo a force-cache => carga del disco
                           cache: 'default' };


            fetch('http://127.0.0.1:5000/update-quality', miInit)
                .then((response) => {
                    if(response.ok) {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);
                        response.json().then((json) => updateTable(json))
                    } else {
                        console.log("Response Status:", response.status);
                        console.log("Reponse statuts text:", response.statusText);  
                    }  
                })
                .catch((error) => {
                    console.log(error.message);
                });
        }

        function updateTable(json) {
            let contenido="";
            $.each(json, function(index, item) {
                contenido += "<tr><th scope='row'>" + item.name + "</th>" +
                    "<td>" + item.sell_in + "</td>" +
                    "<td>" + item.quality + "</td></tr>"
                });
            $("#structureTable").html(contenido);
        }


        // ADD ITEM

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


        // DELETE
        // curl -d name="Conjured Mana Cake" -d sell_in=5 -d quality=8
        // http://127.0.0.1/items -X DELETE


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

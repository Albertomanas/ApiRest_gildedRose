
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

            var myHeaders = new Headers();

            var myInit = { method: 'GET',
                           mode: 'cors',
                           headers: myHeaders,
                           // cambiarlo a force-cache => carga del disco
                           cache: 'default' };


            fetch('http://127.0.0.1:5000/update-quality', myInit)
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


       
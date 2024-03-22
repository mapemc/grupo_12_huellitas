window.addEventListener("load", () =>{

    let form = document.querySelector("#form");

    let errorsHTML = document.querySelector(".errors");


        //////////IMAGEN DE PRODUCTO////////////
        const fileField = document.querySelector("#photo");
        

        fileField.addEventListener("change", (event) => {
            if (!event.target.files || event.target.files.length === 0) {
                errorsHTML.innerHTML = "<li>Tienes que subir una foto</li>";
                event.preventDefault(); // Evita que se envíe el formulario si no se ha subido ninguna imagen
            } else {
            // Si se ha subido un archivo, borra cualquier mensaje de error previo
            errorsHTML.innerHTML = "";
            }
        });

        form.addEventListener("submit", function(e){

            let errorsList = [];

            let campoName = document.querySelector("#name")
            if(campoName.value == ""){
                errorsList.push ("Completa el campo nombre")
            } /* else if (campoName.value.length < 5){
                errorsList.push("El nombre debe tener al menos 5 caracteres")
            } */

            let campoDescription = document.querySelector("#description")
            if(campoDescription.value == ""){
                errorsList.push ("Completa el campo descripción")
            } /* else if (campoDescription.value.length < 20){
                errorsList.push("La descripción debe tener al menos 20 caracteres")
            } */
            
            let campoPrice = document.querySelector("#price")
            if(campoPrice.value == ""){
                errorsList.push ("Completa el campo precio")
            } 

            let campoStock = document.querySelector("#stock")
            if(campoStock.value == ""){
                errorsList.push ("Completa el campo stock")
            } 

            if (errorsList.length > 0){
                e.preventDefault();
                errorsHTML.innerHTML = "";
                errorsList.forEach(error => {
                    errorsHTML.innerHTML += "<li>" + error + "</li>"
                })
            }
            console.log("Se envia el formulario!");
        })

})
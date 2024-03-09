window.addEventListener("load", () => {

    let form = document.querySelector("#form");
    console.log(form);
    
    //let errorsHTML = document.querySelector(".errors");

    /* form.addEventListener("submit", (event) => {
        //console.log("se envió");
       

        let errorsList = [];

        ////nombre///
        if (form.username.value == "") {
            errorsList.push("Debes escribir un nombre de usuario");
        } else if (form.username.value.length < 2) {
            errorsList.push("El nombre debe tener al menos 4 caracteres");
        }

       
        ////email/////
        // Regex simple
        let reg1 = /\S+@\S+\.\S+/;
        
        if (form.email.value == "") {
            errorsList.push("Debes escribir un email");
        } else if (!reg1.test(form.email.value)) {
            errorsList.push("El email debe tener un formato válido");
        }


        


        // Si el array no está vacio, tenemos errores
        if (errorsList.length > 0) {
            event.preventDefault();
            errorsHTML.innerHTML = "";
            errorsList.forEach(error => {
                errorsHTML.innerHTML += "<li>" + error + "</li>"
            })
        }
        console.log("Se envia el formulario!");

    }) */
})
    

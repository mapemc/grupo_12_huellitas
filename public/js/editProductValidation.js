window.addEventListener("load", () =>{

    let form = document.querySelector("#form");

    let errorsHTML = document.querySelector(".errors");


        //////////IMAGEN DE PRODUCTO////////////
        const fileField = document.querySelector("#photo");

        console.log(fileField);
    
        fileField.addEventListener("change", (event) => {
    
            console.log(event)

            const errorsFile = [];
            
            const fileExt = (event.target.files[0].name.split(".").pop().toLowerCase());
            const extAllowed = ["jpg", "png", "gif", "jpeg"]
            
            if(!extAllowed.includes(fileExt)){
                errorsFile.push("Las extensiones permitidas son .jpg .png .gif .jpeg")
            }
    
            if (errorsFile.length > 0) {
                event.preventDefault();
                errorsHTML.innerHTML = "";
                errorsFile.forEach(error => {
                    errorsHTML.innerHTML += "<li>" + error + "</li>"
                })
            }
            console.log("Se envia el formulario!");
        });
    

        form.addEventListener("submit", function(e){

            let errorsList = [];

            let campoName = document.querySelector("#name")
            if(campoName.value == ""){
                errorsList.push ("Completa el campo nombre")
            } else if (campoName.value.length < 5){
                errorsList.push("El nombre debe tener al menos 5 caracteres")
            }

            let campoDescription = document.querySelector("#description")
            if(campoDescription.value == ""){
                errorsList.push ("Completa el campo descripción")
            } else if (campoDescription.value.length < 20){
                errorsList.push("La descripción debe tener al menos 20 caracteres")
            }
            
            let campoPrice = document.querySelector("#price")
            if(campoPrice.value == 0){
                errorsList.push ("Completa el campo precio")
            } 

            let campoStock = document.querySelector("#stock")
            if(campoStock.value == 0){
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
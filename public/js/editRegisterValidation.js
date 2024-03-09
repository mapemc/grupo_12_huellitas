window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    console.log(form);
    
    let errorsHTML = document.querySelector(".errors");

    form.addEventListener("submit", (event) => {
        console.log("se envió");
        let errorsList = [];

        /////teléfono//////
   
        if (form.phone.value.length < 10) {
            errorsList.push("El número de teléfono debe ser válido");
        }

        
        //////cambiar contraseña/////////

        const currentPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("new-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        
        //Validar que la contraseña actual no esté vacía
            if (currentPassword.trim() === "") {
                errorsList.push("La contraseña actual no puede estar vacía");
            }

            // Validar que la nueva contraseña no esté vacía y cumpla con tus criterios
            if (newPassword.trim() === "") {
                errorsList.push("La nueva contraseña no puede estar vacía");
            } else if (newPassword.length < 8) {
                errorsList.push("La nueva contraseña debe tener al menos 8 caracteres");
            }

            // Validar que la confirmación de la nueva contraseña coincida
            if (confirmPassword !== newPassword) {
                errorsList.push("La confirmación de la nueva contraseña no coincide");
            }

       
        /////////avatar///////

        const imageInput = document.querySelector("#avatar-input");
        console.log(imageInput);

        /* const selectedImage = imageInput.files[0];
        
        // Verificar si se seleccionó un archivo
        if (imageInput.files.length === 0) {
            errorsList.push("Por favor, seleccione una imagen.");
        } 
        
      ////Verificar el tipo de archivo
        
        if (!selectedImage.type.match(/image\/(jpe?g|png|gif)/)) {
            errorsList.push("Formato de imagen no admitido. Por favor, seleccione una imagen válida.");
        } */
      ///////////////////////////////////
        /* if (selectedImage.type !== "image/jpg" && selectedImage.type !== "image/jpeg" && selectedImage.type !== "image/png" && selectedImage.type !== "image/gif") {
            errorsList.push("Formato de imagen no admitido. Por favor, seleccione una imagen válida.");
            return;
        } */
       
        
        // Verificar el tamaño del archivo
       /*  const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (selectedImage.size > maxSizeInBytes) {
            errorsList.push("La imagen es demasiado grande. Por favor, seleccione una imagen más pequeña.");
        } 
          */
         
        
    
 
     ///////////////////////////////   
     if (errorsList.length > 0) {
        event.preventDefault();
        errorsHTML.innerHTML = "";
        errorsList.forEach(error => {
            errorsHTML.innerHTML += "<li>" + error + "</li>"
        })
    }
    console.log("Se envia el formulario!");

    }) 
})

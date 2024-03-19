window.addEventListener("load", () => {

    let form = document.querySelector(".form");
    console.log(form);
    
    let errorsHTML = document.querySelector(".errors");

    

    //////////AVATAR////////////
    const fileField = document.querySelector("#avatar-input");
    

    fileField.addEventListener("change", (e) => {

        console.log(e);

        const errorsAvatar = [];
        
        const fileExt = (e.target.files[0].name.split(".").pop().toLowerCase());
        const extAllowed = ["jpg", "png", "gif", "jpeg"]
        
        if(!extAllowed.includes(fileExt)){
            errorsAvatar.push("Las extensiones permitidas son .jpg .png .gif .jpeg")
        }

        if (errorsAvatar.length > 0) {
            e.preventDefault();
            errorsHTML.innerHTML = "";
            errorsAvatar.forEach(error => {
                errorsHTML.innerHTML += "<li>" + error + "</li>"
            })
        }
    });

    
    form.addEventListener("submit", (event) => {

        const errorsList = [];
        
        /////////CAMBIAR CONTRASEÑA//////////////////

            // Verificar si se proporcionó una nueva contraseña
            const newPassword = document.getElementById("new-password").value;
            console.log(newPassword);
    
            if (newPassword.trim() !== "") {
                // Solo validar la contraseña si se proporcionó una nueva
                const currentPassword = document.getElementById("current-password").value;
                const confirmPassword = document.getElementById("confirm-password").value;
    
                // Validar que la contraseña actual no esté vacía
                if (currentPassword.trim() === "") {
                    errorsList.push("Complete la contraseña actual");
                }
    
                // Validar que la nueva contraseña cumpla con tus criterios
                if (newPassword.length < 8) {
                    errorsList.push("La nueva contraseña debe tener al menos 8 caracteres");
                }
    
                // Validar que la confirmación de la nueva contraseña coincida
                if (confirmPassword !== newPassword) {
                    errorsList.push("La confirmación de la nueva contraseña no coincide");
                }
            } 

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

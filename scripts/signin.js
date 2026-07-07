const signInForm = document.getElementById("signInForm");
// const userName = document.getElementById("userName");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const signUpStatus = document.getElementById("signupStatus");

signInForm.addEventListener("submit", async function(event){

    event.preventDefault();

    const enteredEmail = userEmail.value.trim();
    const enteredPassword = userPassword.value.trim();

    const { data, error } = await databaseClient.auth.signInWithPassword({
        email: enteredEmail,
        password: enteredPassword
    });

    if(error){
        signUpStatus.textContent = `Error: ${error.message}`;
        signUpStatus.style.color = "red";
    }
    else{
        window.location.href = "index.html";
    }

});

const signUpForm = document.getElementById("signupForm");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const signUpStatus = document.getElementById("signupStatus");

signUpForm.addEventListener("submit", async function(event){
    event.preventDefault();
    // console.log("Form submitted");
    const enteredUserName = userName.value.trim();
    const enteredUserEmail = userEmail.value.trim();
    const enteredUserPassword = userPassword.value.trim();
    // console.log(enteredUserName);
    // console.log(typeof enteredUserEmail);
    // console.log(typeof enteredUserPassword);


    const { data, error} = await databaseClient.auth.signUp({
        email: enteredUserEmail,
        password: enteredUserPassword
    })

    if(error){
        signUpStatus.textContent = `Error:  ${error.message}`;
        signUpStatus.style.color = "red";
    }else{
        signUpStatus.textContent = "Signup successful";
        signUpStatus.style.color = "green";
    }

})


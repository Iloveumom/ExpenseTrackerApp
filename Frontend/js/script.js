
function handleSignup(event) {
  event.preventDefault(); // page reload stop

  // get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();



  let isValid = true;

  // validation
  if (name === "") {
    document.getElementById("nameError").innerText = "Name is required";
    isValid = false;
  }

  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    isValid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").innerText = "Invalid email";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").innerText = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("passwordError").innerText = "Min 6 characters required";
    isValid = false;
  }

  // if validation fail
  if (!isValid) return false;

  // axios post request
  axios.post("http://localhost:4000/users/signup", {
    name: name,
    email: email,
    password: password
  })
  .then(response => {
    //console.log(response);
    const msg=document.getElementById("Msg");
    msg.innerText =response.data.message;
    msg.style="color:green";
    //document.getElementById("signupForm").reset();
    window.location.href = "login.html";
  })
  .catch(error => {
    console.log(error);
    //console.log(error.response.data.message);
     const msg=document.getElementById("Msg");
     msg.innerText =error.response.data.message
     msg.style="color:red";
     document.getElementById("signupForm").reset();
  });

  return false;
}
function handleLogin(event)
{
   event.preventDefault(); // page reload stop

  // get values
 
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  let isValid = true;
  if (email === "") {
    document.getElementById("emailError").innerText = "Email is required";
    isValid = false;
  } else if (!email.includes("@")) {
    document.getElementById("emailError").innerText = "Invalid email";
    isValid = false;
  }

  if (password === "") {
    document.getElementById("passwordError").innerText = "Password is required";
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById("passwordError").innerText = "Min 6 characters required";
    isValid = false;
  }

  // if validation fail
  if (!isValid) return false;

  // axios post request
  axios.post("http://localhost:4000/users/login", {
    email: email,
    password: password
  })
  .then(response => {
    //console.log(response.data.message);
   // console.log(response.data.token);
    //console.log(response.data.user.id);
    
   localStorage.setItem("token",response.data.token);
    const msg=document.getElementById("Msg");
    msg.innerText =response.data.message;
    msg.style="color:green";
    //document.getElementById("signupForm").reset();
    alert("Login successs");
    window.location.href = "index.html";
  })
  .catch(error => {
     console.log(error);
     const msg=document.getElementById("Msg");
     msg.innerText =error.response.data.message
     msg.style="color:red";
     document.getElementById("loginForm").reset();
  });

  return false;
}

async function handleForgotPassword(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const emailError = document.getElementById("emailError");
  const msg = document.getElementById("Msg");

  emailError.innerText = "";
  msg.innerText = "";

  if (!email) {
    emailError.innerText = "Email is required";
    return false;
  }

  try {
    const res = await axios.post(
      "http://localhost:4000/password/forgotpassword",
      { email }
    );

    if (res.data.success) {
      msg.innerText = "Reset password link sent to your email";
    } else {
      emailError.innerText = res.data.message || "Something went wrong";
    }

  } catch (err) {
    emailError.innerText =
      err.response?.data?.message || "Server error, try again later";
  }

  return false;
}



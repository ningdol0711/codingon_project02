async function userLogin() {
  const id = document.getElementById("loginId").value;
  const pw = document.getElementById("loginPw").value;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/login", {
      id,
      pw,
    });

    const data = response.data;
    alert("Login successful");
    localStorage.setItem("token", data.token);
    location.reload();
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      console.error("Error:", error);
    }
  }
}

async function userRegister() {
  const email = document.getElementById("registerEmail").value;
  const id = document.getElementById("registerId").value;
  const pw = document.getElementById("registerPw").value;

  try {
    const response = await axios.post("http://127.0.0.1:8000/api/register", {
      email,
      id,
      pw,
    });

    alert("Registration successful");
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      console.error("Error:", error);
    }
  }
}

async function userLogout() {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/logout");
    localStorage.removeItem("token");
    alert("Logout successful");
    location.reload();
  } catch (error) {
    if (error.response) {
      alert(error.response.data.message);
    } else {
      console.error("Error:", error);
    }
  }
}

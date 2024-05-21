const menu = document.querySelector(".menu-btn");

if (localStorage.getItem("token")) {
  menu.innerHTML = `
  <div class="menu-icon-box"><i class="bi bi-menu-button menu-icon"></i></div>
  <div class="menu-items">
    <ul class="menu-box">
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Home">
        <a class="icon-link" href="/"><i class="bi bi-house-door"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="My page">
        <a class="icon-link" href="/mypage?data=${localStorage.getItem("token")}"><i class="bi bi-person"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Teams">
        <a class="icon-link" href="/teams"><i class="bi bi-people"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Circuits">
        <a class="icon-link" href="/circuits"><i class="bi bi-signpost-split"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Schedule">
        <a class="icon-link" href="/schedule"><i class="bi bi-calendar-event"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Social">
        <a class="icon-link" href="/social"><i class="bi bi-chat-left-dots"></i></a>
      </li>
      <li class="logout-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Logout">
        <a class="icon-link"><i class="bi bi-door-open"></i></a>
      </li>
    </ul>
  </div>
  `;
} else {
  menu.innerHTML = `
  <div class="menu-icon-box"><i class="bi bi-menu-button menu-icon"></i></div>
  <div class="menu-items">
    <ul class="menu-box">
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Home">
        <a class="icon-link" href="/"><i class="bi bi-house-door"></i></a>
      </li>
      <li class="login-btn tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Login">
        <a class="icon-link"><i class="bi bi-file-earmark-person"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Teams">
        <a class="icon-link" href="/teams"><i class="bi bi-people"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Circuits">
        <a class="icon-link" href="/circuits"><i class="bi bi-signpost-split"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Schedule">
        <a class="icon-link" href="/schedule"><i class="bi bi-calendar-event"></i></a>
      </li>
      <li class="tooltip-btn btn" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Social">
        <a class="icon-link" href="/social"><i class="bi bi-chat-left-dots"></i></a>
      </li>
    </ul>
  </div>
  <div class="login-register-modal">
    <div class="login-card">
      <form action="" name="loginForm">
        <div class="login-modal modal-size">
          <a class="login">Log in</a>
          <div class="inputBox" id="loginInputBox">
            <input type="text" required="required" id="loginId" name="id">
            <span class="user">Username</span>
          </div>
          <div class="inputBox">
            <input type="password" required="required" id="loginPw" name="pw">
            <span>Password</span>
          </div>
          <div class="enterBox">
            <div class="checkCircleBox">
              <div id="checkCircle1"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
              <div id="checkCircle2"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
              <div id="checkCircle3"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
            </div>
            <button type="button" class="enter" onclick="userLogin()">Enter</button>
          </div>
        </div>
      </form>
      <form action="" name="registerForm">
        <div class="register-modal modal-size modal-hide">
          <a class="register">Register</a>
          <div class="inputBox">
            <input type="email" required="required" id="registerEmail" name="email">
            <span class="user">Email</span>
          </div>
          <div class="inputBox">
            <input type="text" required="required" id="registerId" name="id">
            <span>Username</span>
          </div>
          <div class="inputBox">
            <input type="password" required="required" id="registerPw" name="pw">
            <span>Password</span>
          </div>
          <div class="enterBox">
            <div class="checkCircleBox">
              <div id="checkCircle4"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
              <div id="checkCircle5"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
              <div id="checkCircle6"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
              <div id="checkCircle7"><svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"
                  class="bi bi-circle-fill" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="8" />
                </svg></div>
            </div>
            <button type="button" class="enter" onclick="userRegister()">Enter</button>
          </div>
        </div>
      </form>
      <div class="checkbox-wrapper-35">
        <input value="private" name="switch" id="switch" type="checkbox" class="switch">
        <label for="switch">
          <span class="switch-x-text">This is </span>
          <span class="switch-x-toggletext">
            <span class="switch-x-unchecked"><span class="switch-x-hiddenlabel">Unchecked: </span>Login</span>
            <span class="switch-x-checked"><span class="switch-x-hiddenlabel">Checked: </span>Register</span>
          </span>
        </label>
      </div>
    </div>
  </div>
  `;
}

if(document.querySelector('.logout-btn')) {
  const logoutBtn = document.querySelector('.logout-btn');
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    location.reload();
  })
}
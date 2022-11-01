// Register logic
const registerForm = document.getElementById("registerForm");
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const password1 = document.querySelector("#password").value;
  const password2 = document.querySelector("#password-verification").value;
  if (password1 != password2) {
    Swal.fire({
      icon: "error",
      text: "Passwords entered do not match",
      toast: true,
      position: "top-right",
      timer: 2000,
    });
    return;
  }
  let data = new FormData(registerForm);
  console.log(data);
  let obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("api/sessions/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          text: "Succesfully registered",
          toast: true,
          position: "top-right",
          timer: 2000,
        });
        window.setTimeout(() => (window.location.href = "/"), 2000);
      }
    })
    .catch((error) => console.log(error));
});

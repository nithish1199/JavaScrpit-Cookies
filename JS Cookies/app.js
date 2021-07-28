const uname = document.getElementById('username')
const pword = document.getElementById('password')
const form = document.getElementById('form')
const cb = document.getElementById('Remember')
const errorElement = document.getElementById('error')
console.log(getCookie("username"))
if (getCookie("username") != "") {
  let a=getCookie("username")
  let b=getCookie("password")
  a=CryptoJS.AES.decrypt(a, "Secret")
  b=CryptoJS.AES.decrypt(b, "Secret")
  document.getElementById('username').value = a.toString(CryptoJS.enc.Utf8)
  document.getElementById('password').value = b.toString(CryptoJS.enc.Utf8)
}
form.addEventListener('submit', (e) => {
  let msg = []
  let isTrue = cb.checked

  if (uname.value != "LTI" || pword.value != '123') {
    msg.push('Invalid username/password')
  }
  if (uname.value === "" || uname.value == null) {
    msg.push('Name is required')
  }
  if (msg.length > 0) {
    e.preventDefault()
    errorElement.innerText = msg.join(', ')
  }
  else {
    if (isTrue) {
      setCookie("username", CryptoJS.AES.encrypt(uname.value, "Secret"))
      setCookie("password", CryptoJS.AES.encrypt(pword.value, "Secret"))
      console.log(isTrue)
    }
  }
})
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function setCookie(cname, cvalue) {
  const d = new Date();
  console.log(cname, cvalue)
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log(document.cookie)
}




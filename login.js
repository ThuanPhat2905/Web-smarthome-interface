const firebaseConfig = {
    apiKey: "AIzaSyBXpF6JgjUGWFrIa0snaSU3wD6r2XATntw",
    authDomain: "tt-iot-tuan3-5f390.firebaseapp.com",
    databaseURL: "https://tt-iot-tuan3-5f390-default-rtdb.firebaseio.com",
    projectId: "tt-iot-tuan3-5f390",
    storageBucket: "tt-iot-tuan3-5f390.appspot.com",
    messagingSenderId: "330270636150",
    appId: "1:330270636150:web:2da547703b0554b28d8757"
  };
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
 // var database = firebase.database()
 // var auth =    firebase.auth()

// function auth(){
//     var user = document.getElementById("User").value;
//     var password = document.getElementById("Pass").value;
//     if(user == "phat2002" && password == "123456789"){
//         window.location.assign("index.html");
//         alert("Login Successfully");
//     }
//     else{
//         alert("Invalid Information");
//         return;
//     }
// }

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const registerLink = document.getElementById('registerLink');
    const registerModal = document.getElementById('registerModal');
    const closeBtn = document.getElementsByClassName('close')[0];
    const registerForm = document.getElementById('registerForm');

    // Mở modal đăng ký khi nhấp vào liên kết đăng ký
    registerLink.addEventListener('click', function (event) {
        console.log(1)
        event.preventDefault();
        registerModal.style.display = 'block';
        console.log(1)
    });

    // Đóng modal đăng ký khi nhấp vào nút đóng
    closeBtn.addEventListener('click', function () {
        registerModal.style.display = 'none';
    });

    // Đóng modal đăng ký khi nhấp ra ngoài modal
    window.addEventListener('click', function (event) {
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Xử lý sự kiện đăng nhập
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // console.log(loginForm.email.value)
        // const email = loginForm.email.value;
        // const password = loginForm.password.value;
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        console.log(email)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Đăng nhập thành công
                const user = userCredential.user;
                console.log('Đăng nhập thành công!', user);
                alert("Login Successfully");
                window.location.assign("index.html");

            })
            .catch((error) => {
                // Đăng nhập thất bại
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Đăng nhập thất bại!', errorMessage);
                alert("Invalid Information");
            });
    });

    // Xử lý sự kiện đăng ký
    registerForm.addEventListener('submit', function (event) {
        console.log(1)
        event.preventDefault();
        const email = registerForm.registerEmail.value;
        const password = registerForm.registerPassword.value;

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Đăng ký thành công
                const user = userCredential.user;
                console.log('Đăng ký thành công!', user);
                alert("Register Successfully")
                window.location.assign("login.html");
            })
            .catch((error) => {
                // Đăng ký thất bại
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Đăng ký thất bại!', errorMessage);
                alert("Register fail")
            });
    });
});
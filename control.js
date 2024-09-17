//Thiet lap FIREBASE-----------------------------------------------------------------------------
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
   const database=firebase.database();

   //updates TEMPERATURE, HUMIDITY, WIND to FIREBASE ---------------------------------------------
firebase.database().ref("/SmartHome/Environment/Temp").on("value",function(snapshot){
    var Temp = snapshot.val();
    if(Temp >=30 ){
      document.getElementById("temperature").style.color = 'red';
      // document.getElementById("temperature").innerHTML = Temp;
      console.log(1)
    }
    else{
      document.getElementById("temperature").style.color = 'rgb(16, 71, 91)';
      // document.getElementById("temperature").innerHTML = Temp;
    }
    document.getElementById("temperature").innerHTML = Temp;

    if(Temp < 25){
      document.getElementById("message").style.display = "block";
      document.getElementById("temperature").style.color = 'blue';
    }
    else{
      document.getElementById("message").style.display = "none";
    }
});
firebase.database().ref("/SmartHome/Environment/Hum").on("value",function(snapshot){
    var Hum = snapshot.val();  
    document.getElementById("humidity").innerHTML = Hum;;
});
firebase.database().ref("/SmartHome/Environment/Wind").on("value",function(snapshot){
    var Wind = snapshot.val();  
    document.getElementById("wind").innerHTML = Wind;
});


// DISPLAY CURRENT TIME-------------------------------------------------------------------
let time = document.getElementById("current-time");
setInterval(() =>{
  let t =new Date();
  time.innerHTML = t.toLocaleTimeString();
}, 1000)

let date = document.getElementById("current-date");
setInterval(() =>{
  let d =new Date();
  date.innerHTML = d.toLocaleDateString();
})

//--------------------------------------ROOM 1-----------------------------------------------------
// ----------------------LIGHT BULB---------------------------------

var toggleCheckbox = document.getElementById("toggle-light-room1");
// get value from FIREBASE
database.ref("/SmartHome/LivingRoom/Light").on("value", function(snapshot) {
    var toggleValue = snapshot.val();
    var box = document.getElementById("light_room1")
    if(toggleValue === "ON"){
      document.getElementById("toggle-light-room1").checked = true
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    if(toggleValue === "OFF"){
      document.getElementById("toggle-light-room1").checked = false
      box.style.backgroundColor = ''
      box.style.boxShadow = ''
    }
});
//update data to FIREBASE
toggleCheckbox.addEventListener("change", function() {
    var box = document.getElementById("light_room1")
    var newToggleValue = toggleCheckbox.checked;
    if(newToggleValue === true){
      database.ref("/SmartHome/LivingRoom").update({
        "Light": "ON"
    });
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    else if(newToggleValue === false){
      database.ref("/SmartHome/LivingRoom").update({
        "Light": "OFF"
    });
      box.style.backgroundColor = ''
      box.style.boxShadow = '' 
    }
});


//-------------------------------------RADIO BUTTON--FAN----------------------------------------------------------------------------------------------
//update data to FIREBASE
function click_radio(){
  var check = document.getElementsByName("tick")
  for (let index = 0; index < check.length; index++) {
       console.log(check[index])
      if(check[index].checked){
          database.ref("/SmartHome/LivingRoom").update({
              "Fan" : check[index].value
          });
          console.log(index)
  }
  }
}
// Get value from FIREBASE
database.ref("/SmartHome/LivingRoom/Fan").on("value", function(snapshot){
  let status = snapshot.val()
  var check = document.getElementsByName("tick")
  if( status === "OFF"){
      check[0].checked = true
  }
  if( status === "1"){
      check[1].checked = true
  }
  if( status === "2"){
      check[2].checked = true
  }
  if( status === "3"){
      check[3].checked = true
  }
})


// -----------------------------------AIR CONDITIONER----------------------------------------------
//-----------------------------BUTTON STEPPER------------------------------------
var myInput = document.getElementById("my-input");
var incrementButton = document.getElementById("increment");
var decrementButton = document.getElementById("decrement");

 // get value from FIREBASE
database.ref("/SmartHome/LivingRoom/Air_Conditioner").on("value", function(snapshot) {
    var stepperValue = snapshot.val();
    if(stepperValue >=16 && stepperValue <=30){
      myInput.value = stepperValue;
    }
   
});

// Lắng nghe sự kiện click cho nút Increment
incrementButton.addEventListener("click", function() {
    // Cập nhật giá trị lên Firebase
    let max = myInput.getAttribute("max");
    var currentValue = parseInt(myInput.value);
    if(currentValue < max){
      currentValue = currentValue + 1;
    }
    else{
      currentValue = currentValue;
    }
    
    database.ref("/SmartHome/LivingRoom").update({
        "Air_Conditioner": currentValue
    });
});

decrementButton.addEventListener("click", function() {
    // Cập nhật giá trị lên Firebase
    let min = myInput.getAttribute("min");
    var currentValue = parseInt(myInput.value);
    if(currentValue > min){
      currentValue = currentValue - 1;
    }
    else{
      currentValue = currentValue;
    }
    database.ref("/SmartHome/LivingRoom").update({
        "Air_Conditioner": currentValue
    });
});


// ----------------------ROBOT---------------------------------

var toggleCheckbox_robot1 = document.getElementById("toggle-robot-room1");
// get value from FIREBASE
database.ref("/SmartHome/LivingRoom/Cleaning_Robot").on("value", function(snapshot) {
    var toggleValue = snapshot.val();
    var box = document.getElementById("robot_room1")
    if(toggleValue === "ON"){
      document.getElementById("toggle-robot-room1").checked = true
      box.style.backgroundColor = 'rgb(133, 216, 244)'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    if(toggleValue === "OFF"){
      document.getElementById("toggle-robot-room1").checked = false
      box.style.backgroundColor = ''
      box.style.boxShadow = ''
    }
});
//update data to FIREBASE
toggleCheckbox_robot1.addEventListener("change", function() {
    var box = document.getElementById("robot_room1")
    var newToggleValue = toggleCheckbox_robot1.checked;
    if(newToggleValue === true){
      database.ref("/SmartHome/LivingRoom").update({
        "Cleaning_Robot": "ON"
    });
      box.style.backgroundColor = 'rgb(133, 216, 244)'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    else if(newToggleValue === false){
      database.ref("/SmartHome/LivingRoom").update({
        "Cleaning_Robot": "OFF"
    });
      box.style.backgroundColor = ''
      box.style.boxShadow = '' 
    }
});


//-----------------------------SLIDER light --------------------------------------------------
var sliderNgang = document.getElementById("sliderngang");
var light = document.getElementById("light");
//update data to FIREBASE
sliderNgang.oninput = function(){
    document.getElementById("slidervalue").innerHTML = sliderNgang.value;
    light.style.opacity = sliderNgang.value/10;

    database.ref("/SmartHome/LivingRoom").update({
        "Opacity-light" : sliderNgang.value
    });
}
//get data from FIREBASE 
database.ref("/SmartHome/LivingRoom/Opacity-light").on("value", function(snapshot){
    var opacity = snapshot.val();
    document.getElementById("slidervalue").innerHTML = opacity;
    light.style.opacity = opacity/10;
});

//--------------------------------ROOM 2----------------------------------------------------------
// ------------------------------LIGHT BULB-----------------------------------------------
var toggleCheckbox2 = document.getElementById("toggle-light-room2");
// get value from FIREBASE
database.ref("/SmartHome/Kitchen/Light").on("value", function(snapshot) {
    var toggleValue = snapshot.val();
    var box = document.getElementById("light_room2")
    if(toggleValue === "ON"){
      document.getElementById("toggle-light-room2").checked = true
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    if(toggleValue === "OFF"){
      document.getElementById("toggle-light-room2").checked = false
      box.style.backgroundColor = ''
      box.style.boxShadow = ''
    }
});
//update data to FIREBASE
toggleCheckbox2.addEventListener("change", function() {
    var box = document.getElementById("light_room2")
    var newToggleValue = toggleCheckbox2.checked;
    if(newToggleValue === true){
      database.ref("/SmartHome/Kitchen").update({
        "Light": "ON"
    });
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    else if(newToggleValue === false){
      database.ref("/SmartHome/Kitchen").update({
        "Light": "OFF"
    });
      box.style.backgroundColor = ''
      box.style.boxShadow = '' 
    }
});


// -------------------------RADIO BUTTON ROOM 2-----------------------------
function click_radio_room2(){
  var check = document.getElementsByName("tick-room2")
  for (let index = 0; index < check.length; index++) {
       console.log(check[index])
      if(check[index].checked){
          database.ref("/SmartHome/Kitchen").update({
              "Fan" : check[index].value
          });
          console.log(index)
  }
  }
}
// Get value from FIREBASE
database.ref("/SmartHome/Kitchen/Fan").on("value", function(snapshot){
  let status = snapshot.val()
  var check = document.getElementsByName("tick-room2")
  if( status === "OFF"){
      check[0].checked = true
  }
  if( status === "1"){
      check[1].checked = true
  }
  if( status === "2"){
      check[2].checked = true
  }
  if( status === "3"){
      check[3].checked = true
  }
})

// ----------------------ROBOT2---------------------------------

var toggleCheckbox_robot2 = document.getElementById("toggle-robot-room2");
// get value from FIREBASE
database.ref("/SmartHome/Kitchen/Cleaning_Robot").on("value", function(snapshot) {
    var toggleValue = snapshot.val();
    var box = document.getElementById("robot_room2")
    if(toggleValue === "ON"){
      document.getElementById("toggle-robot-room2").checked = true
      box.style.backgroundColor = 'rgb(133, 216, 244)'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    if(toggleValue === "OFF"){
      document.getElementById("toggle-robot-room2").checked = false
      box.style.backgroundColor = ''
      box.style.boxShadow = ''
    }
});
//update data to FIREBASE
toggleCheckbox_robot2.addEventListener("change", function() {
    var box = document.getElementById("robot_room2")
    var newToggleValue = toggleCheckbox_robot2.checked;
    if(newToggleValue === true){
      database.ref("/SmartHome/Kitchen").update({
        "Cleaning_Robot": "ON"
    });
      box.style.backgroundColor = 'rgb(133, 216, 244)'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    else if(newToggleValue === false){
      database.ref("/SmartHome/Kitchen").update({
        "Cleaning_Robot": "OFF"
    });
      box.style.backgroundColor = ''
      box.style.boxShadow = '' 
    }
});



//-----------------------------ROOM 3----------------------------------------------------------------
// ------------------------------LIGHT BULB-----------------------------------------------
var toggleCheckbox3 = document.getElementById("toggle-light-room3");
// get value from FIREBASE
database.ref("/SmartHome/Bedroom/Light").on("value", function(snapshot) {
    var toggleValue = snapshot.val();
    var box = document.getElementById("light_room3")
    if(toggleValue === "ON"){
      document.getElementById("toggle-light-room3").checked = true
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    if(toggleValue === "OFF"){
      document.getElementById("toggle-light-room3").checked = false
      box.style.backgroundColor = ''
      box.style.boxShadow = ''
    }
});
//update data to FIREBASE
toggleCheckbox3.addEventListener("change", function() {
    var box = document.getElementById("light_room3")
    var newToggleValue = toggleCheckbox3.checked;
    if(newToggleValue === true){
      database.ref("/SmartHome/Bedroom").update({
        "Light": "ON"
    });
      box.style.backgroundColor = 'orange'
      box.style.boxShadow = '-3px -4px 3px 0px rgb(150, 145, 145)'
    }
    else if(newToggleValue === false){
      database.ref("/SmartHome/Bedroom").update({
        "Light": "OFF"
    });
      box.style.backgroundColor = ''
      box.style.boxShadow = '' 
    }
});
// -------------------------RADIO BUTTON ROOM 3-----------------------------
function click_radio_room3(){
  var check = document.getElementsByName("tick-room3")
  for (let index = 0; index < check.length; index++) {
       console.log(check[index])
      if(check[index].checked){
          database.ref("/SmartHome/Bedroom").update({
              "Fan" : check[index].value
          });
          console.log(index)
  }
  }
}
// Get value from FIREBASE
database.ref("/SmartHome/Bedroom/Fan").on("value", function(snapshot){
  let status = snapshot.val()
  var check = document.getElementsByName("tick-room3")
  if( status === "OFF"){
      check[0].checked = true
  }
  if( status === "1"){
      check[1].checked = true
  }
  if( status === "2"){
      check[2].checked = true
  }
  if( status === "3"){
      check[3].checked = true
  }
})


  function status_air_room3(){
    console.log(1);
    var currentValue = document.getElementById("my-input-3").value;
    console.log(currentValue)
    const lightRef = firebase.database().ref("/SmartHome/Bedroom/Air_Conditioner")
    lightRef.set(currentValue, function(error) {
      if (error) {
        console.error("Error updating light state: ", error);
      } else {
        console.log("Light state updated successfully!");
      }
    });
  }

//  ---------------------------------------SLIDER LIGHT -----------------------------------
  var sliderNgang_room3 = document.getElementById("sliderngang_room3");
  var light1_room3 = document.getElementById("light1_room3");
  //update data to FIREBASE
  sliderNgang_room3.oninput = function(){
      document.getElementById("slidervalue_room3").innerHTML = sliderNgang_room3.value;
      light1_room3.style.opacity = sliderNgang_room3.value/10;
  
      database.ref("/SmartHome/Bedroom").update({
          "Opacity-light" : sliderNgang_room3.value
      }); 
  }
  //get data from FIREBASE 
  database.ref("/SmartHome/Bedroom/Opacity-light").on("value", function(snapshot){
      var opacity = snapshot.val();
      document.getElementById("slidervalue_room3").innerHTML = opacity;
      light1_room3.style.opacity = opacity/10;
  });

//----------------------------------AIR CONDITIONER ROOM 3
//-----------------------------BUTTON STEPPER------------------------------------
var myInput3 = document.getElementById("my-input-room3");
var incrementButton3 = document.getElementById("increment-room3");
var decrementButton3 = document.getElementById("decrement-room3");

// get value from FIREBASE
database.ref("/SmartHome/Bedroom/Air_Conditioner").on("value", function(snapshot) {
    var stepperValue = snapshot.val();
    if(stepperValue >=16 && stepperValue <=30){
      myInput3.value = stepperValue;
    }
   
});

// Lắng nghe sự kiện click cho nút Increment
incrementButton3.addEventListener("click", function() {
    // Cập nhật giá trị lên Firebase
    let max = myInput3.getAttribute("max");
    var currentValue = parseInt(myInput3.value);
    if(currentValue < max){
      currentValue = currentValue + 1;
    }
    else{
      currentValue = currentValue;
    }
    
    database.ref("/SmartHome/Bedroom").update({
        "Air_Conditioner": currentValue
    });
});
// Lắng nghe sự kiện click cho nút Decrement
decrementButton3.addEventListener("click", function() {
    // Cập nhật giá trị lên Firebase
    let min = myInput3.getAttribute("min");
    var currentValue = parseInt(myInput3.value);
    if(currentValue > min){
      currentValue = currentValue - 1;
    }
    else{
      currentValue = currentValue;
    }
    database.ref("/SmartHome/Bedroom").update({
        "Air_Conditioner": currentValue
    });
});



//Chuyen qua lai giua cac phong----------------------------------------------------------

//Chuyen Ten phong


function livingroom(){
    document.getElementById("room1").style.display = "block";
    document.getElementById("room2").style.display = "none";
    document.getElementById("room3").style.display = "none";
    
    document.getElementById("livingroom").style.display = "block";
    document.getElementById("kitchen").style.display = "none";
    document.getElementById("bedroom").style.display = "none";
  }
  function kitchen(){
    document.getElementById("room1").style.display = "none";
    document.getElementById("room2").style.display = "block";
    document.getElementById("room3").style.display = "none";

    document.getElementById("livingroom").style.display = "none";
    document.getElementById("kitchen").style.display = "block";
    document.getElementById("bedroom").style.display = "none";
  }
 function bedroom(){
    document.getElementById("room1").style.display = "none";
    document.getElementById("room2").style.display = "none";
    document.getElementById("room3").style.display = "block";

    document.getElementById("livingroom").style.display = "none";
    document.getElementById("kitchen").style.display = "none";
    document.getElementById("bedroom").style.display = "block";
 } 


 // ---------------------------------LOI NHAC NHO----------------------------------------------

 
 //-----------------------------LOG OUT----------------------------------------------------
 function logout() {
  // Hiển thị hộp thoại xác nhận
  const isConfirmed = confirm("Are you sure you want to logout?");
  
  // Kiểm tra lựa chọn của người dùng
  if (isConfirmed) {
      // Người dùng đã xác nhận, thực hiện hành động tương ứng (ví dụ: logout)
      console.log("Logout confirmed!");
      // Thực hiện logout hoặc chuyển hướng trang ở đây
      window.location.assign("login.html");
  } else {
      // Người dùng đã hủy bỏ, không làm gì cả
      console.log("Logout cancelled!");
  }
}
/* MENU FUNCTION */
function toggleMenu(){

const menu = document.getElementById("menu");

if(menu.style.display === "block"){
menu.style.display = "none";
}else{
menu.style.display = "block";
}

}


/* TEXT TO GESTURE FUNCTION */
function showGesture() {

const input = document.getElementById("textInput");
const video = document.getElementById("gestureVideo");
const source = document.getElementById("videoSource");

/* USER INPUT */
const text = input.value
.trim()
.replace(/\s+/g, " ")
.toUpperCase();

/* EMPTY INPUT CHECK */
if(text === ""){
alert("Please enter text.");
return;
}

/* GESTURE DICTIONARY */
const gestures = {

"COLD": "cold.mp4",
"HELLO": "hello.mp4",
"GOODBYE": "goodbye.mp4",
"YES": "yes.mp4",
"NO": "no.mp4",
"STOP": "stop.mp4",
"WAIT": "wait.mp4",
"HELP": "help.mp4",
"EMERGENCY": "emergency.mp4",
"CALL": "call.mp4",
"DANGER": "danger.mp4",
"WATER": "water.mp4",
"FOOD": "food.mp4",
"BATHROOM": "bathroom.mp4",
"SLEEP": "sleep.mp4",
"SIT": "sit.mp4",
"STAND": "stand.mp4",
"PLEASE": "please.mp4",
"THANK YOU": "thankyou.mp4",
"SORRY": "sorry.mp4",
"YOU'RE WELCOME": "youre-welcome.mp4",
"WELCOME": "welcome.mp4",
"RESPECT": "respect.mp4",
"HAPPY": "happy.mp4",
"SAD": "sad.mp4",
"ANGRY": "angry.mp4",
"AFRAID": "afraid.mp4",
"I LOVE YOU": "iloveyou.mp4",
"LOVE": "iloveyou.mp4",

"ZERO": "zero.mp4",
"ONE": "one.mp4",
"TWO": "two.mp4",
"THREE": "three.mp4",
"FOUR": "four.mp4",
"FIVE": "five.mp4",
"SIX": "six.mp4",
"SEVEN": "seven.mp4",
"EIGHT": "eight.mp4",
"NINE": "nine.mp4",
"TEN": "ten.mp4",

"SAFE": "safe.mp4",
"KIND": "kind.mp4",
"ARE YOU ALL RIGHT": "areyouallright.mp4",
"HOW ARE YOU DOING": "howareyoudoing.mp4",
"GOOD NIGHT": "goodnight.mp4",
"SEE YOU LATER": "seeyoulater.mp4",
"I DON'T KNOW": "idontknow.mp4",
"WHAT ARE YOU DOING": "whatareyoudoing.mp4",
"ARE YOU OKAY": "areyouokay.mp4",
"GOOD MORNING": "goodmorning.mp4",
"GOOD AFTERNOON": "goodafternoon.mp4",
"GOOD EVENING": "goodevening.mp4"

};


/* CHECK IF GESTURE EXISTS */
if (gestures[text]) {

source.src = "/static/videos/" + gestures[text];

video.style.display = "block";

video.load();

video.play();

} else {

video.style.display = "none";

alert("Gesture not available. Please check spelling.");

}

}


/* ENTER KEY SUPPORT */
document.getElementById("textInput")
.addEventListener("keypress", function(event){

if(event.key === "Enter"){
showGesture();
}

});
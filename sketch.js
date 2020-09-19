//variables 
var database;
var dog;
var dogImg;
var happyDog;
var foodS;
var foodStock;
var state = "happy";

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {

  createCanvas(500, 500);
  
  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  dog = createSprite(250, 280);
  dog.scale = 0.4;
  dog.addImage(dogImg);
  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(state === "happy"){
      dog.addImage(happyDog);
    }
  }

  drawSprites();

  fill(245, 245, 220);
  textSize(20);
  text("Food Stock : " + foodS, 30, 470);

  textDisplay();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }else{
    x--;
  }
  database.ref("/").update({
    Food: x
  });
}

function textDisplay(){
  if(foodS === 0){
    fill(245, 245, 220)
    textSize(25);
    textAlign(CENTER);
    text("The food supply has run out!", 250, 40);
    state = "unhappy";
    dog.addImage(dogImg);
  }
}

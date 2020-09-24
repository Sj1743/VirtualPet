//variables 
var database;
var dog, dogImg, happyDog;
var foodS = 20;
var lastFed = 0;
var foodObj = null;
var feedButton, addButton;

//load images
function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}


function setup() {

  //canvas
  createCanvas(800, 500);

  //button to feed the dog
  feedButton = createButton("Feed the dog");
  feedButton.position(700, 95);
  feedButton.mousePressed(feedDog);

  //button to add food for the dog
  addButton = createButton("Add food");
  addButton.position(800, 95);
  addButton.mousePressed(addFood);

  //create foodObj
  foodObj = new Food();

  //create dog
  dog = createSprite(650, 280);
  dog.scale = 0.3;
  dog.addImage("dog1", dogImg);
  dog.addImage("dog2", happyDog);

}


function draw() {  

  //background
  background(46, 139, 87);

  //display last fed
  fill("white");
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
   }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
   }

   //draw all sprites
  drawSprites();

  //display food stock
  fill(245, 245, 220);
  textSize(20);
  text("Food Stock : " + foodS, 30, 470);

  //display foodObj
  foodObj.display();

}


//increment foodS, updateFoodStock using foodS
function addFood(){
  foodS++;
  foodObj.updateFoodStock(foodS);
}


//change dog image, deduct foodS, updateFoodStock using foodS, set lastFed
function feedDog(){
  if(foodS > 0){
    dog.changeAnimation("dog2", happyDog);
    foodS--;
    foodObj.updateFoodStock(foodS);
    lastFed = hour();
  }
}


/*

var state = "happy";


if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(state === "happy"){
      dog.addImage(happyDog);
    }
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


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS)
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

*/
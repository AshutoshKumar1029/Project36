//Create variables here
var dog, happyDog, database, foodS, foodStock;
var mainDog
var foodObj,fedTime, lastFed, feed, addFood; 
function preload()
{
	dog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happydog.png")
}

function setup() {
  database = firebase.database();
	createCanvas(1000, 500);
  foodObj  = new food()
  mainDog = createSprite(800,200,50,50);
  mainDog.addImage(dog)
  mainDog.scale=0.2
  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  feedButton = createButton("Feed the dog")
  feedButton.position(700,95)
  feedButton.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 350, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 350, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 350, 30);
  }

  drawSprites();

}

//function to read Stock
function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
  function feedDog() {
    mainDog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }


//function to add food in stock
function addFoods(){
  if(foodS<20){
  foodS++;
  database.ref('/').update({
    food: foodS
  
  })
}
}




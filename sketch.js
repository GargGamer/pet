var dog, dogImg, happyDog, database, foodS, foodStock = 0;
var feed, addFood, foodObj, fedTime, lastFed

function preload()
{
  dogImg = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(1000, 500);
  database = firebase.database()
  foodObj = new Food();

  foodStock = database.ref('food');
foodStock.on("value",readStock);

  dog = createSprite(800,220,150,150)
  dog.addImage(dogImg)
  dog.scale = 0.15

  feed = createButton("Feed the Dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)

}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime = database.ref('fedTime');
  fedTime.on("value",function(data){
  lastFed = data.val();
  })

  fill(255)
  textSize(20)
  if(lastFed>=12){
    text("Last Fed : " + lastFed%12+ " PM",350,30)
  }
  else if(lastFed == 0){
    text("Last Fed : 12AM",350,30)
  }
  else{
    text("Last Fed: "+lastFed+" AM",350,30)
  }

 
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS = data.val()
  foodObj.updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock() <= 0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
 }
      database.ref('/').update({
    food: foodObj.getFoodStock(),
    fedTime: hour()
  })
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    food: foodS
  })
}




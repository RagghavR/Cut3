const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var rabbit

function preload(){
  bg = loadImage("assets/background.png")
  fruitImg = loadImage("assets/melon.png")
  rabbitImg = loadImage("assets/Rabbit-01.png")
  blinking = loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
  eat = loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
  sad = loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png",)
  eat.looping = false
  sad.looping = false
  bgsound = loadSound("assets/sound1.mp3")
  sadsound = loadSound("assets/sad.wav")
  cutsound = loadSound("assets/rope_cut.mp3")
  eatsound = loadSound('assets/eating_sound.mp3')
  airsound = loadSound("assets/air.wav")
}

function setup() 
{
  createCanvas(400,550);
  
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,530,600,20);
  blinking.frameDelay = 20
  eat.frameDelay = 20
  sad.frameDelay = 20
  rope = new Rope(7,{x:200,y:30});
  fruit = Bodies.circle(200,300,20);
  Matter.Composite.add(rope.body,fruit);

  link = new Link(rope,fruit);
  rabbit = createSprite(200,480,100,100)
  rabbit.addAnimation("still",blinking)
  rabbit.addAnimation("swef",eat)
  rabbit.addAnimation("asd",sad)
  blower = createImg("assets/balloon.png")
  blower.position(420,250)
  blower.size(150,100)
  blower.mouseClicked(function(){
    Matter.Body.applyForce(fruit,fruit.position,{x: 0.03,y:0})
    airsound.setVolume(0.1)
    airsound.play()
  })
  bgsound.play()
  bgsound.setVolume(0.2)
  //bgsound.setVolume(0)
  rabbit.scale = 0.2

  button = createImg("assets/cut_btn.png")
  button.position(600,30)
  button.size(50,50)
  button.mouseClicked(function(){
    rope.break()
    link.break()
    cutsound.play()
  })

  mute = createImg("assets/mute.png")
  mute.position(750,40)
  mute.size(35,35)
  mute.mouseClicked(function(){
    if(bgsound.isPlaying()){
      bgsound.stop()
    } else{
      bgsound.play()
    }
  })
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(bg);
  drawSprites()
  rope.display();
  push()
  if(fruit != null){
  imageMode(CENTER)
  image(fruitImg,fruit.position.x,fruit.position.y,80,80);
  }
  pop()
  Engine.update(engine);
  //ground.display();

  if(collides(fruit,rabbit)){
    rabbit.changeAnimation("swef",eat)
    eatsound.play()
  }
   if(fruit != null && fruit.position.y > 490){
     rabbit.changeAnimation("asd",sad)
      sadsound.play()
   }
}

function collides(body,sprite){
  
  if(fruit!=null){
  var distance = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if(distance < 80){
    World.remove(world,fruit)
    fruit = null
    return true
  } else {
    return false
  }
  
  }
}
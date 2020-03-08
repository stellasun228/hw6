/* Variables */

var playerHeight = 40
var playerWidth = 8
var playerSpeed = 8
var playerL = 200
var playerR = 200

var score = true;
var scoreL = 0
var scoreR = 0

var ballX = 300
var ballY = 200
var ballR = 5
var ballXSpeed = 0;
var ballYSpeed = 0;

var dash = true;
var bgColor = 0;

var boundary;
var bounce;
var hit;

function preload() {
  soundFormats('wav');
  boundary = loadSound("boundary.wav");
  bounce = loadSound("bounce.wav");
  hit = loadSound("hit.wav");
}

function setup() {
  createCanvas(600, 400);
  textFont("VT323");
}

function draw() {
  background(bgColor);
  noStroke();
  fill(255);
  dashedLine(width/2, 0, 5);
  textSize(60);

  // left player
  rect(30, playerL, playerWidth, playerHeight);
  text(scoreL, 80, 50);
  
  // right player
  text(scoreR, 490, 50);
  rect(width-playerWidth-30, playerR, playerWidth, playerHeight);
  
  // ball
  ellipse(ballX, ballY, ballR*2)
  
  
  /* User Input */
  
  // 'W' key
  if (keyIsDown(87)) {
    playerL = playerL - playerSpeed
  }
  // 'S' key
  if (keyIsDown(83)) {
    playerL = playerL + playerSpeed
  }
  
  if (keyIsDown(UP_ARROW)) {
    playerR = playerR - playerSpeed
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerR = playerR + playerSpeed
  }
  
  
  /* Game logic */
  
  // start screen
  if (ballXSpeed == 0 && scoreL == 0) {
    textSize(15);
    text("Stella Sun  CP1", 250, 150);
    text("CLICK ANYWHERE TO START", 230, 300);
    text("Right Player: UP & DOWN", 430, 370);
    text("Left Player: W & S", 30, 370);
    textSize(60);
    text("'Pong'", 230, 100);
  }
  
  // constrain players
  if (playerL <= 0) {
    playerL = 0;
  }
  if (playerL > height - playerHeight) {
    playerL = height - playerHeight;
  }
  
  if (playerR <= 0) {
    playerR = 0;
  }
  if (playerR > height - playerHeight) {
    playerR = height - playerHeight;
  }
  
  // constrain ball
  ballX = ballX + ballXSpeed;
  ballY = ballY + ballYSpeed;
  if (ballY < 0 + ballR) {
    boundary.play();
    ballY = 0 + ballR;
    ballYSpeed = -ballYSpeed;
  }
  if (ballY > height - ballR) {
    boundary.play();
    ballY = height - ballR;
    ballYSpeed = -ballYSpeed;
  }
  
  // ball bounces off players
  if (ballX >= width-playerWidth-30-ballR && ballY >= playerR && ballY <= playerR + playerHeight && ballX && ballX <= width-30+ballR) {
    bounce.play();
    ballXSpeed += 0.5;
    ballYSpeed += 0.5;
    ballX = width-playerWidth-30-ballR;
    ballXSpeed = -ballXSpeed
  }
  if (ballX <= playerWidth+30+ballR && ballY >= playerL && ballY <= playerL + playerHeight && ballX >= 30-ballR) {
    bounce.play();
    ballXSpeed -= 0.5;
    ballYSpeed -= 0.5;
    ballX = 0+playerWidth+30+ballR;
    ballXSpeed = -ballXSpeed
  }
  
  // playerL scores!
  if (ballX >= width && score == true) {
    hit.play();
    scoreL = scoreL + 1;
    score = false;
  }
  if (ballX > width + width/2) {
    ballX = width/2;
    score = true;
    bgColor+= 4;
  }
  
  // playerR scores!
  if (ballX <= 0 && score == true) {
    hit.play();
    scoreR = scoreR + 1;
    score = false;
  }
  if (ballX < -width/2) {
    ballX = width/2;
    score = true;
    bgColor+= 4;
  }
  
  //game over screen
  if (bgColor >= 255) {
    fill(0);
    textSize(30);
    text("Alright, that's enough.", 100, 150)
    textSize(20);
    text("Let's try again from the start?", 250, 250);
    text("CLICK ANYWHERE TO RESTART", 250, 300);
    ballXSpeed = 0;
    ballYSpeed = 0;
  }
}

function dashedLine(x, y1, y2) {
  strokeWeight(0.5);
  for (let i = 0; i < height; i++) {
    if (dash == true) {
      stroke(255);
      dash = false;
    }
    else {
      noStroke();
      dash = true;
    }
    line(x, y1, x, y2);
      y1 = y2;
      y2 = y2 + 5;
  }
}

function mousePressed() {
  if (bgColor >= 255) {
    bgColor = 0;
    ballXSpeed = 3;
    ballYSpeed = 1;
    scoreL = 0;
    scoreR = 0;
  }
  if (bgColor == 0) {
    ballXSpeed = 3;
    ballYSpeed = 1;
  }
}

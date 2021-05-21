var balls = [];
var score;
var highscore;
var img;
var snd;
//let pauseButton;
//let resumeButton;

function preload(){
  img = loadImage('cat.png');
  
  soundFormats('mp3');
  snd = loadSound('cat.mp3');
}

function setup() {
  createCanvas(400, 400);
  
  pauseButton = createButton('Pause');
  pauseButton.position(0,450);
  pauseButton.mouseClicked(pause);
  
  resumeButton = createButton('Resume');
  resumeButton.position(60,450);
  resumeButton.mouseClicked(resume);
}

function pause(){
  noLoop();
}
function resume(){
  loop();
}

function draw() {//Ball을 계속 생성, 제거
  background('lightgreen');
  
  //새로운 Ball 객체 생성
  //조건: Ball객체의 갯수가 3개보다 적고(AND)
  // 2% 확률로 새 객체 생성(너무 빠르게 생성되지 않도록)
  if(balls.length <3 && random(0, 100) < 2){
    balls.push(new Ball(50));
  } 
  
  //Ball 객체 출력
  for(var i=0; i<balls.length; i++ ){
    balls[i].display()
    
    //오래된 Ball 객체는 제거
    //현재시간 - 생성시간(timeToCreate) >= 수명(timeToLive)
    if(millis()-balls[i].timeToCreate >= balls[i].timeToLive){
      balls.splice(i, 1);
    }
  }
  displayScore();
}

function mouseClicked() {
  var x = mouseX;
  var y = mouseY;
  
  for(var i=0; i<balls.length; i++){
    var distance = dist(x, y, balls[i].x, balls[i].y);
    
    if(distance < balls[i].size){
      snd.play();
      //반응속도를 second로 변환
      var reactionTime = (millis() - balls[i].timeToCreate)/1000; 
      
      setScore(reactionTime);//score에 반응속도값 설정 함수 호출
      
      balls.splice(i,1);//마우스 클릭한 ball 제거
    }
  }
}

function setScore(time){
  score = time; //현재값으로 반응속도 저장
  
  //반응속도가 짧은 것이 highscore가 되어야 함
  if(highscore==null || highscore > score){
    highscore = score;
  }
}

function displayScore(){
  var hsText ='high score     : ' + nf(str(highscore),1,3) +' s';
  var sText = 'reaction Time : ' + nf(str(score), 1,3) + ' s';
  
  if(highscore != null){
    textSize(15);
    fill(255,0, 255);
    text(hsText, 10, 20);
    text(sText, 10, 40);
  }
}

function Ball(size){
  this.size = size;
  this.x = random(0, width);
  this.y = random(0, height);
  
  this.timeToCreate = millis();
  this.timeToLive = 2000;
  
  this.display = function(){
    //fill('blue');
    //circle(this.x, this.y, this.size);
    image(img, this.x, this.y, this.size, this.size);
  }
}

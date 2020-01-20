const canvas = document.querySelector('canvas');

let context = canvas.getContext('2d');

let keymovement = true;

let mijnPunten = 0;
let tegenPunten = 0;

// Zorgt dat de canvas weet hoe groot het scherm is. En maak een variable ( width // height ).
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let width = canvas.width;
let height = canvas.height;

  let ballObject = {};
  ballObject.x = Math.floor(Math.random() * width) + 20; 
  ballObject.y = Math.floor(Math.random() * height) + 20; 
  ballObject.radius = Math.floor(Math.random() * 20) + 20;
  ballObject.color = '#FF6633';
  ballObject.velX = 0.1;
  ballObject.velY = 0.1;
  ballObject.speed = 30;

  ballObject.draw = function(){
    context.beginPath();
    context.lineWidth = "5";
    context.fillStyle = ballObject.color;
    context.arc(ballObject.x,ballObject.y,ballObject.radius,0,2*Math.PI);
    context.closePath();
    context.stroke();
    context.fill();
  }

  ballObject.update = function() {

    // && (ballObject.x - ballObject.radius) >= parseInt(player.y) + 100)

    if ((ballObject.x - ballObject.radius) <= 0) {
      // wanneer er bij jou gescoord word.
      console.log("Goal tegen");
      tegenPunten++;
      ballObject.x = width/2;
      ballObject.y = height/2;
    }

    
    if ((ballObject.x + ballObject.radius) >= width) {
      // wanneer er bij jou gescoord word.
      console.log("Goal voor");
      mijnPunten++;
      ballObject.x = width/2;
      ballObject.y = height/2;
    }

    if ((ballObject.y - ballObject.radius) <= 0 || (ballObject.y + ballObject.radius) >= height) {
      ballObject.velY = -ballObject.velY;
    }

    // De echte movement ( nog niet het tekenen )
    for (let i = 0; i < ballObject.speed; i++) {
      ballCollisionCheck();
      ballObject.x += ballObject.velX;
    }

    for (let i = 0; i < ballObject.speed; i++) {
      ballCollisionCheck();
      ballObject.y += ballObject.velY;
    }
  }

  let player = {};
  player.x = 20; 
  player.y = height/2; 
  player.color = '#FF3311';

  player.draw = function(){
    context.beginPath();
    context.lineWidth = "5";
    context.fillStyle = player.color;
    
    context.rect(player.x, player.y, 25, 100);

    context.closePath();
    context.stroke();
    context.fill();
  }


  let tegenstander = {};
  tegenstander.x = width - 40; 
  tegenstander.y = height/2; 
  tegenstander.color = '#FF3311';

  tegenstander.draw = function(){
    context.beginPath();
    context.lineWidth = "5";
    context.fillStyle = tegenstander.color;
    
    context.rect(tegenstander.x, tegenstander.y, 25, 100);

    context.closePath();
    context.stroke();
    context.fill();
  }

  

  tegenstander.update = function() {

    if (tegenstander.y - 5 >= 0) {
    if (ballObject.y < tegenstander.y) {
        // de bal zit hoger
        tegenstander.y -= 5;
    }
  }

    if (tegenstander.y + 95 <= height) {
    if (ballObject.y > tegenstander.y) {
      tegenstander.y += 5;
      // de bal zit lager
  }
}
  }


  updateScore = function() {
    context.font = "100px Arial";
    context.fillText(mijnPunten + "  -  " + tegenPunten, width/2 - 100, height/2);
  }



  ballCollisionCheck = function() {


    if ((ballObject.x - ballObject.radius) >= parseInt(player.x) && (ballObject.x - ballObject.radius) <= parseInt(player.x) + 25) {
      if ((ballObject.y - ballObject.radius) >= parseInt(player.y) && ((ballObject.y - ballObject.radius) <= parseInt(player.y) + 100)) {
        ballObject.velX = -ballObject.velX;
        }
      }
        if ((ballObject.x + ballObject.radius) >= parseInt(tegenstander.x) && (ballObject.x + ballObject.radius) <= parseInt(tegenstander.x) + 25) {
          if ((ballObject.y + ballObject.radius) >= parseInt(tegenstander.y) && ((ballObject.y - ballObject.radius) <= parseInt(tegenstander.y) + 100)) {
            ballObject.velX = -ballObject.velX;
            }
          }
  }



document.addEventListener('keydown', function(event) {
  if (keymovement == true) {
  
    console.log(event.keyCode);


  if(event.keyCode == 38) {
    //up
    if (player.x + 40 <= 0) {
      console.log("00000")
      return;
    } else {
      for (let index = 0; index < 10; index++) {
        player.y--; 
      }
    }
  }
  else if(event.keyCode == 40) {
      // down
      if (player.x + 40 >= height) {
        console.log("00000");
        return;
      } else {
        for (let index = 0; index < 10; index++) {
          player.y++; 
        }
      }
    }
  }
});

document.addEventListener('mousemove', function(e){
  if (keymovement == false) {
  var y = e.pageY;

  player.y = y;
  }
  });

animate = function() {
  // Cleard het scherm en laat hem update
    context.fillStyle = 'rgba(0, 0, 0)';
    context.fillRect(0, 0, width, height);
  

   ballObject.update();
   ballObject.draw();

   player.draw();
   updateScore();
  
   tegenstander.update();
   tegenstander.draw();


  requestAnimationFrame(animate);
}
animate();








document.addEventListener('keydown', function(event) {
  // settings changer
  if(event.keyCode == 49) {
    if (keymovement == true) {
      keymovement = false;
    } else {
      keymovement = true;
    }
  }
});
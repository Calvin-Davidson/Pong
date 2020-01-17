const canvas = document.querySelector('canvas');

let context = canvas.getContext('2d');

let disco = false;
let onhitcolor = false;
let onhitsize = false;
let clearOnUpdate = true;

let mijnPunten = 0;
let tegenPunten = 0;

// Zorgt dat de canvas weet hoe groot het scherm is. En maak een variable ( width // height ).
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let width = canvas.width;
let height = canvas.height;

balls = [];

for(let i = 0; i < 1 ;i++){
  let ballObject = {};
  ballObject.x = Math.floor(Math.random() * width) + 20; 
  ballObject.y = Math.floor(Math.random() * height) + 20; 
  ballObject.radius = Math.floor(Math.random() * 20) + 20;
  ballObject.color = '#FF6633';
  ballObject.velX = 3;
  ballObject.velY = 3;

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

    // als je mij raakt.

    if ((ballObject.x - ballObject.radius) >= parseInt(player.x) && (ballObject.x - ballObject.radius) <= parseInt(player.x) + 25) {
    if ((ballObject.y - ballObject.radius) >= parseInt(player.y) && ((ballObject.y - ballObject.radius) <= parseInt(player.y) + 100)) {
      ballObject.velX = -ballObject.velX;
      }
    }
    // && (ballObject.x - ballObject.radius) >= parseInt(player.y) + 100)

    if ((ballObject.x - ballObject.radius) <= 0) {
      // wanneer er bij jou gescoord word.
      console.log("Goal tegen");
      tegenPunten++;
      ballObject.x = width/2;
      ballObject.y = height/2;
      ballObject.velX = 3;
      ballObject.velY = 3;
    }

    
    if ((ballObject.x + ballObject.radius) >= width) {
      // wanneer er bij jou gescoord word.
      console.log("Goal voor");
      mijnPunten++;
      ballObject.x = width/2;
      ballObject.y = height/2;
      ballObject.velX = 3;
      ballObject.velY = -3;
    }

    if ((ballObject.y - ballObject.radius) <= 0 || (ballObject.y + ballObject.radius) >= height) {
      ballObject.velY = -ballObject.velY;
    }

    // De echte movement ( nog niet het tekenen )
    ballObject.x += ballObject.velX;
    ballObject.y += ballObject.velY;
  }


  balls.push(ballObject);
}

  updateScore = function() {
    context.font = "100px Arial";
    context.fillText(mijnPunten + "  -  " + tegenPunten, width/2 - 100, height/2);
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
    console.log("UPDATEING")

    if (balls[0].y < tegenstander.y) {
        // de bal zit hoger
        tegenstander--;
    }
    if (balls[0].y > tegenstander.y) {
      tegenstander++;
      // de bal zit lager
  }
  }




document.addEventListener('keydown', function(event) {
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
});



animate = function() {
  // Cleard het scherm en laat hem update
  if (clearOnUpdate == true) {
    context.fillStyle = 'rgba(0, 0, 0)';
    context.fillRect(0, 0, width, height);
  }

  for (let i = 0; i < balls.length; i++) {
   balls[i].update();
   balls[i].draw();

   player.draw();
   updateScore();
  
   tegenstander.update();
   //tegenstander.draw();

  }
  requestAnimationFrame(animate);
}
animate();
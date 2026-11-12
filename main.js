let game = {
 cuttyCount: 0,
 multipleSpawn: 5,
 scores: 0,
 icon: ["tekto","hansy","BDC","RATM","sami","Unanne"]
}

function HPS_makeCSS(data,{ duration = 1,easing = "ease",loopTime = "Infinity" },anim) {
 var doc = data.animate(
 anim,{ duration: duration * 1000, easing: easing, iterations: loopTime, });
        
 return doc;
}

setInterval(() => {
 if (game.cuttyCount <= 10) {
  makeIcon();
 }
},1000);

setInterval(() => {
 if (game.multipleSpawn >= 0) {
  makeIcon();
  game.multipleSpawn--;
 }
 
 document.getElementById("s").innerText = "scores: "+game.scores;
},0);

function makeIcon(posx = null,posy = null,type = null,clone) {
 game.cuttyCount++;
 
 var deleted = false;
 var random = Number.parseInt(((Math.random() * game.icon.length)+"")[0]);
 if (type !== null) {
  random = type;
 }
 var e = document.createElement("img");
 var x = (Math.random() * window.innerWidth)
 var y = (Math.random() * window.innerHeight)
 if (posx !== null) {
  x = posx;
  y = posy;
 }
 var xx = (Math.random() * 6)-3;
 var yy = (Math.random() * 6)-3;
 
 if (random == 5 && clone) {
  xx = (Math.random() * 8)-2;
  yy = (Math.random() * 8)-2;
 }
 
 var canEsquive = Math.random();
 var touchMaxCanvas = false;

 e.style.left = x+"px";
 e.style.top = y+"px";
 e.style.position = "absolute";
 e.src = "icon/"+game.icon[random]+".png";
 document.body.appendChild(e);
 
 requestAnimationFrame(loop);
 
 if (random == 5) {
  canEsquive -= 0.4;
 }
 
 if (random == 1 || random == 3) {
  canEsquive = 0.1;
 }
 
 if (random == 4) {
  canEsquive += 0.3;
 }

 
 e.onclick = function () {
  if (canEsquive <= 0.4) {
   // when deleted/ can't asq
   
   if (random == 2) {
    soda(x,y)
   }
   
   if (random == 0 && (Math.random() >= 0.5)) {
    tektoTrain(y)
   }
   
   canEsquive = -1;
   e.src = "icon/"+game.icon[random]+"2.png";
   
    HPS_makeCSS(e,{ duration: 0.3, easing: "ease-in", loopTime: 1},[
     { opacity: 0, scale: 0 }
    ]).onfinish = function () {
     e.style.scale = 0;
    }
   setTimeout(() => {
    deleted = true;
    e.remove();
    game.scores += 11;
    game.cuttyCount--;
   },400);
  } else {
       HPS_makeCSS(e,{ duration: 0.2, easing: "ease-in", loopTime: 1},[
  { opacity: 0.5, transform: "scale(1.3,0.7)" }
 ])

   if (random == 5 && !clone && (Math.random() >= 0.3)) {
    for (var i = 0; i < 4; i++) {
     makeIcon(x,y,random,true);
     game.scores += 6;
    }
   }
   
   if (canEsquive <= 0) {
    
   }
   
   var speed = 150;
   canEsquive -= 0.4;
   console.log(canEsquive)
   
   if (xx <= 0) {
    xx += speed;
   } else {
    xx -= speed;
   }
   
   if (yy <= 0) {
    yy += speed;
   } else {
    yy -= speed;
   }
   
   setTimeout(() => {
    if (xx >= 0) {
     xx -= speed;
    } else {
     xx += speed;
    }

    if (yy >= 0) {
     yy -= speed;
    } else {
     yy += speed;
    }
    
    xx = (Math.random() * 6)-3;
    yy = (Math.random() * 6)-3;
   },80)
  }
 }
 
 function loop() {
    if (x >= window.innerWidth) {
     x -= 100;
     touchMaxCanvas = true;
    }
    
    if (x <= 0) {
     x += 100;
     touchMaxCanvas = true;
    }

    if (y >= window.innerHeight) {
     y -= 100;
     touchMaxCanvas = true;
    }
    
    if (y <= 0) {
     y += 100;
     touchMaxCanvas = true;
    }
    
    if (touchMaxCanvas) {
     xx = (Math.random() * 6)-3;
     yy = (Math.random() * 6)-3;
     touchMaxCanvas = false;
    }

  if (!deleted) {
   // if not
   e.style.left = x+"px";
   e.style.top = y+"px";
   x += xx;
   y += yy;
   requestAnimationFrame(loop);
  }
 }
}

function soda(x,y) {
 var s = document.createElement("img");
 s.src = "soda.png";
 s.style.position = "absolute";
 s.style.left = x+"px";
 s.style.top = y+"px";
 s.style.zIndex = 2;
 document.body.appendChild(s);
 
 setTimeout(() => {
 HPS_makeCSS(s,{ duration: 1, easing: "ease-in", loopTime: 1},[
  { opacity: 0, scale: 0 }
 ]).onfinish = function () {
  s.remove();
 }
 },5000)
}

function tektoTrain(y) {
 var x = -1400;
 var deleted = false;
 var s = document.createElement("img");
 s.src = "tektoTrain_lowQuality.png";
 s.style.position = "absolute";
 s.style.left = "-1400px";
 s.style.top = (y+Math.random() * 1) + "px";
 s.style.zIndex = 2;
 s.style.scale = 1.6;
 s.onclick = function (){
   s.remove();
  deleted = true;
  game.scores += 500;
 }
 document.body.appendChild(s);
 
 requestAnimationFrame(loop);

 function loop() {
  if (!deleted) {
  if (x <= (window.innerWidth+100)) {
   s.style.left = x+"px";
   x+= 40;
   requestAnimationFrame(loop);
  } else {
   deleted = true;
   requestAnimationFrame(loop);
  }
  } else {
    HPS_makeCSS(s,{ duration: 1, easing: "ease-in", loopTime: 1},[
  { opacity: 0, left: (x+200)+"px"}
 ]).onfinish = function () {
  s.remove();
   }
  }
 }
}

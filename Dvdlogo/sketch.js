let x;
let y;

let xspeed;
let yspeed;

let xaccel;
let yaccel;

let rectwidth;
let rectheight;

let c;

function setup() {
    canvaswidth = 4*200;
    canvasheight = 3*200;
    rectwidth = 50;
    rectheight = 50;
    createCanvas(canvaswidth, canvasheight);
    x= random(canvaswidth-rectwidth);
    y= random(canvasheight-rectheight);
    xspeed = 1;
    yspeed = 1;
    angle = 0;
    
}
function draw() {
    background(0);
    angle= (y/(canvasheight-rectheight))*360;//(x/(canvaswidth-rectwidth))*
    console.log(angle);
    xaccel = cos(radians(angle))*0.5;
    yaccel = sin(radians(angle))*0.5;
    noStroke();
    rect(x,y,rectwidth,rectheight);
    
    c = color(255, 0, 0);
    stroke(c);
    strokeWeight(5);
    line((x+rectwidth/2),(y+rectheight/2), ((x+rectwidth/2)+xaccel*100), ((y+rectheight/2)+yaccel*100));
    
    

    xspeed = xspeed+ xaccel;
    yspeed = yspeed+ yaccel;
    x= x+ xspeed;
    y= y+ yspeed;


    if (x >= (width-rectwidth) || x <= 0) {
        xspeed = -xspeed;

    }
    if (y >= (height-rectheight) || y <= 0) {
        yspeed = -yspeed;
    }
}
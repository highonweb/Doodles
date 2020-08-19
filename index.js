const canvas=document.querySelector("#canvas")
const cont=document.querySelector("#controls")
ctx=canvas.getContext('2d');
ctx.lineWidth=2;
var painting = false
canvas.width = window.innerWidth*98/100
canvas.height = window.innerHeight*75/100
var istext = false
var isDarkmode=false
var isdraw=false
var isrect = false
var iscircle= false
var rectx,recty
function text(){
    canvas.style.cursor = "url('curs/text.png'),auto"
    ctx.globalCompositeOperation = 'source-over';
    istext = true
    isrect=false
    iscircle=false
    isdraw=false
    canvas.addEventListener("click",matext)
    
}
function thick(th) {
    ctx.lineWidth=parseInt(th)
}
function matext(e){
    if(istext){
       var textie = prompt("Please enter the text", "Doodles")
    ctx.font='30px Times New Roman';
    ctx.fillText(textie, e.clientX, e.clientY); 
    }
    
}
function rect() {
    canvas.style.cursor = "url('curs/rect.png'),auto"
    ctx.globalCompositeOperation = 'source-over';
    istext = false
    isrect=true
    iscircle=false
    isdraw=false
    canvas.addEventListener("mouseup",storect)
    canvas.addEventListener('mousedown',starect);
}
function circle(){
    canvas.style.cursor = "url('curs/circle.png'),auto"
    ctx.globalCompositeOperation = 'source-over';
    istext = false
    iscircle=true
    isrect=false
    isdraw=false
    canvas.addEventListener("mouseup",stocir)
    canvas.addEventListener('mousedown',stacir);
}
function stacir(e) {
    if(iscircle){
    lat_mousex = e.clientX
    lat_mousey = e.clientY
    }
}

function stocir(e) {
    if(iscircle){
        ctx.beginPath();
        var a = e.clientX-lat_mousex;
        var b = e.clientY-lat_mousey;
        ctx.ellipse(lat_mousex, lat_mousey, a, b, 0, 0, 2*Math.PI);
        
        ctx.stroke();
        }
}


//Mousedown

function starect(e) {
    if(isrect){
    last_mousex = e.clientX
    last_mousey = e.clientY
    }
}

function storect(e) {
    if(isrect){
        ctx.beginPath();
        var width = e.clientX-last_mousex;
        var height = e.clientY-last_mousey;
        ctx.rect(last_mousex,last_mousey,width,height);
        
        ctx.stroke();
        }
}


function clean(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        return
}
function pencil(){
    canvas.style.cursor = "url('curs/pencil.png'),auto"
    ctx.globalCompositeOperation = 'source-over';
    isrect=false
    iscircle=false
    isdraw=true
    istext = false
    if(isDarkmode){
        color('#fff')
        return
    }
    else{
        color('#000')
    }
}
function eraser(){
    canvas.style.cursor = "url('curs/eraser.png'),auto"
    ctx.globalCompositeOperation = 'destination-out';
    isrect=false
    iscircle=false
    isdraw=true
    istext = false
    if(!isDarkmode){
        color('#fff')
        return
    }
    else{
        color('#000')
    }
}
function start(){
    if(isdraw){
        painting=true
    ctx.beginPath();}
    
}
function save(){
    link=document.querySelector("#dl")
    link.href = canvas.toDataURL();
    link.download = "mypainting.png";
}
function color(col){
    colorsh = document.querySelector("#colorsh")
    colorsh.style.backgroundColor = col
    ctx.strokeStyle= String(col);
}

function stopp(){
    if(isdraw){
      painting=false
    ctx.closePath();  
    }
        
    }
    

function paint(e) {
    if(!painting){
        return
    }
     
    ctx.lineCap='round';
    ctx.lineTo(e.clientX - 20,e.clientY - 20);
    ctx.stroke()
}
function mode(im,i){
if(i==1){
        document.getElementsByTagName('body')[0].style.backgroundColor = "#fff"
        im.src = "img/modes/light.png"
        im.setAttribute('onclick','mode(this,2)')
        color('#000')
        return
    }
    else{
    document.getElementsByTagName('body')[0].style.backgroundColor = "#000"
    im.src = "img/modes/dark.png"
    im.setAttribute('onclick','mode(this,1)')
    color('#fff')
    isDarkmode=true
    }
}
canvas.addEventListener("mousedown",start,false)
canvas.addEventListener("mouseup",stopp,false)
canvas.addEventListener("mousemove",paint,false)
canvas.addEventListener("touchstart",start)
canvas.addEventListener("touchend",stopp)
canvas.addEventListener("touchmove",paint)

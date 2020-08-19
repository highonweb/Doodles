const canvas=document.querySelector("#canvas")
const cont=document.querySelector("#controls")
ctx=canvas.getContext('2d');
var painting = false
canvas.width = window.innerWidth*98/100
canvas.height = window.innerHeight*75/100
var isDarkmode=false
var isPoly = false

function poly() {
    isPoly=true

}

function clean(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        return
}
function pencil(){
    
    if(isDarkmode){
        color('#fff')
        return
    }
    else{
        color('#000')
    }
}
function eraser(){
    if(!isDarkmode){
        color('#fff')
        return
    }
    else{
        color('#000')
    }
}
function start(){
   
        painting=true
    ctx.beginPath();
    
    
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
        painting=false
    ctx.closePath();
    }
    

function paint(e) {
    if(!painting){
        return
    }
    ctx.lineWidth=10;    
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
canvas.addEventListener("mousedown",start)
canvas.addEventListener("mouseup",stopp)
canvas.addEventListener("mousemove",paint)
canvas.addEventListener("touchstart",start)
canvas.addEventListener("touchend",stopp)
canvas.addEventListener("touchmove",paint)

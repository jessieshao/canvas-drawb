function preventBehavior(e) {
    e.preventDefault()
    }  
document.addEventListener("touchmove", preventBehavior, false)
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = '2'

autoSetCanvasSize(yyy)
listenToUsers(yyy)

//橡皮擦
var eraserEnabled = false
eraser.onclick = function() {
  eraserEnabled =true 
  eraser.classList.add('active')
  pen.classList.remove('active')
  pen1.classList.remove('active')
}
pen.onclick = function(){
  eraserEnabled = false
  lineWidth = '2'
  pen.classList.add('active')
  eraser.classList.remove('active')
  pen1.classList.remove('active')
}
//画笔粗细
pen1.onclick = function(){
  eraserEnabled = false
  pen1.classList.add('active')
  pen.classList.remove('active')
  eraser.classList.remove('active')
  lineWidth = '4'
}
//清除
clear.onclick = function(){
    context.clearRect(0,0,yyy.width,yyy.height)
}
//保存
download.onclick = function(){
    var url = yyy.toDataURL('image/jpeg')
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画'
    a.target = '_blank'
    a.click()
}

/******/
//画板大小
function autoSetCanvasSize(canvas) {
  pageSize()
  window.onresize = function() {pageSize()}
  function pageSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}
//画笔颜色
function color(cx,c1,c2,c3,c4,c5,c6,c7,c8,c9,c10,c11) {
    cx.classList.add('active')
    c1.classList.remove('active')
    c2.classList.remove('active')
    c3.classList.remove('active')
    c4.classList.remove('active')
    c5.classList.remove('active')
    c6.classList.remove('active')
    c7.classList.remove('active')
    c8.classList.remove('active')
    c9.classList.remove('active')
    c10.classList.remove('active')
    c11.classList.remove('active')
}
red.onclick=function() {
    context.strokeStyle="red"
    color(red,blue,black,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua)
}
blue.onclick=function() {
    context.strokeStyle='blue'
    color(blue,red,black,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
}
black.onclick=function() {
    context.strokeStyle='black'
    color(black,blue,red,yellow,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
}
yellow.onclick=function() {
    context.strokeStyle='yellow'
    color(yellow,black,blue,red,pink,green,grey,purple,maroon,lawngreen,orange,aqua) 
}
pink.onclick=function() {
    context.strokeStyle='pink'
    color(pink,yellow,black,blue,red,green,grey,purple,maroon,lawngreen,orange,aqua) 
}
green.onclick=function() {
    context.strokeStyle='green'
    color(green,pink,yellow,black,blue,red,grey,purple,maroon,lawngreen,orange,aqua)
}
grey.onclick=function() {
    context.strokeStyle='grey'
    color(grey,purple,maroon,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
}
purple.onclick=function() {
    context.strokeStyle='purple'
    color(purple,grey,maroon,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
}
maroon.onclick=function() {
    context.strokeStyle='maroon'
    color(maroon,purple,grey,lawngreen,orange,aqua,green,pink,yellow,black,blue,red)
}
lawngreen.onclick=function() {
    context.strokeStyle='lawngreen'
    color(lawngreen,purple,maroon,grey,orange,aqua,green,pink,yellow,black,blue,red)
}
orange.onclick=function() {
    context.strokeStyle='orange'
    color(orange,purple,maroon,lawngreen,grey,aqua,green,pink,yellow,black,blue,red)
}
aqua.onclick=function() {
    context.strokeStyle='aqua'
    color(aqua,purple,maroon,lawngreen,orange,grey,green,pink,yellow,black,blue,red)
}
//画圆
function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill()
}
//连线
function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  context.moveTo(x1, y1) // 起点
  context.lineWidth = lineWidth
  context.lineTo(x2, y2) // 终点
  context.stroke()
  context.closePath()
}
//监听鼠标
function listenToUsers(canvas) {
    var using = false
    var lastPoint = {
      x: undefined,
      y: undefined
    }
    if(document.body.ontouchstart !== undefined){
        canvas.ontouchstart = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            using = true
            if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 20,20)
            } else {
            lastPoint = {"x": x,"y": y}
            }
        }
        canvas.ontouchmove = function(aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            if (!using) {return}
            if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 20, 20)
            } else {
            var newPoint = {"x": x,"y": y}
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            }
        }
        canvas.ontouchup = function(aaa) {
            using = false
        }
        }
    else{
        canvas.onmousedown = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
            } else {
            lastPoint = {"x": x,"y": y}
            }
        }
        canvas.onmousemove = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            if (!using) {return}
            if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 15, 15)
            } else {
            var newPoint = {"x": x,"y": y}
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
            lastPoint = newPoint
            }
        }
        canvas.onmouseup = function(aaa) {
            using = false
        }
        
    }
}
function randomNum(min,max){
    return min+ Math.floor(Math.random()* (max-min+1));
}

var ticker = new AlloyTicker();


function wordingAnimation() {
    var str = 'AlloyTicker',
        len = str.length,
        i = 0,
        list = [];
    for (; i < len; i++) {
        if (i === 2) {
            list[i] = document.querySelectorAll("." + str[i])[1];
        } else {
            list[i] = document.querySelector("." + str[i]);
        }
        Transform(list[i]);
        list[i].translateY = -100;
        list[i].translateX = 200 * i;
        list[i].style.visibility = 'visible';
    }

    function show(obj, x, y) {
        new To(ticker, obj, 'translateX', x, randomNum(1000, 2000)).start();
        new To(ticker, obj, 'translateY', y, randomNum(1000, 2000)).start();
        new To(ticker, obj, 'rotateX', 360, randomNum(1000, 2000)).start();
        new To(ticker, obj, 'rotateY', 360, randomNum(1000, 2000)).start();
        new To(ticker, obj, 'rotateZ', 360, randomNum(1000, 2000)).start();
    }

    for (i = 0; i < len; i++) {
        show(list[i], 180 + 40 * i, 160);
    }
}

function particleAnimation(){
    var ps=[],
        i= 0,size=100;
    for(;i<size;i++){
        ps.push(new Particle(ticker,200,310,randomNum(-5,5)/50,-1*Math.random(),0,0.001))
    }

    for(i=0;i<size;i++) {
        setTimeout((function(i){
             return function(){
                 ps[i].start();
             }
        })(i),i*20)
    }
    var canvas = document.querySelector('#particleCanvas');
    var ctx = canvas.getContext('2d');
    function render(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        var i=0;
        for(;i<size;i++){
            var p=ps[i];
            ctx.fillStyle="#61AC27";
            ctx.beginPath();
            ctx.arc(p.x, p.y,6,0,Math.PI*2,true);
            ctx.closePath();
            ctx.fill();
        }
        requestAnimationFrame(render);
    }

    render();

}

function spriteAnimation() {
    var canvas = document.querySelector('#spriteCanvas');
    var ctx = canvas.getContext('2d');

    var sprite = new Sprite(ticker, {
        frames: [[0, 0, 80, 80], [80, 0, 80, 80], [160, 0, 80, 80]],
        interval: ticker.intervalTime * 6,
        x:-20,
        y:100,
        vx:0.1,
        vy:0
    }, function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var frame = this.frames[this.index];
        if(frame) {
            ctx.drawImage(img, frame[0], frame[1], frame[2], frame[3], this.x, this.y, frame[2], frame[3]);
        }
    })

    sprite.start();
}

var img = new Image();
img.onload = function() {
    ticker.start();
    spriteAnimation();

    setTimeout(function(){
        particleAnimation();
    },2000)

    setTimeout(function(){
        wordingAnimation();

    },5000)

}
img.src= 'asset/mariosheet.png';

var slider =  new App.Slider({ x:720 ,visibility:'hidden',change:function(p){
    ticker.goto(p*7000);
    ticker.play();
} }, "#sliderCtn");

var toolbar =  new App.Toolbar({visibility:'hidden',
    back:function(){
        ticker.play();
        ticker.back();
    },
    forward:function(){
        ticker.play();
        ticker.forward();
    },
    pause:function(){
        ticker.pause();
    },
    play:function(){
        ticker.play();
    },
    addTimeScale:function(){
        ticker.play();
        ticker.scale(0.5);
    },
    subTimeScale:function(){
        ticker.play();
        ticker.scale(2)
    },
    stop:function(){
        ticker.stop();
    }
}, "#toolbarCtn");



setInterval(function(){
    slider.option.x = 720*ticker.currentTime/7000;
    if(ticker.currentTime>=7000){
        ticker.pause();
        slider.show();
        toolbar.show();
    }

},15)
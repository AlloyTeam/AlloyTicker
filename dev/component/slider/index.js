App.componentRes['component/slider/index.html'] =
'<style scoped>\
    *{\
        box-sizing: border-box;\
    }\
    .slider{\
        visibility: {{visibility}};\
    }\
\
     .sliderBar{\
         width: 720px;\
         height: 12px;\
         border:1px solid rgba(102,102,102,0.5);\
         border-radius: 4px;\
         cursor: pointer;\
     }\
\
    .handle{\
        position: absolute;\
        width: 18px;\
        height: 18px;\
        background-color: white;\
        top: -3px;\
        border-radius: 3px;\
        cursor: pointer;\
        margin-left: -10px ;\
    }\
</style>\
<div class="slider">\
    <div class="sliderBar" nc-id="sliderBar" onclick="setPercent(event,this)"></div>\
    <div class="handle" onmousedown="down()" style="transition: transform 0.05s;transition: -webkit-transform 0.05s; transform:translateX({{x}}px) translateZ(0px);-webkit-transform:translateX({{x}}px) translateZ(0px); "></div>\
</div>';

App.Slider  = Nuclear.create({
    installed: function () {
        this.pos = this.getPos(this.sliderBar);
        this.percent = 0;
        this.moveHD = this.move.bind(this);
        this.upHD = this.up.bind(this);
        this.callback = this.option.change||function(){};
    },
    setPercent: function (evt) {
        var x = evt.pageX - this.pos.x;
        if (x < 10)x = 0;
        if (x > 710)x = 720;
        this.option.x = x;
        this.percent = x / 720;
        this.callback(this.percent);
    },
    render: function () {
        return App.loadFile('component/slider/index.html');
    },
    getPos: function (el) {
        // yay readability
        for (var lx = 0, ly = 0;
             el != null;
             lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
        return {x: lx, y: ly};
    },
    down: function () {
        document.addEventListener('mousemove', this.moveHD, false);
        document.addEventListener('mouseup', this.upHD, false)
    },
    move: function (evt) {
        evt.preventDefault();
        this.setPercent(evt);
    },
    up: function () {
        document.removeEventListener('mousemove', this.moveHD);
        document.removeEventListener('mouseup', this.upHD)
    },
    show:function(){
        this.option.visibility='visible';
    }
});
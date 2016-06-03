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
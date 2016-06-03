App.Toolbar  = Nuclear.create({
    install:function(){
        this.back=this.option.back;
        this.forward=this.option.forward;
        this.pause=this.option.pause;
        this.play=this.option.play;
        this.addTimeScale=this.option.addTimeScale;
        this.subTimeScale=this.option.subTimeScale;
        this.stop=this.option.stop;
    },
    render: function () {
        return App.loadFile('component/toolbar/index.html');
    },
    show:function(){
        this.option.visibility='visible';
    }
});
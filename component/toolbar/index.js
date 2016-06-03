App.componentRes['component/toolbar/index.html'] =
'<style scoped>\
    .toolbar{\
        visibility: {{visibility}};\
    }\
\
</style>\
<div class="toolbar">\
    <input type="button" onclick="back()" value="back" />\
    <input type="button" onclick="forward()"  value="forward" />\
    <input type="button" onclick="pause()"  value="pause" />\
    <input type="button" onclick="play()"  value="play" />\
    <input type="button"  onclick="subTimeScale()" value="<<<" />\
    <input type="button" onclick="addTimeScale()"  value=">>>" />\
    <input type="button" onclick="stop()"  value="stop" />\
    <input type="button" onclick="restart()"  value="restart" />\
</div>';

App.Toolbar  = Nuclear.create({
    install:function(){
        this.back=this.option.back;
        this.forward=this.option.forward;
        this.pause=this.option.pause;
        this.play=this.option.play;
        this.addTimeScale=this.option.addTimeScale;
        this.subTimeScale=this.option.subTimeScale;
        this.stop=this.option.stop;
        this.restart=this.option.restart;
    },
    render: function () {
        return App.loadFile('component/toolbar/index.html');
    },
    show:function(){
        this.option.visibility='visible';
    }
});
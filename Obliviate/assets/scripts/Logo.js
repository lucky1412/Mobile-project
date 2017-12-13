var global = require('GlobalFile')
cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        audio:{
            default:null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        cc.audioEngine.play(this.audio, false, 0.1);
        this.canvas.opacity = 0;
        this.canvas.runAction(
            cc.fadeIn(4.0)
        );
        
        this.scheduleOnce(function() { this.nextScene() }, 6);
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         
     },
    
    nextScene: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(2.0), 
            cc.callFunc(function () {
                cc.director.loadScene('MainMenu');
            })
        ));   
    },
});

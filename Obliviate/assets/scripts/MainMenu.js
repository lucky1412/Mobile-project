cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        vortex:{
            default:null,
            type: cc.Node
        },
        startButton:{
            default:null,
            type: cc.Button
        },
        storeButton:{
            default:null,
            type: cc.Button
        },
        adventurebookButton:{
            default:null,
            type: cc.Button
        },
        creditsButton:{
            default:null,
            type: cc.Button
        },
        exitButton:{
            default:null,
            type: cc.Button
        },
        title:{
            default:null,
            type: cc.Node
        },
        audio:{
            default:null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        this.canvas.opacity = 0;
        this.canvas.runAction(
            cc.fadeIn(1.0)
        );
        
        if (cc.audioEngine.isMusicPlaying() == false) {
            cc.audioEngine.end();
            cc.audioEngine.play(this.audio, true, 0.3);
        }
        
        this.scheduleOnce(function() { var animation = this.node.getComponent(cc.Animation); animation.play('button_fall') }, 1);
        this.scheduleOnce(function() { this.title.runAction(cc.fadeIn(1.0)) }, 1.5);
        this.scheduleOnce(function() { this.vortex.runAction(cc.fadeIn(2.0)) }, 2.5);
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         this.vortex.rotation = this.vortex.rotation + 1;
     },
    
    onClickedStart: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('PackChoice');
            })
        ));   
    },
    
    onClickedStore: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('Store');
            })
        ));
    },
    
    onClickedAdventure: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('AdventureBook');
            })
        ));
    },
    
    onClickedCredits: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('Settings');
            })
        )); 
    },
    
    onClickedExit: function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.game.end();
            })
        ));   
    },
});

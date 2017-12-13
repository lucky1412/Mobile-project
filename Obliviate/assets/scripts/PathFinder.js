var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        enemyGoToPosition: null,
        enemyGoToPositionTutorial: null,
        tutorial: null
    },

    // use this for initialization
    onLoad: function () {
        this.enemyGoToPosition = [
            [
                [-15,-130],
                [-15,130],
                [260,130],
                [260,-30],
                [520, -30]
            ],
            [
                [-28,-159],
                [-28,116],
                [238,116],
                [238,-62],
                [550, -62]
            ],
            [
                [-28,-159],
                [-28,116],
                [238,116],
                [238,-62],
                [550,-62]
            ]
        ];
        this.enemyGoToPositionTutorial = [
            [6.9,281],
            [6.9,-11],
            [350,-11]
        ];
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    createPath: function(speed, tutorial) {
        var moveBys = new Array();
        if(tutorial == true){
            var length = this.enemyGoToPositionTutorial.length;
            for(let i = 0; i < length; i++){
                moveBys[i] = new cc.MoveTo(speed, cc.p(this.enemyGoToPositionTutorial[i][0],this.enemyGoToPositionTutorial[i][1]));
            }
        }else{
            var paths = global.getCorrectPath(); //array (first corner t'ill last ending point)
            var amountOfCorners = paths.length;
            for(let i = 0; i < amountOfCorners; i++){
                var distance = 0;
                if(i == 0){
                    var x1 = global.getSpawnerPointX();
                    var y1 = global.getSpawnerPointY();
                    var x2 = paths[i][0];
                    var y2 = paths[i][1];
                }else{
                    var x1 = paths[i - 1][0];
                    var y1 = paths[i - 1][1];
                    var x2 = paths[i][0];
                    var y2 = paths[i][1];
                }
                
                if(x1 == x2){
                    distance = y1 - y2;
                    if(distance < 0){
                        distance = distance * -1;
                    }
                }else if(y1 == y2){
                    distance = x1 - x2;
                    if(distance < 0){
                        distance = distance * -1;
                    }
                }else{
                    var a = 0;
                    var b = 0;
                    var c = 0;
                    
                    a = x1 - x2;
                    if(a < 0){
                        a = a * -1;
                    }
                    b = y1 - y2;
                    if(b < 0){
                        b = b * -1;
                    }
                    a = a * a;
                    b = b * b;
                    c = a + b;
                    distance =  Math.sqrt(c);
                }
                
                var time = (speed / 640) * distance;
                moveBys[i] = new cc.MoveTo(time, cc.p(paths[i][0],paths[i][1]));
            }
        }
        return cc.sequence(moveBys);
    },
    
    getEndingPoint: function(tutorial){
        if(tutorial == true){
            return cc.p(this.enemyGoToPositionTutorial[2][0],this.enemyGoToPositionTutorial[2][1]); 
        }
    },
    
    createSlowPath: function(speed, x, y){
        var paths = global.getCorrectPath(); //array (first corner t'ill last ending point)
        var amountOfCorners = paths.length;
        var number = null;
        for(let i = 0 ; i < amountOfCorners ; i++){
            if(x == paths[i][0] || y == paths[i][1]){
                number = i;
            }
        }
    }
});

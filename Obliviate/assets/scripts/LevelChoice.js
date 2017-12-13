var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        scrollView: {
        	default: null,
        	type: cc.ScrollView
        },
        canvas:{
            default:null,
            type: cc.Node
        },
        title:{
            default:null,
            type: cc.Label
        },
        cleared:{
            default:null,
            type: cc.Label
        },
        unlocked:{
            default:null,
            type: cc.Label
        },
        back:{
            default:null,
            type: cc.Button
        },
    },

    // use this for initialization
    onLoad: function () {
        this.content = this.scrollView.content;
        this.y = 0;
        this.yDif = -103;
        this.createdLevels = [];
        this.createContent();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    
    backPressed : function(){
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('WorldChoice');
            })
        ));
    },
    
    createContent: function() {
        //set labels
        this.title.string = "World " + global.getWorldPressed();
        this.cleared.string = "Clear: " + global.getAmountClearedWorld1() + " / " + global.getLevelAmountPerWorld();
        this.unlocked.string = "Unlocked: " + global.getAmountUnlockedWorld1() + " / " + global.getLevelAmountPerWorld();
        
        //get amount of levels
        var amountOfLevels = global.getLevelAmountPerWorld();
        //set content height
        this.content.setContentSize(cc.size(568, 103  * amountOfLevels));
        //get all level data
        var allLevelData = global.getWorld1Data();
        //create loop
        for(let i = 0 ; i < amountOfLevels ; i++){
            //create level section
            //create node
            var levelSection = new cc.Node();
            //set parent
            levelSection.parent = this.content;
            //add to array
            this.createdLevels.push(levelSection);
            //set anchor
            levelSection.setAnchorPoint(0, 1);
            //set position
            levelSection.setPosition(cc.p(0,this.y));
            //set size
            levelSection.setContentSize(cc.size(568, 103));
            //move y down
            this.y = this.y + this.yDif;
            
            //create object sprite
            //create node
            var previewObject = new cc.Node();
            //set parent
            previewObject.parent = levelSection;
            //set sprite
            if(allLevelData[i][5] == null){
                var fileName = "preview_no";
            }else{
                var fileName = allLevelData[i][5];
            }
            var sprite = previewObject.addComponent(cc.Sprite);
            cc.loader.loadRes(fileName, function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            //set position
            previewObject.setPosition(cc.p(87,-51));
            //set size
            previewObject.setContentSize(cc.size(138, 70));
            
            if(allLevelData[i][2] == true || allLevelData[i][1] == true){
                //create lock node
                //create node
                var lock = new cc.Node();
                //set parent
                lock.parent = previewObject;
                //set sprite
                if(allLevelData[i][2] == true){
                    var fileName = "lock";
                }else{
                    var fileName = "cleared";
                }
                var sprite = lock.addComponent(cc.Sprite);
                cc.loader.loadRes(fileName, function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                //set anchor
                lock.setAnchorPoint(1,0);
                //set position
                lock.setPosition(cc.p(69,-35));
                //set size
                lock.setContentSize(cc.size(30, 30));
            }
            
            //create level label
            //create node
            var level = new cc.Node();
            //create label
            var lblLevel = level.addComponent(cc.Label);
            //set parent
            level.parent = levelSection;
            //set anchor
            level.setAnchorPoint(0,0);
            //set position
            level.setPosition(cc.p(176,-49));
            //set color
            level.setColor(cc.Color.BLACK);
            //set string
            lblLevel.string = "Level " + allLevelData[i][0];
            //set font
            //lblLevel.setFontFamily("Castellar");
            
            //create points label
            //create node
            var points = new cc.Node();
            //create label
            var lblPoints = points.addComponent(cc.Label);
            //set parent
            points.parent = levelSection;
            //set anchor
            points.setAnchorPoint(0,0);
            //set position
            points.setPosition(cc.p(176,-87));
            //set color
            points.setColor(cc.Color.BLACK);
            //set string
            lblPoints.string = allLevelData[i][3] + " seconds";
            //set font
            //lblPoints.setFontFamily("Castellar");
            
            //create grade sprite
            //create node
            var grade = new cc.Node();
            //set parent
            grade.parent = levelSection;
            //set sprite
            if(allLevelData[i][4] == null){
                var fileName = "grade_no_grade";
            }else{
                var fileName = allLevelData[i][4];
            }
            var sprite = grade.addComponent(cc.Sprite);
            cc.loader.loadRes(fileName, function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            //set position
            grade.setPosition(cc.p(532,-36));
            //set size
            grade.setContentSize(cc.size(50, 50));
            
            //on node click
            levelSection.on('touchend', function(event){
                if(allLevelData[i][2] == false){
                    global.setLevelPressed(i+1);
                    this.canvas.runAction(cc.sequence( 
                        cc.fadeOut(1.0), 
                        cc.callFunc(function () {
                            cc.director.loadScene('Level');
                        })
                    ));
                }
            }, this);
        }
    },
});

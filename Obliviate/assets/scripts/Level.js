var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        lblHealth:{
            default:null,
            type: cc.Label
        },
        lblWave:{
            default:null,
            type: cc.Label
        },
        lblMoney:{
            default:null,
            type: cc.Label
        },
        lblCost:{
            default:null,
            type: cc.Label
        },
        lblLevel:{
            default:null,
            type: cc.Label
        },
        lblSeconds:{
            default:null,
            type: cc.Label
        },
        gradeNode:{
            default:null,
            type: cc.Node
        },
        btnBuy:{
            default:null,
            type: cc.Button
        },
        upgradeSection:{
            default:null,
            type: cc.Node
        },
        gameScreen:{
            default:null,
            type: cc.Node
        },
        spawner:{
            default:null,
            type: cc.Node
        },
        pathFinder:{
            default:null,
            type: cc.Node
        },
        turretPrefab:{
            default:null,
            type: cc.Prefab
        },
        enemyPrefab:{
            default:null,
            type: cc.Prefab
        },
        bulletPrefab:{
            default:null,
            type: cc.Prefab
        },
        audio:{
            default:null,
            url: cc.AudioClip
        },
        spotted:{
            default:null,
            type: cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.turrets = new Array();
        this.enemies = new Array();
        
        this.hp = 3;
        this.wv = 1;
        this.mny = 250;
        this.cost = 100;
        this.continue = false;
        this.end = false;
        this.x = -220;
        this.time = 0;
        
        this.levelData = global.getLevelDataWorld1(global.getLevelPressed);
        
        this.spawner.getComponent('Spawner').game = this;
        
        this.lblWave.node.on('touchend', function (event) {
            if(this.continue == true){
                this.beginNextWave();
            }
        }, this);
        
        this.turretTypes = [];
        this.upgrades = [];
        
        global.resetTowerPlacement();
        
        this.setup();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if(this.hp < 1){
             if(this.end == false){
                 this.unschedule(this.countTime);
                 for(let i = 0; i < this.enemies.length ; i++){
                     this.enemies[i].getComponent('Enemy').dead = true;
                 }
                 this.enemies = [];
                 this.mny = 0;
                 this.endingScreen();
             }
         }
         
         var enemySize = this.enemies.length;
         var deaths = 0;
         for(let i = 0 ; i < enemySize ; i++){
             var enemy = this.enemies[i];
             if(enemy.getComponent('Enemy').dead == true){
                 deaths = deaths + 1;
             }
         }
         
         if(enemySize == deaths && deaths != 0){
             this.unschedule(this.countTime);
             this.enemies = [];
             this.lblWave.string = "Wave: done";
             //end of wave
             this.wv = this.wv + 1;
             if(global.getWorld1EnemyTypesSpecificLevel().length >= this.wv){
                 this.scheduleOnce(function(){this.lblWave.string = "Start next wave --->"; this.continue = true}, 2.0);
             }else{
                 this.end = true;
                 this.setTimeAndGrade();
                 global.setLevelClearWorld1();
                 this.lblWave.stirng = "Level complete!";
                 this.endingScreen();
             }
         }
     },
    
    setup: function() {
        this.lblHealth.node.setOpacity(0);
        this.lblWave.node.setOpacity(0);
        this.lblMoney.node.setOpacity(0);
        this.btnBuy.node.setOpacity(0);
        this.upgradeSection.setOpacity(0);
        this.gameScreen.setOpacity(0);
        this.gameScreen.getChildByName("endingScreen").setOpacity(0);
        this.spotted.setOpacity(0);
        
        this.lblHealth.string = "Health: " + this.hp;
        this.lblMoney.string = "Money: " + this.mny;
        
        var fileName = "level_" + global.getWorldPressed() + "_" + global.getLevelPressed();
        var sprite = this.gameScreen.getComponent(cc.Sprite);
        cc.loader.loadRes(fileName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        
        this.scheduleOnce(function(){this.lblHealth.node.runAction(cc.fadeIn(1))}, 0.5);
        this.scheduleOnce(function(){this.lblWave.node.runAction(cc.fadeIn(1))}, 1.0);
        this.scheduleOnce(function(){this.lblMoney.node.runAction(cc.fadeIn(1))}, 1.5);
        this.scheduleOnce(function(){this.btnBuy.node.runAction(cc.fadeIn(1))}, 2.0);
        this.scheduleOnce(function(){this.upgradeSection.runAction(cc.fadeIn(1))}, 2.5);
        this.scheduleOnce(function(){this.gameScreen.runAction(cc.fadeIn(2))}, 3.0);
        
        this.scheduleOnce(function()
        {this.lblWave.string = "Start next wave --->"; 
                          this.continue = true}, 5.0);
        
    },
    
    beginNextWave: function(){
        this.schedule(this.countTime, 1);
        this.lblWave.string = "Wave: " + this.wv + "/" + global.getWorld1EnemyTypesSpecificLevel().length;
        this.continue = false;
        this.spawner.getComponent('Spawner').spawnWave();
    },
    
    spawnTurret: function() {
        if(this.mny >= this.cost){
            this.spawner.getComponent('Spawner').spawnTurret();
            this.mny = this.mny - this.cost;
            this.cost = this.cost + 50;
            this.lblMoney.string = "Money: " + this.mny;
            this.lblCost.string = this.cost;
        }
    },
    
    checkTowerSection: function(type) {
        //check if it already exists
        for(let i = 0 ; i < this.upgrades.length ; i++){
            if(this.upgrades[i][0] == type){
                return;
            }
        }
        
        //if not
        //make section node
        var section = new cc.Node();
        //set parent
        section.parent = this.upgradeSection;
        //give sprite
        var sprite = section.addComponent(cc.Sprite);
        cc.loader.loadRes("upgrade_tower_section", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        //set location
        section.setPosition(cc.p(this.x,0));
        //make tower sprite
        var towerSprite = new cc.Node();
        //set parent
        towerSprite.parent = section;
        //give sprite
        var fileName = "towerSection_" + type;
        var sprite = towerSprite.addComponent(cc.Sprite);
        cc.loader.loadRes(fileName, function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        //set location
        towerSprite.setPosition(cc.p(0,18));
        //make label
        var damageNode = new cc.Node();
        var damage = damageNode.addComponent(cc.Label);
        //set parent
        damageNode.parent = section;
        //set scale
        damageNode.setScale(0.4,0.4);
        //set position
        damageNode.setPosition(cc.p(0,-11));
        //set text
        damage.string = "Damage: " + 30;
        //set color
        damageNode.setColor(cc.Color.BLACK);
        //make label
        var costNode = new cc.Node();
        var cost = costNode.addComponent(cc.Label);
        //set parent
        costNode.parent = section;
        //set scale
        costNode.setScale(0.4,0.4);
        //set position
        costNode.setPosition(cc.p(0,-29.7));
        //set text
        cost.string = "Cost: " + 100;
        //set color
        costNode.setColor(cc.Color.BLACK);

        //save in array
        this.upgrades.push([type,30,damageNode,100,costNode]);
        
        //on listener
        section.on('touchend', function(event){
                   this.upgradeTower(type);
        },this);
        
        //move x to the right
        this.x = this.x + 120;
    },
    
    upgradeTower: function(type) {
        var upgradeCost = 0;
        var row = 0;
        
        for(let i = 0 ; i < this.upgrades.length ; i++){
            if(this.upgrades[i][0] == type){
                row = i;
            }
        }
        
        if(this.upgrades[row][3] <= this.mny){
            this.mny = this.mny - this.upgrades[row][3];
            this.lblMoney.string = "Money: " + this.mny;
            
            this.upgrades[row][1] = this.upgrades[row][1] + 30;
            this.upgrades[row][3] = this.upgrades[row][3] * 2;
            
            var damageNode = this.upgrades[row][2];
            var damage = damageNode.getComponent(cc.Label);
            damage.string = "Damage: " + this.upgrades[row][1];
            var costNode = this.upgrades[row][4];
            var cost = costNode.getComponent(cc.Label);
            cost.string = "Cost: " + this.upgrades[row][3];
        }
        
        this.updateTurretDamage(type,this.upgrades[row][1]);
    },
    
    updateTurretDamage: function(type, damage) {
        for(let i = 0 ; i < this.turrets.length ; i++){
            var turret = this.turrets[i];
            if(turret.getComponent('Turret').type == type){
                turret.getComponent('Turret').damage = damage;
            }
        }
    },
    
    countTime: function(){
        this.time = this.time + 1;
    },
    
    setTimeAndGrade: function () {
        var finalTime = this.time;
        var grade = "";
        
        if(finalTime > 240){
            grade = "grade_F";
        }else if(finalTime > 230){
            grade = "grade_E";
        }else if(finalTime > 220){
            grade = "grade_D";
        }else if(finalTime > 210){
            grade = "grade_C";
        }else if(finalTime > 200){
            grade = "grade_B";
        }else if(finalTime < 200){
            grade = "grade_A";
        }
        
        global.setLevelPointsWorld1(finalTime,grade);
    },
    
    endingScreen: function() {
        if(this.end == false){
            this.end = true;
            var ending = this.gameScreen.getChildByName("endingScreen");
            this.gameScreen.parent = null;
            
            this.lblLevel.string = "Level " + global.getLevelPressed() + " Failed!";
            this.lblSeconds.string = this.time + " seconds!";
            
            var fileName = "level_" + global.getWorldPressed() + "_" + global.getLevelPressed() + "_blur";
            var sprite = this.gameScreen.getComponent(cc.Sprite);
            cc.loader.loadRes(fileName, function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            
            var sprite  = this.gradeNode.addComponent(cc.Sprite);
            cc.loader.loadRes("grade_no_grade", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            
            this.gameScreen.parent = this.node;
            ending.runAction(cc.fadeIn(1.0));
        }else{
            var ending = this.gameScreen.getChildByName("endingScreen");
            this.gameScreen.parent = null;
            var gradeSprite = global.getGrade();

            this.lblLevel.string = "Level " + global.getLevelPressed() + " Cleared!";
            this.lblSeconds.string = global.getSeconds() + " seconds!";

            var fileName = "level_" + global.getWorldPressed() + "_" + global.getLevelPressed() + "_blur";
            var sprite = this.gameScreen.getComponent(cc.Sprite);
            cc.loader.loadRes(fileName, function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));

            var sprite  = this.gradeNode.addComponent(cc.Sprite);
            cc.loader.loadRes(gradeSprite, function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));

            this.gameScreen.parent = this.node;
            ending.runAction(cc.fadeIn(1.0));
        }
        
    },
    
    goToMainMenu: function() {
        if(this.end == true){
            global.saveGame();
            this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('MainMenu');
            })
        ));   
        }
    },
    
    goToLevels : function() {
        if(this.end == true){
            global.saveGame();
            this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('LevelChoice');
            })
        ));   
        }
    },
});

var global = require("GlobalFile")
cc.Class({
    extends: cc.Component,

    properties: {
        canvas:{
            default:null,
            type: cc.Node
        },
        explainer:{
            default:null,
            type: cc.Node
        },
        health:{
            default:null,
            type: cc.Label
        },
        money:{
            default:null,
            type: cc.Label
        },
        wave:{
            default:null,
            type: cc.Label
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
        pathFinder:{
            default:null,
            type: cc.Node
        },
        spawn1:{
            default:null,
            type: cc.Node
        },
        spawn2:{
            default:null,
            type: cc.Node
        },
        buy:{
            default:null,
            type: cc.Node
        },
        upgrade:{
            default:null,
            type: cc.Node
        },
        speedUp:{
            default:null,
            type: cc.Node
        },
        btnBuy:{
            default:null,
            type: cc.Node
        },
        lblCost:{
            default:null,
            type: cc.Label
        },
        spawner:{
            default:null,
            type: cc.Node
        },
        upgradeSection:{
            default:null,
            type:cc.Node
        },
        towerUpgradeSection:{
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
        
        cc.audioEngine.end();
        cc.audioEngine.play(this.audio, true, 0.2);
        
        this.turrets = new Array();
        this.enemies = new Array();
        this.hp = 3;
        this.wv = 1;
        this.mny = 0;
        this.cost = 100;
        this.turretAmount = 0;
        this.spawnerPosition = [-350,281];
        this.spawner.getComponent('Spawner').game = this;
        this.continue = false;
        this.towerInfo = false;
        this.x = -220;
        
        this.wave.node.on('touchend', function (event) {
            if(this.continue == true){
                this.beginNextWave();
            }
        }, this);
        
        this.turretTypes = ["standard"];
        this.upgrades = [];
        
        this.setup();
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
         if(this.hp < 1){
             this.health.string = "Game Over";
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
             this.enemies = [];
             this.wave.string = "Wave: done";
             if(this.wv == 1){
                 this.wv = 2;
                 this.explainGold();
             }else if(this.wv == 2){
                 this.wv = 3;
                 this.explainUpgrade();
             }else if(this.wv == 3){
                 this.wv = 4;
                 this.wave.string = "Next wave --->";
                 this.continue = true;
             }else if(this.wv == 4){
                 this.wv = 5;
                 this.introduceBoss();
             }else if(this.wv == 5){
                 this.endTutorial();
             }
         }

     },
    
    setup: function() {
        this.explainer.setOpacity(0);
        this.health.node.setOpacity(0);
        this.wave.node.setOpacity(0);
        this.money.node.setOpacity(0);
        this.btnBuy.setOpacity(0);
        this.btnBuy.setOpacity(0);
        this.upgradeSection.setOpacity(0);
        
        this.scheduleOnce(function() { this.createScreenPartHelloTextBalloon() }, 1);
    },
    
    createScreenPartHelloTextBalloon: function(){
        //show explainer
        this.explainer.runAction(cc.fadeIn(2.0));
        
        //create text balloon
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_hello", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createScreenPartStarted();
            }, this);
        }, 1);
    },
    
    createScreenPartStarted: function(){
        //create text balloon
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_start", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createScreenPartHealth();
            }, this);
        }, 1);
    },
    
    createScreenPartHealth : function() {
        //create health
        this.scheduleOnce(function() { this.health.node.runAction(cc.fadeIn(1.0))},1);
        //create text
        //create text balloon
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_health", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createScreenPartPathText();
            }, this);
        }, 1.5);
    },
    
    createScreenPartPathText: function() {
        //create text
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_create_path", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createScreenPartPath();
            }, this);
        }, 1);
    },
    
    createScreenPartPath: function() {
        //create a path
        //create part 1
        this.scheduleOnce(function() {
            var line = new cc.Node();
            line.setOpacity(0);
            line.parent = this.node;
            var sprite = line.addComponent(cc.Sprite);
            cc.loader.loadRes("simple_path_long", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            line.setPosition(cc.p(-160,281));
            line.runAction(cc.fadeIn(1.2));
        }, 1);
        //create part 2
        this.scheduleOnce(function() {
            var line = new cc.Node();
            line.setOpacity(0);
            line.parent = this.node;
            var sprite = line.addComponent(cc.Sprite);
            cc.loader.loadRes("simple_path", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            line.setPosition(cc.p(6.9,135));
            line.rotation = 90;
            line.runAction(cc.fadeIn(1.2));
        }, 1.5);
        //create part 3
        this.scheduleOnce(function() {
            var line = new cc.Node();
            line.setOpacity(0);
            line.parent = this.node;
            var sprite = line.addComponent(cc.Sprite);
            cc.loader.loadRes("simple_path_long", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            line.setPosition(cc.p(161,-11));
            line.runAction(cc.fadeIn(1.2));
        }, 2);
        
        //create text
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_path", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createScreenPartTurretsSpawn();
            }, this);
        }, 3);
    },
    
    createScreenPartTurretsSpawn : function() {
        this.spawn1 = new cc.Node();
        this.spawn2 = new cc.Node();
        this.spawn1.setOpacity(0);
        this.spawn2.setOpacity(0);
        this.spawn1.parent = this.node;
        this.spawn2.parent = this.node;
        var sprite = this.spawn1.addComponent(cc.Sprite);
        var sprite2 = this.spawn2.addComponent(cc.Sprite);
        cc.loader.loadRes("spawn_place", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        cc.loader.loadRes("spawn_place", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite2));
        this.spawn1.setPosition(cc.p(160,130));
        this.spawn2.setPosition(cc.p(-153.1,130));
        this.spawn1.runAction(cc.fadeIn(2.0));
        this.spawn2.runAction(cc.fadeIn(2.0));
        
        //create text
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_turrets_spawn", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.explainer.runAction(cc.fadeOut(0.5));
                this.explainer.parent = null;
                this.createScreenPartSecrets();
            }, this);
        }, 2);
    },
    
    createScreenPartSecrets: function() {
        this.buy = new cc.Node();
        this.upgrade = new cc.Node();
        this.speedUp = new cc.Node();
        this.buy.setOpacity(0);
        this.upgrade.setOpacity(0);
        this.speedUp.setOpacity(0);
        this.buy.parent = this.node;
        this.upgrade.parent = this.node;
        this.speedUp.parent = this.node;
        var sprite = this.buy.addComponent(cc.Sprite);
        var sprite2 = this.upgrade.addComponent(cc.Sprite);
        var sprite3 = this.speedUp.addComponent(cc.Sprite);
        cc.loader.loadRes("buy_secret", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite));
        cc.loader.loadRes("upgrade_secret", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite2));
        cc.loader.loadRes("speed_secret", function(err, data) {
            this.spriteFrame = new cc.SpriteFrame(data);
        }.bind(sprite3));
        this.buy.setPosition(cc.p(-178,-212));
        this.upgrade.setPosition(cc.p(5,-357));
        this.speedUp.setPosition(cc.p(243,-212));
        this.buy.runAction(cc.fadeIn(1.0));
        this.upgrade.runAction(cc.fadeIn(1.0));
        this.speedUp.runAction(cc.fadeIn(1.0));
        this.explainer.parent = this.node;
        
        this.scheduleOnce(function() { 
            this.explainer.runAction(cc.fadeIn(1.0));
            
            this.scheduleOnce(function() { 
                var textBalloon = new cc.Node();
                textBalloon.setOpacity(0);
                textBalloon.parent = this.node;
                var sprite = textBalloon.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_secrets", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon.setPosition(cc.p(-10,-147));
                textBalloon.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon.on('touchend', function (event) {
                    textBalloon.destroy();
                    this.giveTurrets();
                }, this);
                
                this.buy.runAction(cc.fadeOut(1.0));
                this.speedUp.runAction(cc.fadeOut(1.0));
                this.upgrade.runAction(cc.fadeOut(1.0));
            }, 1);
        },2);
    },
    
    giveTurrets: function() {
        //create text
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_give_turrets", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            //show turrets
            var turret1 = cc.instantiate(this.turretPrefab);
            var turret2 = cc.instantiate(this.turretPrefab);
            this.turrets[0] = turret1;
            this.turrets[1] = turret2;
            turret1.getComponent('Turret').game = this;
            turret2.getComponent('Turret').game = this;
            turret1.setOpacity(0);
            turret2.setOpacity(0);
            turret1.parent = this.node;
            turret2.parent = this.node;

            turret1.runAction(cc.scaleTo(0.1, 1.5, 1.5));
            turret2.runAction(cc.scaleTo(0.1, 1.5, 1.5));
            turret1.setPosition(cc.p(160,130));
            turret2.setPosition(cc.p(-153.1,130));
            turret1.runAction(cc.sequence(cc.fadeIn(0.5),cc.scaleTo(0.5, 1, 1)));
            turret2.runAction(cc.sequence(cc.fadeIn(0.5),cc.scaleTo(0.5, 1, 1)));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                this.createInfoForFirstTurret();
            }, this);
        }, 1);
    },
    
    createInfoForFirstTurret: function() {
        //create text
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_standard_turret", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                var textBalloon2 = new cc.Node();
                textBalloon2.setOpacity(0);
                textBalloon2.parent = this.node;
                var sprite = textBalloon2.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_standard_special", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon2.setPosition(cc.p(-10,-147));
                textBalloon2.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon2.on('touchend', function (event) {
                    textBalloon2.destroy();
                    this.showFirstEnemy();
                }, this);
            }, this);
        }, 1);
    },
    
    showFirstEnemy : function() {
        this.scheduleOnce(function() { 
                var textBalloon = new cc.Node();
                textBalloon.setOpacity(0);
                textBalloon.parent = this.node;
                var sprite = textBalloon.addComponent(cc.Sprite);
                cc.loader.loadRes("thinkballoon_enemy_1", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon.setPosition(cc.p(10,-70));
                textBalloon.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon.on('touchend', function (event) {
                    textBalloon.destroy();
                    
                    var textBalloon2 = new cc.Node();
                    textBalloon2.setOpacity(0);
                    textBalloon2.parent = this.node;
                    var sprite = textBalloon2.addComponent(cc.Sprite);
                    cc.loader.loadRes("balloon_first_enemy", function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    textBalloon2.setPosition(cc.p(-10,-147));
                    textBalloon2.runAction(cc.fadeIn(1.0));

                    // Use event name to register
                    textBalloon2.on('touchend', function (event) {
                        textBalloon2.destroy();
                        
                        var textBalloon3 = new cc.Node();
                        textBalloon3.setOpacity(0);
                        textBalloon3.parent = this.node;
                        var sprite = textBalloon3.addComponent(cc.Sprite);
                        cc.loader.loadRes("balloon_first_wave", function(err, data) {
                            this.spriteFrame = new cc.SpriteFrame(data);
                        }.bind(sprite));
                        textBalloon3.setPosition(cc.p(-10,-147));
                        textBalloon3.runAction(cc.fadeIn(1.0));

                        // Use event name to register
                        textBalloon3.on('touchend', function (event) {
                            textBalloon3.destroy();
                            this.scheduleOnce(function() { this.wave.node.runAction(cc.fadeIn(1.0))},1);
                            this.scheduleOnce(function() { this.spawner.getComponent('Spawner').spawnWaveTutorial()},2);
                        }, this);
                    }, this);
                }, this);
        }, 1);
    },
    
    explainGold: function() {
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_money", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                this.infoSetUpgradeTowers();
                
            }, this);
        }, 1);
    },
    
    infoSetUpgradeTowers: function() {
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_buy_turret", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                var textBalloon2 = new cc.Node();
                textBalloon2.setOpacity(0);
                textBalloon2.parent = this.node;
                var sprite = textBalloon2.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_buy_try", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon2.setPosition(cc.p(-10,-147));
                textBalloon2.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon2.on('touchend', function (event) {
                    textBalloon2.destroy();
                    this.btnBuy.runAction(cc.fadeIn(1.0));
                }, this);
            }, this);
        }, 1);
    },
    
    spawnTurret: function() {
        if(this.mny >= this.cost){
            this.spawner.getComponent('Spawner').spawnTurretTutorial();
            this.mny = this.mny - this.cost;
            this.cost = this.cost + 50;
            this.money.string = "Money: " + this.mny;
            this.lblCost.string = this.cost;
        }
        if(this.towerInfo == false){
            this.towerInfo = true;
            this.scheduleOnce(function() { 
                var textBalloon = new cc.Node();
                textBalloon.setOpacity(0);
                textBalloon.parent = this.node;
                var sprite = textBalloon.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_buy_random_power", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon.setPosition(cc.p(-10,-147));
                textBalloon.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon.on('touchend', function (event) {
                    textBalloon.destroy();

                    var textBalloon2 = new cc.Node();
                    textBalloon2.setOpacity(0);
                    textBalloon2.parent = this.node;
                    var sprite = textBalloon2.addComponent(cc.Sprite);
                    cc.loader.loadRes("balloon_buy_price", function(err, data) {
                        this.spriteFrame = new cc.SpriteFrame(data);
                    }.bind(sprite));
                    textBalloon2.setPosition(cc.p(-10,-147));
                    textBalloon2.runAction(cc.fadeIn(1.0));

                    // Use event name to register
                    textBalloon2.on('touchend', function (event) {
                        textBalloon2.destroy();
                        this.wave.string = "Next wave --->";
                        this.continue = true;
                    }, this);
                }, this);
            }, 2);
        }
    },
    
    beginNextWave: function(){
        this.wave.string = "Wave: " + this.wv + "/5";
        this.continue = false;
        this.spawner.getComponent('Spawner').spawnWaveTutorial();
    },
    
    explainUpgrade: function() {
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_enemy_stronger", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                var textBalloon2 = new cc.Node();
                textBalloon2.setOpacity(0);
                textBalloon2.parent = this.node;
                var sprite = textBalloon2.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_upgrade_works", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon2.setPosition(cc.p(-10,-147));
                textBalloon2.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon2.on('touchend', function (event) {
                    textBalloon2.destroy();
                    this.explainer.runAction(cc.fadeOut(0.5));
                    this.createUpgradeSection();
                    this.wave.string = "Next wave --->";
                    this.continue = true;
                }, this);
            }, this);
        }, 1);
    },
    
    createUpgradeSection: function() {
        this.createOtherTowerSections();
        this.upgradeSection.runAction(cc.fadeIn(1.0));
    },
    
    createOtherTowerSections: function() {
        var allDistinctTypes = this.getAllUsedTypes();
        for(let i = 0 ; i < allDistinctTypes.length ; i++){
            
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
            var fileName = "towerSection_" + allDistinctTypes[i];
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
            this.upgrades.push([allDistinctTypes[i],30,damageNode,100,costNode]);
            
            //on listener
            section.on('touchend', function(event){
                       this.upgradeTower(allDistinctTypes[i]);
            },this);
            
            //move x to the right
            this.x = this.x + 120;
        }
    },
    
    getAllUsedTypes: function() {
        var types = [];
        for(let i = 0 ; i < this.turretTypes.length ; i++){
            var pass = true;
            var type = this.turretTypes[i];
            for(let j = 0 ; j < types.length ; j++){
                if(type == types[j]){
                    pass = false;
                }
            }
            if(pass == true){
                types[types.length] = type;
            }
        }
        return types;
    },
    
    upgradeTower: function(type){
        var upgradeCost = 0;
        var row = 0;
        
        for(let i = 0 ; i < this.upgrades.length ; i++){
            if(this.upgrades[i][0] == type){
                row = i;
            }
        }
        
        if(this.upgrades[row][3] <= this.mny){
            this.mny = this.mny - this.upgrades[row][3];
            this.money.string = "Money: " + this.mny;
            
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
    
    checkTowerSection: function(type) {
        for(let i = 0 ; i < this.upgrades.length ; i++){
            if(this.upgrades[i][0] == type){
                return;
            }
        }
        
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
    
    introduceBoss: function() {
        this.explainer.runAction(cc.fadeIn(0.5));
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_fifth_intro", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                var textBalloon2 = new cc.Node();
                textBalloon2.setOpacity(0);
                textBalloon2.parent = this.node;
                var sprite = textBalloon2.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_fifth_begin", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon2.setPosition(cc.p(-10,-147));
                textBalloon2.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon2.on('touchend', function (event) {
                    textBalloon2.destroy();
                    this.explainer.runAction(cc.fadeOut(0.5));
                    this.beginNextWave();
                }, this);
            }, this);
        }, 1);
    },
    
    endTutorial: function() {
        this.explainer.runAction(cc.fadeIn(0.5));
        this.scheduleOnce(function() { 
            var textBalloon = new cc.Node();
            textBalloon.setOpacity(0);
            textBalloon.parent = this.node;
            var sprite = textBalloon.addComponent(cc.Sprite);
            cc.loader.loadRes("balloon_tutorial_end", function(err, data) {
                this.spriteFrame = new cc.SpriteFrame(data);
            }.bind(sprite));
            textBalloon.setPosition(cc.p(-10,-147));
            textBalloon.runAction(cc.fadeIn(1.0));
            
            // Use event name to register
            textBalloon.on('touchend', function (event) {
                textBalloon.destroy();
                
                var textBalloon2 = new cc.Node();
                textBalloon2.setOpacity(0);
                textBalloon2.parent = this.node;
                var sprite = textBalloon2.addComponent(cc.Sprite);
                cc.loader.loadRes("balloon_tutorial_done", function(err, data) {
                    this.spriteFrame = new cc.SpriteFrame(data);
                }.bind(sprite));
                textBalloon2.setPosition(cc.p(-10,-147));
                textBalloon2.runAction(cc.fadeIn(1.0));

                // Use event name to register
                textBalloon2.on('touchend', function (event) {
                    textBalloon2.destroy();
                    this.explainer.runAction(cc.fadeOut(0.5));
                    this.exitTutorial();
                }, this);
            }, this);
        }, 1);
    },
    
    exitTutorial: function(){
        cc.audioEngine.end();
        global.setWorld1UnL();
        global.saveGame();
        this.canvas.runAction(cc.sequence( 
            cc.fadeOut(1.0), 
            cc.callFunc(function () {
                cc.director.loadScene('MainMenu');
            })
        ));
    }
});
new Vue({
    el:'#app',
    data:{
        playerHealth:100,
        monsterHealth:100,
        gameIsRunning:false,
        turns: []
    },
    methods:{
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = []; 
        },
        attack: function(){
            // player attack on monster
           var damage = this.calculateDamage(3, 10);
           this.monsterHealth -= damage;
           this.turns.unshift({
               isPlayer:true,
               text: 'Player hits Monster. ' + damage + ' points removed😮'
           });
            if(this.checkResult()){
                return;
            }
            // monster attack on player
           var damage = this.calculateDamage(5, 12);
           this.playerHealth -= damage;
           this.turns.unshift({
            isPlayer:false,
            text: 'Monster hits Player. ' + damage + ' points removed😲'
        });
           this.checkResult();
         
        },
        specialAttack: function(){
             // player special attack on monster
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage
            this.turns.unshift({
                isPlayer:true,
                text: 'Player makes a special attack on Monster. ' + damage + ' points removed🔥💣'
            });
            if(this.checkResult()){
                return;
            }
            this.monsterSpecialAttack();
        },
        heal: function(){
            // player healing
            if(this.playerHealth <= 90){
                this.playerHealth += 10
                 
                this.turns.unshift({
                    isPlayer:true,
                    text: 'Player gets healing power. '+ '10 points gained😇❤'
                });
            }
            else{
                this.playerHealth = 100;
                this.turns.unshift({
                    isPlayer:true,
                    text: 'Player gets healing power. '+ '10 points gained😇❤'
                });
            }
            // reflects monster healing
             this.monsterHeal();
        },
        giveUp: function(){
            // give up
            this.gameIsRunning = false;
        },
        monsterSpecialAttack: function(){
             // monster special attack on player
            var damage = this.calculateDamage(9, 12);
            this.playerHealth -= damage
            this.turns.unshift({
                isPlayer:false,
                text: 'Monster makes a special attack on Player. ' + damage + ' points removed🔥😲 \n Omo E choke!'
            });

            this.checkResult();
        },
        monsterHeal:function(){
            // monster healing
           if(this.monsterHealth <=80){
               this.monsterHealth += 5;
               this.turns.unshift({
                isPlayer:false,
                text: 'Monster gets healing power. '+ '9 points gained👹❤'
            });
           } 
           else{
               this.monsterHealth = 100;
               this.turns.unshift({
                isPlayer:false,
                text: ' Monster gets healing power. '+ '5 points gained👹❤'
            });
           }
        },
        calculateDamage: function(min, max){
            // calculate the damage for all attacks
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkResult: function(){
            // result for player
            if(this.monsterHealth <= 0){
                if(confirm('You Won🎊💪🔥\n"New Game?😏"')){
                   this.startGame();
                }
                else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            // result for monster
            else if(this.playerHealth <= 0){
                if(confirm('You Lost😂 Try again!\n"New Game?😏"')){
                    this.startGame();
                 }
                 else{
                     this.gameIsRunning = false;
                 }
                 return true;
            }
            return false;
        }
    }
});
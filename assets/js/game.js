
// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less

// Wrap the game logic in a startGame() function
//      When the player is defeated or there are no more enemies, call an endGame() function that:
//      Alerts the player's total stats
//      Asks the player if they want to play again
//      If yes, call startGame() to restart the game
// After the player skips or defeats an enemy (and there are still more robots to fight):
//      Ask the player if they want to "shop"
//      If no, continue as normal
//      If yes, call the shop() function
//      In the shop() function, ask player if they want to "refill" health, "upgrade" attack, or "leave" the shop
//      If refill, subtract money points from player and increase health
//      If upgrade, subtract money points from player and increase attack power
//      If leave, alert goodbye and exit the function
//      If any other invalid option, call shop() again






// for(var i = 0; i < enemy.names.length; i++) {
//     console.log(enemy.names[i]);
//   }

// console.log(enemy.names[i]);
// console.log(i);
// console.log(enemy.names[i] + " is at " + i + " index");



// function to generate a random numeric value
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function() {
    // ask user if they'd like to fight or skip using  function
    var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
    // Conditional Recursive Function Call
if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  };
  
    // if user picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm user wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // subtract money from playerMoney for skipping
        playerInfo.playerMoney = playerInfo.money - 10;
        shop();

      }
    }
  }

// var fightOrSkip = function() {
//     // ask user if they'd like to fight or skip using  function
//     var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  
//     // Conditional Recursive Function Call
// if (promptFight === "" || promptFight === null) {
//     window.alert("You need to provide a valid answer! Please try again.");
//     return fightOrSkip();
//   }
  
//     // if user picks "skip" confirm and then stop the loop
//     if (promptFight === "skip" || promptFight === "SKIP") {
//       // confirm user wants to skip
//       var confirmSkip = window.confirm("Are you sure you'd like to quit?");
  
//       // if yes (true), leave fight
//       if (confirmSkip) {
//         window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
//         // subtract money from playerMoney for skipping
//         playerInfo.playerMoney = playerInfo.money - 10;
//         shop();
//       }
//     }
//   }


var fight = function (enemy) {

    // repeat and execute as long as the enemy robot is alive 
    while (enemy.health > 0 && playerInfo.health > 0) {
        // var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        // console.log(promptFight);
        // if player choses to skip

        
          fightOrSkip ();
        // if (promptFight === "skip" || promptFight === "SKIP") {
            
        // //     // confirm user wants to skip
        // //     var confirmSkip = window.confirm("Are you sure you'd like to quit?");
        // //     if (confirmSkip) {
        // //         window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
        // //         // subtract money fromplayerInfo.money for skipping
        // //         playerInfo.money = Math.max(0, playerInfo.money - 10);
        // //         console.log("plplayerInfo.money", playerInfo.money)
        // //         break;
        // //     }
        // }

        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            playerInfo.money = playerInfo.money + 20;
            //leave loop since enemy is dead
            break;

        } else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        // Log a resulting message to the console so we know that it worked.
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;

        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};


//when fight function is called, it passes thru each enemy.name (it's able to pass numerically bc of first parentheses)
var startGame = function () {
    // reset player stats
    playerInfo.reset();
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

            var pickedEnemyObj = enemyInfo[i];

            pickedEnemyObj.health = randomNumber(40, 60);

            fight(pickedEnemyObj);

            //if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
                if (storeConfirm) {
                    shop();
                }
            }
        }
        else {
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
    }
    endGame();
};

var endGame = function () {
    window.alert("the game has now ended. Let's see how you did!")
    if (playerInfo.health > 0) {
        window.alert("Great Job, you've survived the game! You now have a score of " + playerInfo.money + ".")
    }
    else {
        window.alert("You've lost your robot in battle.")
    }

    var playAgainConfirm = window.confirm("Would you like to play again?");
    if (playAgainConfirm) {
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};

var shop = function () {
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
           playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
           playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");
            //call shop again to force player to pick valid option
            shop();

            break;
    }
};

// function to set name
var getPlayerName = function() {
    var name = "";
  
    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
      }
  
    console.log("Your robot's name is " + name);
    return name;
  };

var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
      }, // comma!
      upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
      }

};
// You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health, playerInfo.money);


var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

console.log(enemyInfo.name);


startGame();






        // // if no (false), ask question again by running fight() again
        // else {
        //     fight();
        // }
        //         } else {
        //     // window.alert("You need to pick a valid option. Try again!");
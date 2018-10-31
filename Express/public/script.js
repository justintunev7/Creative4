var todoApp = window.angular.module("todoApp", []);

todoApp.factory('userFetcher', userFetcher);
todoApp.controller('MainCtrl', MainCtrl);

function userFetcher($http) {

    var API_ROOT = 'users';
    return {
        get: function() {
            return $http
                .get(API_ROOT)
                .then(function(resp) {
                    return resp.data;
                });
        }
    };

}


function MainCtrl($scope, userFetcher, $http) {
    // Counter to keep track of how many monsters have been defeated

    $scope.userName = 'Justin and Mason';

        userFetcher.get()
            .then(function(data) {
                var myUser;
                $scope.users = data;
                for (var i = 0; i < data.length; i++) {
                    // look for the entry with a matching `username` value
                    if (data[i].username == $scope.userName) {
                        myUser = data[i];
                        console.log("What is the found data? - " + JSON.stringify(myUser, null, 4));
                        $scope.level = myUser.userLevel;
                        $scope.userName = myUser.username;
                        $scope.healthPoints = myUser.monsterHealth;
                        $scope.tasks = myUser.tasks;
                        $scope.ctr = myUser.monsterCounter;
                        $scope.expPoints = myUser.experience;
                    }
                }
                console.log("What is the data? - " + JSON.stringify(data, null, 4));
            });
            
            
    $scope.clearToDo = function() {
        var length = $scope.tasks.length;
        for (var i = 0; i < length; i++)
        {
            $scope.tasks.pop();
        }   
    };

    $scope.clearData = function() {
        $scope.userName = 'New User';
        $scope.level = 1;
        $scope.healthPoints = 1000;
        console.log($scope.tasks.length);
        $scope.clearToDo();
        $scope.expPoints = 0;
        $scope.ctr = 0;
        console.log('Tasks: ' + JSON.stringify($scope.tasks, null, 4));
    };
    
    // Array of href's to monsters (gif) - last one is the celebration final image
    $scope.monsters = ["http://www.animatedimages.org/data/media/574/animated-monster-image-0032.gif",
        "http://www.animatedimages.org/data/media/574/animated-monster-image-0081.gif",
        "http://www.animatedimages.org/data/media/574/animated-monster-image-0139.gif",
        "http://www.animatedimages.org/data/media/574/animated-monster-image-0065.gif",
        "http://www.animatedimages.org/data/media/574/animated-monster-image-0110.gif",
        "http://www.animatedimages.org/data/media/1103/animated-congratulation-image-0092.gif"
    ];
    // Boolean to know if the game is over or not
    $scope.gameOver = false;
    // Array to hold task objects
    $scope.tasks = [];

    // addTask: function to add a task object to the tasks array
    $scope.addTask = function() {
        $scope.tasks.push({
            text: $scope.taskText,
            complete: false
        });
        
        $scope.taskText = "";
    };
    $scope.playAudio = function() {
        var num = Math.floor((Math.random() * 4) + 1);
        if (num == 1)
            var audio = new Audio('roar.mp3');
        else if (num == 2)
            var audio = new Audio('monster.mp3');
        else if (num == 3)
            var audio = new Audio('bite.mp3');
        else if (num == 4)
            var audio = new Audio('chewy.mp3');
        //    else if (num == 5)
        //      var audio = new Audio('baby.mp3');
        audio.play();

    }

    // loseHealth: function to deal damage to the current monster
    $scope.loseHealth = function() {
        // Only lose health if the game is running
        if (!$scope.gameOver) {
            $scope.playAudio();
            // Calculate health to lose
            var healthLoss = Math.floor((Math.random() * 50) + 1);
            // Subtract that health from the monster's health points
            $scope.healthPoints -= healthLoss * 10;
            // If the monster has less than 0 health points, move on to the next monster
            if ($scope.healthPoints <= 0) {
                $scope.addExp();
                $scope.changeMonster();
            }
            else {
                // Update the damage text
                $("#damage").text('-' + (healthLoss * 10));
            }
        }
    };

    $scope.addLevel = function() {
        $scope.level++;
        $scope.expPoints = $scope.expPoints - 1000;
    };


    $scope.addExp = function() {
        $scope.expPoints += Math.floor((Math.random() * 500) + 300);
        if ($scope.expPoints >= 1000)
            $scope.addLevel();
    };

    // changeMonster: function to change to a new monster after one is defeated
    $scope.changeMonster = function() {
        // Increment the monster counter
        $scope.ctr++;
        // Reset the monster's health
        $scope.healthPoints = 1000;
        // Clear the damage text
        $("#damage").text('');
        // If we're at the second to last image, the game is over
        if ($scope.ctr >= $scope.monsters.length - 1) {
            $scope.ctr = 0;
        }
    };


    $scope.loadGame = function() {
        var myUser;
        
        userFetcher.get()
            .then(function(data) {
                $scope.users = data;
                for (var i = 0; i < data.length; i++) {
                    // look for the entry with a matching `username` value
                    if (data[i].username == $scope.userName) {
                        myUser = data[i];
                        console.log("What is the found data? - " + JSON.stringify(myUser, null, 4));
                        $scope.level = myUser.userLevel;
                        $scope.userName = myUser.username;
                        $scope.healthPoints = myUser.monsterHealth;
                        $scope.tasks = myUser.tasks;
                        $scope.ctr = myUser.monsterCounter;
                        $scope.expPoints = myUser.experience;
                    }
                }
                console.log("What is the data? - " + JSON.stringify(data, null, 4));
            });
        console.log("What is the found data? - " + JSON.stringify(myUser, null, 4));

    };

    $scope.saveGame = function() {
        var userData = {
            username: $scope.userName,
            monsterHealth: $scope.healthPoints,
            userLevel: $scope.level,
            monsterCounter: $scope.ctr,
            experience: $scope.expPoints,
            tasks: $scope.tasks
        };

        console.log(userData);
        var userUrl = 'users';
        $http({
            url: userUrl,
            method: "POST",
            data: userData
        }).success(function(data, status, headers, config) {
            console.log("Post Worked");
        }).error(function(data, status, headers, config) {
            console.log("Post failed");
        });

    };

    // setGame: reset the game (monsters)
    $scope.setGame = function() {
        $scope.userName = 'Justin and Mason';
        $scope.loadGame();
    };
}

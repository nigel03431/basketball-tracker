const trainingInput = document.querySelector('#training-input');
const addButton = document.querySelector('#add-button');
const customTraining = document.querySelector('#custom-training');

const progress = document.querySelector('#progress');
const progressBar = document.querySelector('#progress-bar');


// ===============================
// TRAINING PROGRESS
// ===============================

function updateProgress() {

    const checkboxes = document.querySelectorAll(
        '.training input[type="checkbox"]'
    );

    let completed = 0;

    checkboxes.forEach(function(box) {

        if (box.checked) {
            completed++;
        }

    });

    progress.textContent =
        completed + " / " + checkboxes.length + " completed";

    const percentage =
        checkboxes.length === 0
            ? 0
            : (completed / checkboxes.length) * 100;

    progressBar.style.width = percentage + "%";
}


// ===============================
// CUSTOM EXERCISES
// ===============================

function getCustomExercises() {

    const saved = localStorage.getItem("customExercises");

    if (saved === null) {
        return [];
    }

    return JSON.parse(saved);
}


function setupOriginalCheckbox(checkbox) {

    checkbox.addEventListener('change', function() {

        localStorage.setItem(
            "original-" + checkbox.id,
            checkbox.checked
        );

        updateProgress();

    });

}


function loadOriginalExercises() {

    const originalCheckboxes = document.querySelectorAll(
        '.training input[type="checkbox"][id^="task"]'
    );

    originalCheckboxes.forEach(function(checkbox) {

        const saved = localStorage.getItem(
            "original-" + checkbox.id
        );

        if (saved === "true") {
            checkbox.checked = true;
        }

        setupOriginalCheckbox(checkbox);

    });

}


function renderCustomExercises() {

    customTraining.innerHTML = "";

    const customExercises = getCustomExercises();

    customExercises.forEach(function(exercise, index) {

        const label = document.createElement('label');

        const checkbox = document.createElement('input');

        checkbox.type = "checkbox";
        checkbox.checked = exercise.completed;


        const deleteButton = document.createElement('button');

        deleteButton.textContent = "Delete";
        deleteButton.type = "button";


        label.appendChild(checkbox);
        label.append(" " + exercise.name);
        label.appendChild(deleteButton);

        customTraining.appendChild(label);


        checkbox.addEventListener('change', function() {

            customExercises[index].completed =
                checkbox.checked;

            localStorage.setItem(
                "customExercises",
                JSON.stringify(customExercises)
            );

            updateProgress();

        });


        deleteButton.addEventListener('click', function() {

            customExercises.splice(index, 1);

            localStorage.setItem(
                "customExercises",
                JSON.stringify(customExercises)
            );

            renderCustomExercises();

        });

    });

    updateProgress();

}


addButton.addEventListener('click', function() {

    const exercise = trainingInput.value.trim();

    if (exercise === "") {
        return;
    }

    const customExercises = getCustomExercises();

    customExercises.push({

        name: exercise,

        completed: false

    });

    localStorage.setItem(
        "customExercises",
        JSON.stringify(customExercises)
    );

    trainingInput.value = "";

    renderCustomExercises();

});


trainingInput.addEventListener('keydown', function(event) {

    if (event.key === "Enter") {

        addButton.click();

    }

});


// ===============================
// SHOOTING CALCULATOR
// ===============================

const makesInput = document.querySelector('#makes');
const attemptsInput = document.querySelector('#attempts');
const calculateButton = document.querySelector('#calculate-button');
const shootingResult = document.querySelector('#shooting-result');


calculateButton.addEventListener('click', function() {

    const makes = Number(makesInput.value);
    const attempts = Number(attemptsInput.value);

    if (attempts <= 0) {

        shootingResult.textContent =
            "I may be dumb but please enter a valid number of attempts.";

        return;
    }

    if (makes < 0 || makes > attempts) {

        shootingResult.textContent =
            "I may be dumb but makes cannot be greater than attempts.";

        return;
    }

    const percentage = (makes / attempts) * 100;

    shootingResult.textContent =
        "Shooting percentage: " +
        percentage.toFixed(1) +
        "%";

});


// ===============================
// MY STATS
// ===============================

const saveStatsButton =
    document.querySelector('#save-stats-button');

const pointsInput =
    document.querySelector('#points-input');

const freeThrowsMadeInput =
    document.querySelector('#free-throws-made-input');

const freeThrowsAttemptsInput =
    document.querySelector('#free-throws-attempts-input');

const threePointersMadeInput =
    document.querySelector('#three-pointers-made-input');

const threePointersAttemptsInput =
    document.querySelector('#three-pointers-attempts-input');

const reboundsInput =
    document.querySelector('#rebounds-input');

const assistsInput =
    document.querySelector('#assists-input');


// Save stats

saveStatsButton.addEventListener('click', function() {

    const points = Number(pointsInput.value);

    const freeThrowsMade =
        Number(freeThrowsMadeInput.value);

    const freeThrowsAttempts =
        Number(freeThrowsAttemptsInput.value);

    const threePointersMade =
        Number(threePointersMadeInput.value);

    const threePointersAttempts =
        Number(threePointersAttemptsInput.value);

    const rebounds =
        Number(reboundsInput.value);

    const assists =
        Number(assistsInput.value);


    // Validation

    if (freeThrowsMade > freeThrowsAttempts) {

        alert(
            "Free throws made cannot be greater than attempts."
        );

        return;
    }


    if (threePointersMade > threePointersAttempts) {

        alert(
            "Three pointers made cannot be greater than attempts."
        );

        return;
    }


    // Calculate percentages

    let freeThrowPercentage = 0;

    if (freeThrowsAttempts > 0) {

        freeThrowPercentage =
            (freeThrowsMade / freeThrowsAttempts) * 100;

    }


    let threePointerPercentage = 0;

    if (threePointersAttempts > 0) {

        threePointerPercentage =
            (threePointersMade / threePointersAttempts) * 100;

    }


    // Update screen

    document.querySelector('#points-stat').textContent =
        points;

    document.querySelector('#free-throws-stat').textContent =
        freeThrowsMade + " / " + freeThrowsAttempts;

    document.querySelector('#three-pointers-stat').textContent =
        threePointersMade + " / " + threePointersAttempts;

    document.querySelector('#rebounds-stat').textContent =
        rebounds;

    document.querySelector('#assists-stat').textContent =
        assists;


    document.querySelector('#free-throws-percentage').textContent =
        freeThrowPercentage.toFixed(1) + "%";

    document.querySelector('#three-pointers-percentage').textContent =
        threePointerPercentage.toFixed(1) + "%";


    // Save stats

    localStorage.setItem(
        'points',
        points
    );

    localStorage.setItem(
        'freeThrowsMade',
        freeThrowsMade
    );

    localStorage.setItem(
        'freeThrowsAttempts',
        freeThrowsAttempts
    );

    localStorage.setItem(
        'threePointersMade',
        threePointersMade
    );

    localStorage.setItem(
        'threePointersAttempts',
        threePointersAttempts
    );

    localStorage.setItem(
        'rebounds',
        rebounds
    );

    localStorage.setItem(
        'assists',
        assists
    );

});


// ===============================
// LOAD SAVED STATS
// ===============================

function loadStats() {

    const savedPoints =
        localStorage.getItem('points');

    const savedFreeThrowsMade =
        localStorage.getItem('freeThrowsMade');

    const savedFreeThrowsAttempts =
        localStorage.getItem('freeThrowsAttempts');

    const savedThreePointersMade =
        localStorage.getItem('threePointersMade');

    const savedThreePointersAttempts =
        localStorage.getItem('threePointersAttempts');

    const savedRebounds =
        localStorage.getItem('rebounds');

    const savedAssists =
        localStorage.getItem('assists');


    if (savedPoints !== null) {

        document.querySelector('#points-stat').textContent =
            savedPoints;

        pointsInput.value =
            savedPoints;

    }


    if (
        savedFreeThrowsMade !== null &&
        savedFreeThrowsAttempts !== null
    ) {

        document.querySelector('#free-throws-stat').textContent =
            savedFreeThrowsMade +
            " / " +
            savedFreeThrowsAttempts;

        freeThrowsMadeInput.value =
            savedFreeThrowsMade;

        freeThrowsAttemptsInput.value =
            savedFreeThrowsAttempts;


        const percentage =
            Number(savedFreeThrowsAttempts) > 0
                ? (Number(savedFreeThrowsMade) /
                    Number(savedFreeThrowsAttempts)) * 100
                : 0;

        document.querySelector(
            '#free-throws-percentage'
        ).textContent =
            percentage.toFixed(1) + "%";

    }


    if (
        savedThreePointersMade !== null &&
        savedThreePointersAttempts !== null
    ) {

        document.querySelector('#three-pointers-stat').textContent =
            savedThreePointersMade +
            " / " +
            savedThreePointersAttempts;

        threePointersMadeInput.value =
            savedThreePointersMade;

        threePointersAttemptsInput.value =
            savedThreePointersAttempts;


        const percentage =
            Number(savedThreePointersAttempts) > 0
                ? (Number(savedThreePointersMade) /
                    Number(savedThreePointersAttempts)) * 100
                : 0;

        document.querySelector(
            '#three-pointers-percentage'
        ).textContent =
            percentage.toFixed(1) + "%";

    }


    if (savedRebounds !== null) {

        document.querySelector('#rebounds-stat').textContent =
            savedRebounds;

        reboundsInput.value =
            savedRebounds;

    }


    if (savedAssists !== null) {

        document.querySelector('#assists-stat').textContent =
            savedAssists;

        assistsInput.value =
            savedAssists;

    }

}


// ===============================
// START APP
// ===============================

loadOriginalExercises();

renderCustomExercises();

loadStats();

// ===============================
// GAME HISTORY
// ===============================

const opponentInput =
    document.querySelector('#opponent-input');

const gameDateInput =
    document.querySelector('#game-date-input');

const gamePointsInput =
    document.querySelector('#game-points-input');

const gameFtMadeInput =
    document.querySelector('#game-ft-made-input');

const gameFtAttemptsInput =
    document.querySelector('#game-ft-attempts-input');

const game3ptMadeInput =
    document.querySelector('#game-3pt-made-input');

const game3ptAttemptsInput =
    document.querySelector('#game-3pt-attempts-input');

const gameReboundsInput =
    document.querySelector('#game-rebounds-input');

const gameAssistsInput =
    document.querySelector('#game-assists-input');

const saveGameButton =
    document.querySelector('#save-game-button');

const gameHistoryList =
    document.querySelector('#game-history-list');


// Get saved games

function getGames() {

    const saved =
        localStorage.getItem('gameHistory');

    if (saved === null) {
        return [];
    }

    return JSON.parse(saved);
}


// Save a new game

saveGameButton.addEventListener('click', function() {

    const opponent =
        opponentInput.value.trim();

    const date =
        gameDateInput.value;

    const points =
        Number(gamePointsInput.value);

    const ftMade =
        Number(gameFtMadeInput.value);

    const ftAttempts =
        Number(gameFtAttemptsInput.value);

    const threeMade =
        Number(game3ptMadeInput.value);

    const threeAttempts =
        Number(game3ptAttemptsInput.value);

    const rebounds =
        Number(gameReboundsInput.value);

    const assists =
        Number(gameAssistsInput.value);


    // Basic validation

    if (opponent === "") {

        alert("Please enter the opponent.");

        return;
    }

    if (date === "") {

        alert("Please enter the game date.");

        return;
    }

    if (ftMade > ftAttempts) {

        alert(
            "Free throws made cannot be greater than attempts."
        );

        return;
    }

    if (threeMade > threeAttempts) {

        alert(
            "Three pointers made cannot be greater than attempts."
        );

        return;
    }


    // Get existing games

    const games = getGames();


    // Create new game

    games.push({

        opponent: opponent,

        date: date,

        points: points,

        ftMade: ftMade,

        ftAttempts: ftAttempts,

        threeMade: threeMade,

        threeAttempts: threeAttempts,

        rebounds: rebounds,

        assists: assists

    });


    // Save games

    localStorage.setItem(
        'gameHistory',
        JSON.stringify(games)
    );


    // Clear form

    opponentInput.value = "";
    gameDateInput.value = "";
    gamePointsInput.value = "";
    gameFtMadeInput.value = "";
    gameFtAttemptsInput.value = "";
    game3ptMadeInput.value = "";
    game3ptAttemptsInput.value = "";
    gameReboundsInput.value = "";
    gameAssistsInput.value = "";


    // Display games

    renderGames();

});

// ===============================
// DISPLAY GAME HISTORY
// ===============================

function renderGames() {

    gameHistoryList.innerHTML = "";

    const games = getGames();

    if (games.length === 0) {

        gameHistoryList.innerHTML =
            "<p>No games recorded yet.</p>";

        return;
    }


    // Show newest games first

    games.slice().reverse().forEach(function(game, reversedIndex) {

        const realIndex =
            games.length - 1 - reversedIndex;


        // Main game card

        const gameCard =
            document.createElement('div');

        gameCard.className = "game-card";


        // Title

        const title =
            document.createElement('h3');

        title.textContent =
            "🏀 vs " + game.opponent;

        gameCard.appendChild(title);


        // Date

        const date =
            document.createElement('p');

        date.textContent =
            "📅 " + game.date;

        gameCard.appendChild(date);


        // Stats

        const stats =
            document.createElement('div');

        stats.className = "game-stats";


        stats.innerHTML = `
            <p><strong>${game.points}</strong> PTS</p>

            <p><strong>${game.rebounds}</strong> REB</p>

            <p><strong>${game.assists}</strong> AST</p>

            <p><strong>${game.ftMade}/${game.ftAttempts}</strong> FT</p>

            <p><strong>${game.threeMade}/${game.threeAttempts}</strong> 3PT</p>
        `;


        gameCard.appendChild(stats);


        // Delete button

        const deleteButton =
            document.createElement('button');

        deleteButton.textContent =
            "Delete";

        deleteButton.type =
            "button";

        deleteButton.className =
            "delete-game-button";


        deleteButton.addEventListener(
            'click',
            function() {

                games.splice(realIndex, 1);

                localStorage.setItem(
                    'gameHistory',
                    JSON.stringify(games)
                );

                renderGames();

            }
        );


        gameCard.appendChild(deleteButton);


        // Add card to page

        gameHistoryList.appendChild(gameCard);

    });

}

renderGames();

// ===============================
// GAME AVERAGES
// ===============================

function updateGameAverages() {

    const games = getGames();

    const gamesPlayed =
        games.length;

    document.querySelector('#games-played').textContent =
        gamesPlayed;


    if (gamesPlayed === 0) {

        document.querySelector('#ppg-average').textContent = "0.0";
        document.querySelector('#rpg-average').textContent = "0.0";
        document.querySelector('#apg-average').textContent = "0.0";
        document.querySelector('#ft-average').textContent = "0.0%";
        document.querySelector('#three-average').textContent = "0.0%";

        return;
    }


    let totalPoints = 0;
    let totalRebounds = 0;
    let totalAssists = 0;

    let totalFtMade = 0;
    let totalFtAttempts = 0;

    let totalThreeMade = 0;
    let totalThreeAttempts = 0;


    games.forEach(function(game) {

        totalPoints += Number(game.points);

        totalRebounds += Number(game.rebounds);

        totalAssists += Number(game.assists);

        totalFtMade += Number(game.ftMade);

        totalFtAttempts += Number(game.ftAttempts);

        totalThreeMade += Number(game.threeMade);

        totalThreeAttempts += Number(game.threeAttempts);

    });


    // Per-game averages

    const ppg =
        totalPoints / gamesPlayed;

    const rpg =
        totalRebounds / gamesPlayed;

    const apg =
        totalAssists / gamesPlayed;


    // Shooting percentages

    const ftPercentage =
        totalFtAttempts > 0
            ? (totalFtMade / totalFtAttempts) * 100
            : 0;

    const threePercentage =
        totalThreeAttempts > 0
            ? (totalThreeMade / totalThreeAttempts) * 100
            : 0;


    // Display

    document.querySelector('#ppg-average').textContent =
        ppg.toFixed(1);

    document.querySelector('#rpg-average').textContent =
        rpg.toFixed(1);

    document.querySelector('#apg-average').textContent =
        apg.toFixed(1);

    document.querySelector('#ft-average').textContent =
        ftPercentage.toFixed(1) + "%";

    document.querySelector('#three-average').textContent =
        threePercentage.toFixed(1) + "%";

}


// Update averages whenever games are displayed

const originalRenderGames =
    renderGames;

renderGames = function() {

    originalRenderGames();

    updateGameAverages();

};


// Initial calculation

updateGameAverages();
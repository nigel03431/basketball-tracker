/* =========================
   PAGE NAVIGATION
========================= */

const pages = document.querySelectorAll(".page");
const navButtons = document.querySelectorAll(".nav-button");
const pageButtons = document.querySelectorAll("[data-page]");

function showPage(pageName) {

    pages.forEach(function(page) {

        page.classList.remove("active-page");

    });

    const selectedPage =
        document.querySelector("#" + pageName + "-page");

    if (selectedPage) {

        selectedPage.classList.add("active-page");

    }


    navButtons.forEach(function(button) {

        button.classList.remove("active");

        if (button.dataset.page === pageName) {

            button.classList.add("active");

        }

    });


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* Navigation buttons */

pageButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const pageName = button.dataset.page;

        showPage(pageName);

    });

});


/* =========================
   TRAINING
========================= */

const trainingInput =
    document.querySelector("#training-input");

const addButton =
    document.querySelector("#add-button");

const customTraining =
    document.querySelector("#custom-training");

const progress =
    document.querySelector("#progress");

const progressBar =
    document.querySelector("#progress-bar");


function updateProgress() {

    const checkboxes =
        document.querySelectorAll(
            '.training input[type="checkbox"]'
        );

    let completed = 0;

    checkboxes.forEach(function(box) {

        if (box.checked) {

            completed++;

        }

    });


    progress.textContent =
        completed +
        " / " +
        checkboxes.length +
        " completed";


    let percentage = 0;

    if (checkboxes.length > 0) {

        percentage =
            (completed / checkboxes.length) * 100;

    }


    progressBar.style.width =
        percentage + "%";

}


/* Get custom exercises */

function getCustomExercises() {

    const saved =
        localStorage.getItem("customExercises");

    if (saved === null) {

        return [];

    }

    return JSON.parse(saved);

}


/* Original exercises */

function setupOriginalCheckbox(checkbox) {

    checkbox.addEventListener(
        "change",
        function() {

            localStorage.setItem(
                "original-" + checkbox.id,
                checkbox.checked
            );

            updateProgress();

        }
    );

}


function loadOriginalExercises() {

    const originalCheckboxes =
        document.querySelectorAll(
            '.training input[type="checkbox"][id^="task"]'
        );


    originalCheckboxes.forEach(
        function(checkbox) {

            const saved =
                localStorage.getItem(
                    "original-" + checkbox.id
                );


            if (saved === "true") {

                checkbox.checked = true;

            }


            setupOriginalCheckbox(checkbox);

        }
    );

}


/* Custom exercises */

function renderCustomExercises() {

    customTraining.innerHTML = "";

    const customExercises =
        getCustomExercises();


    customExercises.forEach(
        function(exercise, index) {

            const label =
                document.createElement("label");


            const checkbox =
                document.createElement("input");

            checkbox.type = "checkbox";

            checkbox.checked =
                exercise.completed;


            const deleteButton =
                document.createElement("button");

            deleteButton.textContent =
                "Delete";

            deleteButton.type =
                "button";


            label.appendChild(checkbox);

            label.append(
                " " + exercise.name
            );

            label.appendChild(
                deleteButton
            );


            customTraining.appendChild(
                label
            );


            checkbox.addEventListener(
                "change",
                function() {

                    customExercises[index].completed =
                        checkbox.checked;


                    localStorage.setItem(
                        "customExercises",
                        JSON.stringify(customExercises)
                    );


                    updateProgress();

                }
            );


            deleteButton.addEventListener(
                "click",
                function() {

                    customExercises.splice(
                        index,
                        1
                    );


                    localStorage.setItem(
                        "customExercises",
                        JSON.stringify(customExercises)
                    );


                    renderCustomExercises();

                }
            );

        }
    );


    updateProgress();

}


/* Add exercise */

addButton.addEventListener(
    "click",
    function() {

        const exercise =
            trainingInput.value.trim();


        if (exercise === "") {

            return;

        }


        const customExercises =
            getCustomExercises();


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

    }
);


/* Enter key */

trainingInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addButton.click();

        }

    }
);


/* =========================
   SHOOTING CALCULATOR
========================= */

const makesInput =
    document.querySelector("#makes");

const attemptsInput =
    document.querySelector("#attempts");

const calculateButton =
    document.querySelector("#calculate-button");

const shootingResult =
    document.querySelector("#shooting-result");


calculateButton.addEventListener(
    "click",
    function() {

        const makes =
            Number(makesInput.value);

        const attempts =
            Number(attemptsInput.value);


        if (attempts <= 0) {

            shootingResult.textContent =
                "Please enter a valid number of attempts.";

            return;

        }


        if (makes < 0 || makes > attempts) {

            shootingResult.textContent =
                "Makes cannot be greater than attempts.";

            return;

        }


        const percentage =
            (makes / attempts) * 100;


        shootingResult.textContent =
            "Shooting percentage: " +
            percentage.toFixed(1) +
            "%";

    }
);


/* =========================
   MY STATS
========================= */

const saveStatsButton =
    document.querySelector("#save-stats-button");


const pointsInput =
    document.querySelector("#points-input");

const freeThrowsMadeInput =
    document.querySelector(
        "#free-throws-made-input"
    );

const freeThrowsAttemptsInput =
    document.querySelector(
        "#free-throws-attempts-input"
    );

const threePointersMadeInput =
    document.querySelector(
        "#three-pointers-made-input"
    );

const threePointersAttemptsInput =
    document.querySelector(
        "#three-pointers-attempts-input"
    );

const reboundsInput =
    document.querySelector("#rebounds-input");

const assistsInput =
    document.querySelector("#assists-input");


saveStatsButton.addEventListener(
    "click",
    function() {

        const points =
            Number(pointsInput.value) || 0;

        const ftMade =
            Number(freeThrowsMadeInput.value) || 0;

        const ftAttempts =
            Number(freeThrowsAttemptsInput.value) || 0;

        const threeMade =
            Number(threePointersMadeInput.value) || 0;

        const threeAttempts =
            Number(threePointersAttemptsInput.value) || 0;

        const rebounds =
            Number(reboundsInput.value) || 0;

        const assists =
            Number(assistsInput.value) || 0;


        document.querySelector(
            "#points-stat"
        ).textContent = points;


        document.querySelector(
            "#free-throws-stat"
        ).textContent =
            ftMade + " / " + ftAttempts;


        document.querySelector(
            "#three-pointers-stat"
        ).textContent =
            threeMade + " / " + threeAttempts;


        document.querySelector(
            "#rebounds-stat"
        ).textContent = rebounds;


        document.querySelector(
            "#assists-stat"
        ).textContent = assists;


        let ftPercentage = 0;

        if (ftAttempts > 0) {

            ftPercentage =
                (ftMade / ftAttempts) * 100;

        }


        let threePercentage = 0;

        if (threeAttempts > 0) {

            threePercentage =
                (threeMade / threeAttempts) * 100;

        }


        document.querySelector(
            "#free-throws-percentage"
        ).textContent =
            ftPercentage.toFixed(1) + "%";


        document.querySelector(
            "#three-pointers-percentage"
        ).textContent =
            threePercentage.toFixed(1) + "%";


        localStorage.setItem(
            "points",
            points
        );

        localStorage.setItem(
            "freeThrowsMade",
            ftMade
        );

        localStorage.setItem(
            "freeThrowsAttempts",
            ftAttempts
        );

        localStorage.setItem(
            "threePointersMade",
            threeMade
        );

        localStorage.setItem(
            "threePointersAttempts",
            threeAttempts
        );

        localStorage.setItem(
            "rebounds",
            rebounds
        );

        localStorage.setItem(
            "assists",
            assists
        );


        updateDashboard();

    }
);


/* =========================
   LOAD STATS
========================= */

function loadStats() {

    const points =
        localStorage.getItem("points");

    const ftMade =
        localStorage.getItem("freeThrowsMade");

    const ftAttempts =
        localStorage.getItem("freeThrowsAttempts");

    const threeMade =
        localStorage.getItem("threePointersMade");

    const threeAttempts =
        localStorage.getItem(
            "threePointersAttempts"
        );

    const rebounds =
        localStorage.getItem("rebounds");

    const assists =
        localStorage.getItem("assists");


    if (points !== null) {

        pointsInput.value = points;

        document.querySelector(
            "#points-stat"
        ).textContent = points;

    }


    if (
        ftMade !== null &&
        ftAttempts !== null
    ) {

        freeThrowsMadeInput.value =
            ftMade;

        freeThrowsAttemptsInput.value =
            ftAttempts;


        document.querySelector(
            "#free-throws-stat"
        ).textContent =
            ftMade + " / " + ftAttempts;


        const percentage =
            ftAttempts > 0
                ? (ftMade / ftAttempts) * 100
                : 0;


        document.querySelector(
            "#free-throws-percentage"
        ).textContent =
            percentage.toFixed(1) + "%";

    }


    if (
        threeMade !== null &&
        threeAttempts !== null
    ) {

        threePointersMadeInput.value =
            threeMade;

        threePointersAttemptsInput.value =
            threeAttempts;


        document.querySelector(
            "#three-pointers-stat"
        ).textContent =
            threeMade +
            " / " +
            threeAttempts;


        const percentage =
            threeAttempts > 0
                ? (threeMade / threeAttempts) * 100
                : 0;


        document.querySelector(
            "#three-pointers-percentage"
        ).textContent =
            percentage.toFixed(1) + "%";

    }


    if (rebounds !== null) {

        reboundsInput.value =
            rebounds;

        document.querySelector(
            "#rebounds-stat"
        ).textContent =
            rebounds;

    }


    if (assists !== null) {

        assistsInput.value =
            assists;

        document.querySelector(
            "#assists-stat"
        ).textContent =
            assists;

    }

}


/* =========================
   DASHBOARD
========================= */

function updateDashboard() {

    const games =
        JSON.parse(
            localStorage.getItem(
                "gameHistory"
            ) || "[]"
        );


    const ppg =
        games.length > 0
            ? games.reduce(
                (sum, game) =>
                    sum + Number(game.points || 0),
                0
            ) / games.length
            : 0;


    const rpg =
        games.length > 0
            ? games.reduce(
                (sum, game) =>
                    sum + Number(game.rebounds || 0),
                0
            ) / games.length
            : 0;


    const apg =
        games.length > 0
            ? games.reduce(
                (sum, game) =>
                    sum + Number(game.assists || 0),
                0
            ) / games.length
            : 0;


    let ftMade = 0;
    let ftAttempts = 0;

    let threeMade = 0;
    let threeAttempts = 0;


    games.forEach(function(game) {

        ftMade += Number(
            game.ftMade || 0
        );

        ftAttempts += Number(
            game.ftAttempts || 0
        );


        threeMade += Number(
            game.threeMade || 0
        );

        threeAttempts += Number(
            game.threeAttempts || 0
        );

    });


    const ftPercentage =
        ftAttempts > 0
            ? (ftMade / ftAttempts) * 100
            : 0;


    const threePercentage =
        threeAttempts > 0
            ? (threeMade / threeAttempts) * 100
            : 0;


    document.querySelector(
        "#dashboard-ppg"
    ).textContent =
        ppg.toFixed(1);


    document.querySelector(
        "#dashboard-rpg"
    ).textContent =
        rpg.toFixed(1);


    document.querySelector(
        "#dashboard-apg"
    ).textContent =
        apg.toFixed(1);


    document.querySelector(
        "#dashboard-ft"
    ).textContent =
        ftPercentage.toFixed(1) + "%";


    document.querySelector(
        "#dashboard-3pt"
    ).textContent =
        threePercentage.toFixed(1) + "%";


    document.querySelector(
        "#dashboard-games"
    ).textContent =
        games.length;


    const recentGame =
        document.querySelector(
            "#dashboard-recent-game"
        );


    if (games.length === 0) {

        recentGame.innerHTML =
            "<p>No games recorded yet.</p>";

        return;

    }


    const game =
        games[games.length - 1];


    recentGame.innerHTML = `

        <div class="game-card">

            <h3>
                🏀 vs ${game.opponent}
            </h3>

            <p>
                📅 ${game.date}
            </p>

            <p>
                <strong>
                    ${game.points} PTS
                </strong>
                &nbsp;
                ${game.rebounds} REB
                &nbsp;
                ${game.assists} AST
            </p>

            <p>
                ${game.ftMade}/${game.ftAttempts} FT
                &nbsp;
                ${game.threeMade}/${game.threeAttempts} 3PT
            </p>

        </div>

    `;

}


/* =========================
   START APP
========================= */

loadOriginalExercises();

renderCustomExercises();

loadStats();

updateDashboard();

showPage("home");

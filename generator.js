var TOO_MUCH_SYNERGY = 100;
var SQUARES_PER_ROW = 5;
var DEFAULT_MINIMUM_SYNERGY = -3;
var DEFAULT_MAXIMUM_SYNERGY = 7;
var DEFAULT_MAXIMUM_SPILL = 2;
var DEFAULT_MAXIMUM_OFFSET = 2;
var BASELINE_TIME = 28.25;
var TIME_PER_DIFFICULTY = 0.75;
Array.prototype.sortNumerically = function() {
    return this.sort(function(a, b) {
        return a - b;
    });
    spe
};
Array.prototype.shuffled = function() {
    var toShuffle = this.slice();
    for (var i = 0; i < toShuffle.length; i++) {
        var randElement = Math.floor(Math.random() * (i + 1));
        var temp = toShuffle[i];
        toShuffle[i] = toShuffle[randElement];
        toShuffle[randElement] = temp;
    }
    return toShuffle;
};

function hasDuplicateStrings(array) {
    var seen = {};
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (el in seen) {
            return true;
        }
        seen[el] = true;
    }
    return false;
};
var INDICES_PER_ROW = {
    "row1": [1, 2, 3, 4, 5],
    "row2": [6, 7, 8, 9, 10],
    "row3": [11, 12, 13, 14, 15],
    "row4": [16, 17, 18, 19, 20],
    "row5": [21, 22, 23, 24, 25],
    "col1": [1, 6, 11, 16, 21],
    "col2": [2, 7, 12, 17, 22],
    "col3": [3, 8, 13, 18, 23],
    "col4": [4, 9, 14, 19, 24],
    "col5": [5, 10, 15, 20, 25],
    "tlbr": [1, 7, 13, 19, 25],
    "bltr": [5, 9, 13, 17, 21]
};

function invertObject(obj) {
    var ret = {};
    Object.keys(obj).forEach(function(key) {
        obj[key].forEach(function(item) {
            if (!ret[item]) ret[item] = [];
            ret[item].push(key);
        });
    });
    return ret;
}
var ROWS_PER_INDEX = invertObject(INDICES_PER_ROW);
var BingoGenerator = function(bingoList, options) {
    if (!options) {
        options = {};
    }
    this.goalsByDifficulty = bingoList;
    this.rowtypeTimeSave = bingoList.rowtypes;
    this.goalsList = [];
    for (var i = 1; i <= 25; i++) {
        this.goalsList = this.goalsList.concat(bingoList[i]);
    }
    this.goalsList.sort(function(a, b) {
        var timeDiff = a.time - b.time;
        if (timeDiff !== 0) {
            return timeDiff;
        }
        return a.id.localeCompare(b.id);
    });
    this.goalsByName = {};
    for (var i = 0; i < this.goalsList.length; i++) {
        var goal = this.goalsList[i];
        this.goalsByName[goal.name] = goal;
    }
    this.language = options.lang || 'name';
    this.mode = options.mode || 'normal';
    this.seed = options.seed || Math.ceil(999999 * Math.random()).toString();
    this.minimumSynergy = options.minimumSynergy || DEFAULT_MINIMUM_SYNERGY;
    this.maximumSynergy = options.maximumSynergy || DEFAULT_MAXIMUM_SYNERGY;
    this.maximumSpill = options.maximumSpill || DEFAULT_MAXIMUM_SPILL;
    this.maximumOffset = options.maximumOffset || DEFAULT_MAXIMUM_OFFSET;
    Math.seedrandom(this.seed);
};
BingoGenerator.prototype.makeCard = function() {
    this.bingoBoard = this.generateMagicSquare();
    var populationOrder = this.generatePopulationOrder();
    for (var i = 1; i <= 25; i++) {
        var nextPosition = populationOrder[i];
        var result = this.chooseGoalForPosition(nextPosition);
        if (result.goal) {
            this.bingoBoard[nextPosition].types = result.goal.types;
            this.bingoBoard[nextPosition].subtypes = result.goal.subtypes;
            this.bingoBoard[nextPosition].rowtypes = result.goal.rowtypes;
            this.bingoBoard[nextPosition].name = result.goal[this.language] || result.goal.name;
            this.bingoBoard[nextPosition].id = result.goal.id;
            this.bingoBoard[nextPosition].time = result.goal.time;
            this.bingoBoard[nextPosition].goal = result.goal;
            this.bingoBoard[nextPosition].synergy = result.synergy;
        } else {
            return false;
        }
    }
    return this.bingoBoard;
};
BingoGenerator.prototype.generateMagicSquare = function() {
    var magicSquare = [];
    for (var i = 1; i <= 25; i++) {
        var difficulty = this.difficfulty(i);
        magicSquare[i] = {
            difficulty: difficulty,
            desiredTime: difficulty * TIME_PER_DIFFICULTY
        };
    }
    return magicSquare;
};
BingoGenerator.prototype.chooseGoalForPosition = function(position) {
    var desiredDifficulty = this.bingoBoard[position].difficulty;
    var desiredTime = desiredDifficulty * TIME_PER_DIFFICULTY;
    for (var offset = 1; offset <= this.maximumOffset; offset++) {
        var minTime = desiredTime - offset;
        var maxTime = desiredTime + offset;
        var goalsAtTime = this.getGoalsInTimeRange(minTime, maxTime);
        goalsAtTime = goalsAtTime.shuffled();
        for (var j = 0; j < goalsAtTime.length; j++) {
            var goal = goalsAtTime[j];
            var synergies = this.checkLine(position, goal);
            if (this.maximumSynergy >= synergies.maxSynergy && synergies.minSynergy >= this.minimumSynergy) {
                return {
                    goal: goal,
                    synergy: synergies.maxSynergy
                };
            }
        }
    }
    return false;
};
BingoGenerator.prototype.generatePopulationOrder = function() {
    var populationOrder = [];
    populationOrder[1] = 13;
    var diagonals = [1, 7, 19, 25, 5, 9, 17, 21].shuffled();
    populationOrder = populationOrder.concat(diagonals);
    var nondiagonals = [2, 3, 4, 6, 8, 10, 11, 12, 14, 15, 16, 18, 20, 22, 23, 24].shuffled();
    populationOrder = populationOrder.concat(nondiagonals);
    for (var k = 23; k <= 25; k++) {
        var currentSquare = this.getDifficultyIndex(k);
        if (currentSquare === 0) continue;
        for (var i = 1; i < 25; i++) {
            if (populationOrder[i] == currentSquare) {
                populationOrder.splice(i, 1);
                break;
            }
        }
        populationOrder.splice(1, 0, currentSquare);
    }
    return populationOrder;
};
BingoGenerator.prototype.difficulty = function(i) {
    var Num3 = this.seed % 1000;
    var Rem8 = Num3 % 8;
    var Rem4 = Math.floor(Rem8 / 2);
    var Rem2 = Rem8 % 2;
    var Rem5 = Num3 % 5;
    var Rem3 = Num3 % 3;
    var RemT = Math.floor(Num3 / 120);
    var Table5 = [0];
    Table5.splice(Rem2, 0, 1);
    Table5.splice(Rem3, 0, 2);
    Table5.splice(Rem4, 0, 3);
    Table5.splice(Rem5, 0, 4);
    Num3 = Math.floor(this.seed / 1000);
    Num3 = Num3 % 1000;
    Rem8 = Num3 % 8;
    Rem4 = Math.floor(Rem8 / 2);
    Rem2 = Rem8 % 2;
    Rem5 = Num3 % 5;
    Rem3 = Num3 % 3;
    RemT = RemT * 8 + Math.floor(Num3 / 120);
    var Table1 = [0];
    Table1.splice(Rem2, 0, 1);
    Table1.splice(Rem3, 0, 2);
    Table1.splice(Rem4, 0, 3);
    Table1.splice(Rem5, 0, 4);
    i--;
    RemT = RemT % 5;
    x = (i + RemT) % 5;
    y = Math.floor(i / 5);
    var e5 = Table5[(x + 3 * y) % 5];
    var e1 = Table1[(3 * x + y) % 5];
    value = 5 * e5 + e1;
    if (this.mode == "short") {
        value = Math.floor(value / 2);
    } else if (this.mode == "long") {
        value = Math.floor((value + 25) / 2);
    }
    value++;
    return value;
};
BingoGenerator.prototype.getShuffledGoals = function(difficulty) {
    return this.goalsByDifficulty[difficulty].shuffled();
};
BingoGenerator.prototype.getDifficultyIndex = function(difficulty) {
    for (var i = 1; i <= 25; i++) {
        if (this.bingoBoard[i].difficulty == difficulty) {
            return i;
        }
    }
    return 0;
};
BingoGenerator.prototype.getGoalsInTimeRange = function(minTime, maxTime) {
    return this.goalsList.filter(function(goal) {
        return minTime <= goal.time && goal.time <= maxTime;
    });
};
BingoGenerator.prototype.getOtherSquares = function(row, position) {
    var rowIndices = INDICES_PER_ROW[row].filter(function(index) {
        return index != position;
    });
    var board = this;
    return rowIndices.map(function(index) {
        return board.bingoBoard[index];
    });
};
BingoGenerator.prototype.checkLine = function(position, potentialGoal) {
    var rows = ROWS_PER_INDEX[position];
    var maxSynergy = 0;
    var minSynergy = TOO_MUCH_SYNERGY;
    for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
        var row = rows[rowIndex];
        var potentialSquare = JSON.parse(JSON.stringify(potentialGoal));
        potentialSquare.desiredTime = this.bingoBoard[position].desiredTime;
        var potentialRow = this.getOtherSquares(row, position);
        potentialRow.push(potentialSquare);
        var effectiveRowSynergy = this.evaluateSquares(potentialRow);
        maxSynergy = Math.max(maxSynergy, effectiveRowSynergy);
        minSynergy = Math.min(minSynergy, effectiveRowSynergy);
    }
    return {
        minSynergy: minSynergy,
        maxSynergy: maxSynergy
    };
};
BingoGenerator.prototype.evaluateRow = function(row) {
    return this.evaluateSquares(this.getOtherSquares(row));
};
BingoGenerator.prototype.getEffectiveTypeSynergiesForRow = function(row) {
    var synergiesForSquares = this.calculateSynergiesForSquares(this.getOtherSquares(row));
    var effectiveTypeSynergies = this.calculateEffectiveTypeSynergies(this.calculateCombinedTypeSynergies(synergiesForSquares));
    var rowtypeSynergies = this.filterRowtypeSynergies(synergiesForSquares);
    return [effectiveTypeSynergies, rowtypeSynergies];
};
BingoGenerator.prototype.evaluateSquares = function(squares) {
    var ids = squares.map(function(el) {
        return el.id;
    }).filter(function(el) {
        return el;
    });
    if (hasDuplicateStrings(ids)) {
        return TOO_MUCH_SYNERGY;
    }
    var synergiesForSquares = this.calculateSynergiesForSquares(squares);
    return this.calculateEffectiveSynergyForSquares(synergiesForSquares);
};
BingoGenerator.prototype.calculateSynergiesForSquares = function(squares) {
    var typeSynergies = {};
    var subtypeSynergies = {};
    var rowtypeSynergies = {};
    var timeDifferences = [];
    for (var m = 0; m < squares.length; m++) {
        var square = squares[m];
        this.mergeTypeSynergies(typeSynergies, square.types);
        this.mergeTypeSynergies(subtypeSynergies, square.subtypes);
        this.mergeTypeSynergies(rowtypeSynergies, square.rowtypes);
        if (square.time !== undefined) {
            timeDifferences.push(square.desiredTime - square.time);
        }
    }
    return {
        typeSynergies: typeSynergies,
        subtypeSynergies: subtypeSynergies,
        rowtypeSynergies: rowtypeSynergies,
        goals: squares,
        timeDifferences: timeDifferences
    };
};
BingoGenerator.prototype.mergeTypeSynergies = function(typeSynergies, newTypeSynergies) {
    for (var type in newTypeSynergies) {
        if (!typeSynergies[type]) {
            typeSynergies[type] = [];
        }
        typeSynergies[type].push(newTypeSynergies[type]);
    }
};
BingoGenerator.prototype.calculateCombinedTypeSynergies = function(synergiesForSquares) {
    var typeSynergies = synergiesForSquares.typeSynergies;
    var subtypeSynergies = synergiesForSquares.subtypeSynergies;
    var combinedTypeSynergies = {};
    for (var type in typeSynergies) {
        if (type in subtypeSynergies) {
            combinedTypeSynergies[type] = typeSynergies[type].concat(subtypeSynergies[type]);
        } else {
            combinedTypeSynergies[type] = typeSynergies[type];
        }
    }
    return combinedTypeSynergies;
};
BingoGenerator.prototype.filterRowtypeSynergies = function(synergiesForSquares) {
    var rowtypeSynergies = {};
    for (var rowtype in synergiesForSquares.rowtypeSynergies) {
        var rowtypeSynergy = synergiesForSquares.rowtypeSynergies[rowtype];
        if (rowtypeSynergy.length < SQUARES_PER_ROW) {
            continue;
        }
        var rowtypeCost = 0;
        for (var i = 0; i < rowtypeSynergy.length; i++) {
            rowtypeCost += rowtypeSynergy[i];
        }
        if (this.rowtypeTimeSave[rowtype] > rowtypeCost) {
            rowtypeSynergies[rowtype] = this.rowtypeTimeSave[rowtype] - rowtypeCost;
        }
    }
    return rowtypeSynergies;
};
BingoGenerator.prototype.calculateEffectiveTypeSynergies = function(typeSynergies) {
    var effectiveTypeSynergies = {};
    for (var type in typeSynergies) {
        var synergies = typeSynergies[type];
        synergies.sortNumerically();
        var effectiveSynergies = synergies.slice(0, synergies.length - 1);
        if (effectiveSynergies.length > 0) {
            effectiveTypeSynergies[type] = effectiveSynergies;
        }
    }
    return effectiveTypeSynergies;
};
BingoGenerator.prototype.calculateEffectiveSynergyForSquares = function(synergiesForSquares) {
    var MAX_INDIVIDUAL_SYNERGY = 4.5;
    var typeSynergies = this.calculateCombinedTypeSynergies(synergiesForSquares);
    var rowtypeSynergies = this.filterRowtypeSynergies(synergiesForSquares);
    var effectiveTypeSynergies = this.calculateEffectiveTypeSynergies(typeSynergies);
    var rowSynergy = 0;
    for (var type in effectiveTypeSynergies) {
        var synergies = effectiveTypeSynergies[type];
        for (var i = 0; i < synergies.length; i++) {
            if (synergies[i] > MAX_INDIVIDUAL_SYNERGY) {
                return TOO_MUCH_SYNERGY;
            }
            rowSynergy += synergies[i];
        }
    }
    for (var rowtype in rowtypeSynergies) {
        rowSynergy += rowtypeSynergies[rowtype];
    }
    var timeDifferences = synergiesForSquares.timeDifferences;
    for (var i = 0; i < timeDifferences.length; i++) {
        var timeDifference = timeDifferences[i];
        rowSynergy += timeDifference;
    }
    return rowSynergy;
};
ootBingoGenerator = function(bingoList, opts) {
    var bingoGenerator = new BingoGenerator(bingoList, opts);
    var card = false;
    var iterations = 0;
    while (!card && iterations < 10) {
        card = bingoGenerator.makeCard();
        iterations++;
    }
    card["meta"] = {
        iterations: iterations
    };
    return card;
};

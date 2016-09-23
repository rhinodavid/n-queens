/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



findNRooksSolution = function(n) {
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'rook');

  buildOneBoard(blankBoard, n, solutions);

  var solution = solutions[0].matrix;
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

countNRooksSolutions = function(n) {
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'rook');

  buildBoards(blankBoard, n, solutions);

  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

findNQueensSolution = function(n) {
  var solutions = [];
  if (n === 0 || n === 2 || n === 3) {
    return makeEmptyMatrix(n);
  }
  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'queen');

  buildOneBoard(blankBoard, n, solutions);

  var solution = solutions[0].matrix;
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

countNQueensSolutions = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'queen');

  buildBoards(blankBoard, n, solutions);

  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var buildBoards = function(liteBoard, n, solutions) {
  if (liteBoard.pieces === n) {
    solutions.push(liteBoard);
  } else {
    var childBoards = liteBoard.generateValidChildBoards();
    childBoards.forEach(function(childBoard) {
      buildBoards(childBoard, n, solutions);
    });
  }
};

var buildOneBoard = function(liteBoard, n, solutions) {
  if (solutions.length > 0) {
    return;
  } else if (liteBoard.pieces === n) {
    solutions.push(liteBoard);
    return;
  } else {
    var childBoards = liteBoard.generateValidChildBoards();
    childBoards.forEach(function(childBoard) {
      buildOneBoard(childBoard, n, solutions);
    });
  }
};


//////////////////////// ASYNC ///////////////////////////////////

countNQueensSolutionsAsync = function(n, cb) {
  // start timer
  var timeStart = Date.now();

  // create the worker
  var numWorker = new Worker('src/NumCountWorker.js');
  // send the worker its job
  numWorker.postMessage({n:n, countFunctionName:'countNQueensSolutions'});

  numWorker.onmessage = function(e) {
    var numSolutions = e.data;
    var error = null;
    var timeEnd = Date.now();
    cb(error, ('Number of solutions for ' + n + ' queens:' + numSolutions + ' worker finished in ' + (timeEnd - timeStart) + 'ms'), timeEnd, n);
  };
};

countNRooksSolutionsAsync = function(n, cb) {
  // start timer
  var timeStart = Date.now();

  // create the worker
  var numWorker = new Worker('src/NumCountWorker.js');
  // send the worker its job
  numWorker.postMessage({n:n, countFunctionName:'countNRooksSolutions'});

  numWorker.onmessage = function(e) {
    var numSolutions = e.data;
    var error = null;
    var timeEnd = Date.now();
    cb(error, ('Number of solutions for ' + n + ' rooks:' + numSolutions + ' worker finished in ' + (timeEnd - timeStart) + 'ms'), timeEnd, n);
  };
};

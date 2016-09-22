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



window.findNRooksSolution = function(n) {
  // make container for solved boards
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'rook');

  var buildOneBoard = function(liteBoard, n) {
    if (solutions.length > 0) {
      return;
    } else if (liteBoard.pieces === n) {
      solutions.push(liteBoard);
      return;
    } else {
      var childBoards = liteBoard.generateValidChildBoards();
      childBoards.forEach(function(childBoard) {
        buildOneBoard(childBoard, n);
      });
    }
  };

  buildOneBoard(blankBoard, n);

  var solution = solutions[0].matrix;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // make container for solved boards
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'rook');

  var buildBoards = function(liteBoard, n) {
    if (liteBoard.pieces === n) {
      solutions.push(liteBoard);
    } else {
      var childBoards = liteBoard.generateValidChildBoards();
      childBoards.forEach(function(childBoard) {
        buildBoards(childBoard, n);
      });
    }
  };

  buildBoards(blankBoard, n);

  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // make container for solved boards
  var solutions = [];
  if (n === 0 || n === 2 || n === 3) {
    return makeEmptyMatrix(n);
  }
  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'queen');

  var buildOneBoard = function(liteBoard, n) {
    if (solutions.length > 0) {
      return;
    } else if (liteBoard.pieces === n) {
      solutions.push(liteBoard);
      return;
    } else {
      var childBoards = liteBoard.generateValidChildBoards();
      childBoards.forEach(function(childBoard) {
        buildOneBoard(childBoard, n);
      });
    }
  };

  buildOneBoard(blankBoard, n);
  var solution = solutions[0].matrix;

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};







// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  if (n === 2 || n === 3) {
    return 0;
  }
  if (n === 0) {
    return 1;
  }
  // make container for solved boards
  var solutions = [];

  var blankBoard = new LiteBoard(makeEmptyMatrix(n), 'queen');

  var buildBoards = function(liteBoard, n) {
    if (liteBoard.pieces === n) {
      solutions.push(liteBoard);
    } else {
      var childBoards = liteBoard.generateValidChildBoards();
      childBoards.forEach(function(childBoard) {
        buildBoards(childBoard, n);
      });
    }
  };

  buildBoards(blankBoard, n);

  var solutionCount = solutions.length;
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

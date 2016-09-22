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

  var solution = new Board(solutions[0].matrix);
  console.log('Num found: ', solutions.length);

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

  var solution = new Board(solutions[0].matrix);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};







// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
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

var buildSolutions = function(matrix, solutions, conflictsFunctionName) {
  // build our solutions -> input is blank nxn board
    // if board is solved (i.e. has n pieces on it AND has no conflicts
  var board = new Board(matrix);
  var hasConflicts = board[conflictsFunctionName]();
  if (hasConflicts) {
    return;
  } 
  if (!hasConflicts && board.numberOfPieces() === board.get('n')) {
    // found a solution
    solutions.push(board);
    return;
  }
  var futureBoardCombos = buildFutureBoardCombos(matrix);
  futureBoardCombos.forEach(function(futureBoard) {
    buildSolutions(futureBoard, solutions, conflictsFunctionName);
  });
};








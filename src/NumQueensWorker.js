var countNQueensSolutions = function(n) {
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
  //console.log('Number of solutions for ' + n + ' queens:', solutionCount);
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

var LiteBoard = function LiteBoard(matrix, pieceType, pieces, prevVI, availableVI) {
  this.matrix = matrix;
  this.n = matrix[0].length;
  this.pieces = pieces || 0;
  this.prevVI = prevVI === undefined ? -1 : prevVI;
  this.availableVI = availableVI || range(this.n * this.n);
  this.pieceType = pieceType;
};

LiteBoard.prototype.viToRowColumn = function(vi) {
  return [Math.floor(vi / this.n), vi % this.n];
};

LiteBoard.prototype.rowColumnToVI = function(row, col) {
  vi = row * this.n + col;
};

LiteBoard.prototype.addPieceAt = function(vi) {
  if (this.availableVI.indexOf(vi) === -1) {
    return null;
  }
  var rowCol = this.viToRowColumn(vi);
  var result = this.matrix.map(function(x) {
    return x.slice();
  });
  result[rowCol[0]][rowCol[1]] = 1;
  var newAvailableVI = this.availableVI.filter(function(oldVI) {
    var oldRowCol = this.viToRowColumn(oldVI);
    if (oldRowCol[0] === rowCol[0] || oldRowCol[1] === rowCol[1]) {
      return false;
    }
    //if is queen
    if (this.pieceType === 'queen' && (Math.abs(oldRowCol[0] - rowCol[0]) === Math.abs(oldRowCol[1] - rowCol[1]))) {
      return false;
    }
    return true;
  }.bind(this));

  return new LiteBoard(result, this.pieceType, this.pieces + 1, vi, newAvailableVI);
};

LiteBoard.prototype.generateValidChildBoards = function() {
  var validBoards = [];

  for (var i = 0; i < this.availableVI.length; i++) {
    if (Math.floor(this.availableVI[i]/this.n) - Math.floor(this.prevVI/this.n) === 1) {
      validBoards.push(this.addPieceAt(this.availableVI[i]));
    }
  }

  return validBoards;
};

var makeEmptyMatrix = function(n) {
  return (range(n)).map(function() {
    return (range(n)).map(function() {
      return 0;
    });
  });
};

var range = function range(n) {
  var result = [];
  for (var i = 0; i < n; i++) {
    result.push(i);
  }
  return result;
};

Array.prototype.map = function(cb) {
  var result = [];
  this.forEach(function(x) {
    result.push(cb(x));
  });
  return result;
};

onmessage = function(e) {
  var numSolutions = countNQueensSolutions(e.data);
  postMessage(numSolutions);
};
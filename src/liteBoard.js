var LiteBoard = function LiteBoard(matrix, pieceType, pieces, prevVI, availableVI) {
  this.matrix = matrix;
  this.n = matrix.length;
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
    if (Math.floor(this.availableVI[i] / this.n) - Math.floor(this.prevVI / this.n) === 1) {
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
var LiteBoard = function LiteBoard(matrix, pieceType, pieces, prevVI, availableVI) {
  this.matrix = matrix;
  this.n = matrix[0].length;
  this.pieces = pieces || 0;
  this.prevVI = prevVI || -1;
  this.availableVI = availableVI || _.range(n * n);
  this.pieceType = pieceType;
};

LiteBoard.prototype.viToRowColumn = function(vi) {
  return [Math.floor(vi / this.n), vi % n];
};

LiteBoard.prototype.rowColumnToVI = function(row, col) {
  vi = row * n + col;
};

LiteBoard.prototype.addPieceAt = function(vi) {
  if (availableVI.indexOf(vi) !== -1) {
    return null;
  }
  var rowCol = this.viToRowColumn(vi);
  var result = this.matrix.slice();
  result[rowCol[0]][rowCol[1]] = 1;
  var newAvailableVI = availableVI.filter(function(oldVI) {
    var oldRowCol = this.viToRowColumn(oldVI);
    if (oldVI[0] === rowCol[0] || oldVI[1] === rowCol[1]) {
      return false;
    }
    //if is queen
    if (this.pieceType === 'queen' && (Math.abs(oldVI[0] - rowCol[0]) === Math.abs(oldVI[1] - rowCol[1]))) {
      return false;
    }
    return true;
  });

  return new LiteBoard(result, this.pieceType, this.pieces + 1, vi, newAvailableVI);
};

LiteBoard.prototype.generateValidChildBoards = function() {
  var validBoards = [];

  for (var i = 0; i < availableVI.length; i++) {
    if (availableVI[i] > prevVI) {
      validBoards.push(this.addPieceAt(availableVI[i]));
    }
  }

  return validBoards;
};
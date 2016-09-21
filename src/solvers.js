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

  // build our solutions -> input is blank nxn board
    // if board is solved (i.e. has n pieces on it AND has no conflicts
      // push to solutions
      // return
    // if board has conflicts
      // return
    // otherwise
      // use buildFutureBoard combos to get a list of all the future boards
      // recurse with each of those future boards.


  // grab the first one out of the container to be our solution


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var buildFutureBoardCombos = function(board) {
  // input: board, [row, col] of last piece on the board
  // output: an array of boards that has a new piece placed
  //          at each spot possible after last piece

  // flatten matrix ===> vector
  var vector = _.flatten(board);
  // search from the end until we find the 1 closest to the end ===> vectorIndex
  var vectorIndex = -1;
  for (var i = vector.length - 1; i >= 0; i--) {
    if (vector[i] === 1 && vectorIndex === -1) {
      vectorIndex = i;
    }
  }
  // make container for future boards
  var futureBoards = [];
  // for each index from vectorIndex+1 to end
  for (var k = vectorIndex + 1; k < vector.length; k++) {
    var vectorCopy = vector.slice();
    // splice in 1
    vectorCopy[k] = 1;
    // add to container for future boards
    futureBoards.push(vectorCopy);
  }
  // return the map the container using reshape and n
  return futureBoards.map(reshape);
};












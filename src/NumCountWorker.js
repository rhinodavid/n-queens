importScripts('liteBoard.js');
importScripts('solvers.js');

onmessage = function(e) {
  postMessage(this[e.data.countFunctionName](e.data.n));
};
'use strict';
angular.module('app',[]).controller('BoggleController', function($scope) {

$scope.board = [];

function generate() {
$scope.board = Array(4).fill(0).map(function () {
  return Array(4).fill(0).map(function () {
    return String.fromCharCode(Math.floor(97 + Math.random() * 25));
  });
});
}

$scope.generate = generate;

$scope.generate();

function solve(board, dict) {
  var ans = {};
  for (var i = 0; i < board.length; ++i) {
    var _loop = function _loop(j) {
      var stack = [{
        x: j,
        y: i,
        val: board[i][j],
        par: undefined,
        pre: dict[board[i][j]]
      }];
      var me = void 0;
      while (me = stack.pop()) {
        if (!me.pre) {
          continue;
        }
        if (me.pre['!']) {
          ans[solution(me)] = true;
        }
        var neighs = getAllNeighbors(me, board);
        neighs.map(function (neighbor) {
          return stack.push(neighbor);
        });
      }
    };

    for (var j = 0; j < board[i].length; ++j) {
      _loop(j);
    }
  }
  return Object.keys(ans);
}

$scope.solve = function() { $scope.solutions = solve($scope.board, DICT) };

function getAllNeighbors(elem, board) {
  var res = [];
  for (var i = elem.y - 1; i <= elem.y + 1; ++i) {
    for (var j = elem.x - 1; j <= elem.x + 1; ++j) {
      if (
      // don't try out-of-bounds neighbors
      i < 0 || i >= board.length || j < 0 || j >= board[i].length ||
      // don't repush ourselves to the stack
      i === elem.y && j === elem.x ||
      // don't add anything to the stack not on the trie
      !elem.pre[board[i][j]] || onPath(elem, j, i)) {
        continue;
      }
      res.push({
        x: j,
        y: i,
        val: board[i][j],
        par: elem,
        pre: elem.pre[board[i][j]]
      });
    }
  }
  return res;
}

function solution(elem) {
  var str = [elem.val];
  var next = elem;
  while (next = next.par) {
    str.unshift(next.val);
  }
  var ret = str.join('');
  return ret;
}

function onPath(elem, x, y) {
  var next = elem;
  if (!next) {
    return false;
  }
  while (next = next.par) {
    if (next.x === x && next.y === y) {
      return true;
    }
  }
  return false;
}

});

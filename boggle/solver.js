const DICT = require('./web.json');

const BOARD = Array(4).fill(0).map(
  () => Array(4).fill(0).map(
    () => String.fromCharCode(
      Math.floor(97 + (Math.random()*25))
    )
))

console.log(BOARD)

function solve(board, dict) {
 const ans = {}
for(let i = 0; i < board.length; ++i) {
  for(let j = 0; j < board[i].length; ++j) {
    const stack = [{
      x: j,
      y: i,
      val: board[i][j],
      par: undefined,
      pre: dict[board[i][j]]
    }];
    let me;
    while(me = stack.pop()) {
      if(!me.pre) { continue; }
      if(me.pre['!']) { ans[solution(me)] = true; }
      const neighs = getAllNeighbors(me, board);
      neighs
        .map(neighbor => stack.push(neighbor));
    }
  }
}
 return Object.keys(ans);
}

function getAllNeighbors(elem, board) {
  const res = []
  for(let i = elem.y-1; i <= elem.y+1; ++i) {
    for(let j = elem.x-1; j <= elem.x+1; ++j) {
      if(
        // don't try out-of-bounds neighbors
        (i < 0) || (i >= board.length) ||
        (j < 0) || (j >= board[i].length) || 
        // don't repush ourselves to the stack
        (i === elem.y && j === elem.x) ||
        // don't add anything to the stack not on the trie
        !elem.pre[board[i][j]] ||
        onPath(elem,j,i)
        ) { continue; }
      res.push({
        x: j,
        y: i,
        val: board[i][j],
        par: elem,
        pre: elem.pre[board[i][j]]
      })
    }
  }
  return res;
}

function solution(elem) {
  let str = [elem.val];
  let next = elem;
  while(next = next.par) {
    str.unshift(next.val);
  }
  const ret = str.join('');
  return ret
}

function onPath(elem, x, y) {
  let next = elem;
  if(!next) { return false; }
  while(next = next.par) {
    if(next.x === x && next.y === y) {
      return true;
    }
  }
  return false;
}

console.log(solve(BOARD,DICT))

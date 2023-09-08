function _inBoardBounds(pos) {
  return !(pos[0] < 0 || pos[1] < 0 || pos[0] > 8 || pos[1] > 8);
}

function _applyMoveDelta(pos, move) {
  let res = [];
  res[0] = pos[0] + move[0];
  res[1] = pos[1] + move[1];
  return res;
}

function _getAllLegalMoves(pos, moveDeltas) {
  const legalMoves = [];
  for (let move of moveDeltas) {
    let endPos = _applyMoveDelta(pos, move);
    if (_inBoardBounds(endPos)) {
      legalMoves.push(endPos);
    }
  }
  return legalMoves;
}

function _targetInMoves(legalMoves, targetPos) {
  return legalMoves.some(
    (move) => move[0] === targetPos[0] && move[1] === targetPos[1]
  );
}

function knightMoves(currentPos, targetPos) {
  const moveDeltas = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  if (!_inBoardBounds(currentPos) || !_inBoardBounds(targetPos)) {
    return `Target or start position isn't within board bounds!`;
  }

  const visited = new Set();
  const queue = [[currentPos]];
  visited.add(currentPos);

  while (queue.length > 0) {
    const path = queue.shift();
    const lastPosition = path[path.length - 1];

    if (
      _targetInMoves(_getAllLegalMoves(lastPosition, moveDeltas), targetPos)
    ) {
      path.push(targetPos);
      return path;
    }

    for (const move of moveDeltas) {
      const newPos = _applyMoveDelta(lastPosition, move);
      if (_inBoardBounds(newPos) && !visited.has(newPos)) {
        visited.add(newPos);
        const newPath = [...path, newPos];
        queue.push(newPath);
      }
    }
  }

  return `No valid path found.`;
}

const startPos = [0, 3];
const targetPos = [8, 8];

console.log(knightMoves(startPos, targetPos));

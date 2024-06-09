import { Board, Difficulty, WorkerMessage, WorkerMessageType } from './models';
import { createBoard, solveBoard } from './service';

self.onmessage = (e) => {
  const message = e.data as WorkerMessage;

  switch (message.type) {
    case WorkerMessageType.CREATE_NEW:
      const newBoard = createBoard(message.difficulty as Difficulty);
      postMessage({
        ...message,
        board: newBoard,
      } as WorkerMessage);
      break;
    case WorkerMessageType.SOLVE:
      const solvedBoard = solveBoard(message.board as Board);
      postMessage({
        ...message,
        board: solvedBoard,
      } as WorkerMessage);
      break;
  }
};

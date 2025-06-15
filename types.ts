
export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export enum Player {
  Player1 = "Oyuncu 1",
  Player2 = "Oyuncu 2",
}

export enum GameState {
  StartScreen,
  Playing,
  RoundOver,
  GameOver,
}

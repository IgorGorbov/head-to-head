declare interface Player {
  key: string;
  name: string;
}

declare interface HeadToHead {
  key: string;
  title: string;
  playerA: string;
  playerB: string;
  playerAWinCount: number;
  playerBWinCount: number;
  drawsCount: number;
  showAllGames: boolean;
}

declare interface Game {
  key: string;
  headToHeadKey: string;
  homeTeamKey: string;
  awayTeamKey: string;
  homeTeamName: string;
  awayTeamName: string;
  homeTeamGoals: number;
  awayTeamGoals: number;
  date: string;
  winnerKey: string;
}

declare interface IViewStore {
  authed: boolean;
  isLoading: boolean;
  user: any;
  errorMessage: string;
  players: Player[];
  firebaseCheckAuth: () => void;
  loadError: (err: string) => void;
  addPlayer: (playerName: string) => void;
  updatePlayer: (key: string, name: string) => void;
  deletePlayer: (key: string) => void;
  deleteAllPlayers: () => void;
}

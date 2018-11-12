declare interface IViewStore {
  authed: boolean;
  isLoading: boolean;
  user: any;
  errorMessage: string;
  firebaseCheckAuth: () => void;
  loadError: (err: string) => void
}
import { observable } from 'mobx';
import { firebaseAuth } from '../utils/firebase';

class ViewStore implements IViewStore {
  authed: boolean = false;
  isLoading: boolean = false;
  user: any = null;
  @observable errorMessage: string = '';

  firebaseCheckAuth = () => {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        this.authed = true;
        this.isLoading = false;
        this.user = user;
      } else {
        this.authed = false;
        this.isLoading = false;
        this.user = null;
      }
    });
  };

  loadError = err => {
    this.errorMessage = err;
  };
}

export default ViewStore;

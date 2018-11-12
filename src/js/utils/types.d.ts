declare interface IFirebaseAuth {
  app : firebase.app.App ;
  applyActionCode (code : string ) : firebase.Promise < any > ;
  checkActionCode (code : string ) : firebase.Promise < any > ;
  confirmPasswordReset (code : string , newPassword : string ) : firebase.Promise < any > ;
  createUserWithEmailAndPassword (email : string , password : string ) : firebase.Promise < any > ;
  currentUser : firebase.User | null ;
  fetchProvidersForEmail (email : string ) : firebase.Promise < any > ;
  getRedirectResult ( ) : firebase.Promise < any > ;
  onAuthStateChanged (nextOrObserver : firebase.Observer < any , any > | ( (a : firebase.User | null ) => any ) , error ? : (a : firebase.auth.Error ) => any , completed ? : firebase.Unsubscribe ) : firebase.Unsubscribe ;
  onIdTokenChanged (nextOrObserver : firebase.Observer < any , any > | ( (a : firebase.User | null ) => any ) , error ? : (a : firebase.auth.Error ) => any , completed ? : firebase.Unsubscribe ) : firebase.Unsubscribe ;
  sendPasswordResetEmail (email : string ) : firebase.Promise < any > ;
  setPersistence (persistence : firebase.auth.Auth.Persistence ) : firebase.Promise < any > ;
  signInAndRetrieveDataWithCredential (credential : firebase.auth.AuthCredential ) : firebase.Promise < any > ;
  signInAnonymously ( ) : firebase.Promise < any > ;
  signInWithCredential (credential : firebase.auth.AuthCredential ) : firebase.Promise < any > ;
  signInWithCustomToken (token : string ) : firebase.Promise < any > ;
  signInWithEmailAndPassword (email : string , password : string ) : firebase.Promise < any > ;
  signInWithPhoneNumber (phoneNumber : string , applicationVerifier : firebase.auth.ApplicationVerifier ) : firebase.Promise < any > ;
  signInWithPopup (provider : firebase.auth.AuthProvider ) : firebase.Promise < any > ;
  signInWithRedirect (provider : firebase.auth.AuthProvider ) : firebase.Promise < any > ;
  signOut ( ) : firebase.Promise < any > ;
  verifyPasswordResetCode (code : string ) : firebase.Promise < any > ;
}

declare interface IFirebaseRef extends firebase.database.Query {
  child (path : string ) : firebase.database.Reference ;
  key : string | null ;
  onDisconnect ( ) : firebase.database.OnDisconnect ;
  parent : firebase.database.Reference | null ;
  path : string ;
  push (value ? : any , onComplete ? : (a : Error | null ) => any ) : firebase.database.ThenableReference ;
  remove (onComplete ? : (a : Error | null ) => any ) : firebase.Promise < any > ;
  root : firebase.database.Reference ;
  set (value : any , onComplete ? : (a : Error | null ) => any ) : firebase.Promise < any > ;
  setPriority (priority : string | number | null , onComplete : (a : Error | null ) => any ) : firebase.Promise < any > ;
  setWithPriority (newVal : any , newPriority : string | number | null , onComplete ? : (a : Error | null ) => any ) : firebase.Promise < any > ;
  transaction (transactionUpdate : (a : any ) => any , onComplete ? : (a : Error | null , b : boolean , c : firebase.database.DataSnapshot | null ) => any , applyLocally ? : boolean ) : firebase.Promise < any > ;
  update (values : Object , onComplete ? : (a : Error | null ) => any ) : firebase.Promise < any > ;
}
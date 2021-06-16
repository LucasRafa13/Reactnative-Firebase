import firebase from 'firebase';
//import GoogleServices from './google-services.json'

class Fire {
    get uid() {
        return (firebase.auth().currentUser || {}).uid;
      }// 2.
      get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
      }
      
      // 3.
      send = messages => {
        for (let i = 0; i < messages.length; i++) {
          const { text, user } = messages[i];    // 4.
          const message = {
            text,
            user,
            timestamp: this.timestamp,
          };
          this.append(message);
        }
      };// 5.
      append = message => this.ref.push(message)
    constructor() {
        this.init();    // 1.
        this.observeAuth();
    }  // 2.
    observeAuth = (email, password) =>
        firebase.auth().signInWithEmailAndPassword(email, password);  // 3.
    onAuthStateChanged = user => {
        if (!user) {
            try {
                // 4.
                firebase.auth().useDeviceLanguage();
            } catch ({ message }) {
                alert(message);
            }
        }
    };
    get ref() {
        return firebase.database().ref(`messages/${this.uid}`);
    }// 2.
    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));// 3.
    parse = snapshot => {
        // 1.
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;  // 2.
        const timestamp = new Date(numberStamp);  // 3.
        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    }// 4.
    off() {
        this.ref.off();
    }  // 2.
    init = () =>
        firebase.initializeApp({
            apiKey: 'AIzaSyAg0iptgPg2OqLLqRya4KFiDGoIGLc2nE0',
            authDomain: 'chatfirebase-13403.appspot.com',
            databaseURL: 'https://chatter-b85d7.firebaseio.com',
            projectId: 'chatfirebase-13403.appspot.com',
            storageBucket: 'chatfirebase-13403.appspot.com',
            messagingSenderId: '42309279167',
        });
}
Fire.shared = new Fire()
export default Fire;
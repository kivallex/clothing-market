import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyBxDKVcl2W5xnkyk_YSlYRhWJQ1wjKHJy4',
	authDomain: 'crwn-db-3bb04.firebaseapp.com',
	databaseURL: 'https://crwn-db-3bb04.firebaseio.com',
	projectId: 'crwn-db-3bb04',
	storageBucket: 'crwn-db-3bb04.appspot.com',
	messagingSenderId: '375800403347',
	appId: '1:375800403347:web:e0ae95237cfc6d0bad8466',
	measurementId: 'G-2DHR4J9HX9',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
	if (!userAuth) return;

	const userRef = firestore.doc(`users/${userAuth.uid}`);

	const snapShot = await userRef.get();

	if (!snapShot.exists) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData,
			});
		} catch (error) {
			console.log('error creating user', error.message);
		}
	}

	return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

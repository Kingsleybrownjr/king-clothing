import { initializeApp } from 'firebase/app';
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDimrAngFIwe99P8IdYWr_ySi2CCy1fkL0',
	authDomain: 'king-clothing-db-20610.firebaseapp.com',
	projectId: 'king-clothing-db-20610',
	storageBucket: 'king-clothing-db-20610.appspot.com',
	messagingSenderId: '983184802510',
	appId: '1:983184802510:web:e0f4f22d7629f27e48869f',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
	prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
	signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
	signInWithRedirect(auth, googleProvider);

// Initialize Firestore DB
export const db = getFirestore();

// Create user and add to firebase store db
export const createUserDocumentFromAuth = async (
	userAuth,
	additionalInformation
) => {
	if (!userAuth) return;

	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapshot = await getDoc(userDocRef);
	// If user data doesn't exists
	// Create / set the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (e) {
			console.log('error creating the user', e.message);
		}
	}
	// If user data does exist, return user
	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;

	return await createUserWithEmailAndPassword(auth, email, password);
};

import * as admin from "firebase-admin";
import { config } from "firebase-functions";

admin.initializeApp(config().firebase);

export default admin.firestore();

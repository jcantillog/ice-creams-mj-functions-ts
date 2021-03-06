import * as functions from "firebase-functions";
// The Firebase Admin SDK to access the Firebase Realtime Database / Cloud Firestore.
import * as admin from "firebase-admin";
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Cloud Firestore database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // 
  const docRef = db.doc('messages/:pushId');
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  const snapshot = await docRef.set({ original });
  // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
  res.send(`Message ${original} added to Cloud Firestore database! `);
});

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
/* exports.makeUppercase = functions.database
  .ref("/messages/{pushId}/original")
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log("Uppercasing", context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child("uppercase").set(uppercase);
  }); */


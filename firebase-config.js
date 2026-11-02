/**
 * ==========================================================================
 * Google Firebase Configuration & Real-Time Cloud Database Setup
 * Khoula Islamic Institute (khoulainstituteofquranicstudies.com)
 * ==========================================================================
 * 
 * TAREEQA (INSTRUCTIONS):
 * 1. console.firebase.google.com par jayen aur project banayein.
 * 2. Web App (</>) add karein aur wahan se milne wali keys neeche paste karein.
 * 3. Firestore Database enable karein.
 * 4. Jaise hi aap keys paste karenge, website ka tamam data (Free Trials,
 *    Shop Orders, Contact messages) foran Firebase Cloud par save hone lagega!
 */

// Yahan apni Firebase Console se mili hui keys paste karein:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Global Firebase Database Reference
window.firebaseDB = null;
window.isFirebaseConnected = false;

try {
  // Check if user has replaced placeholder keys
  if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY_HERE" && typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    window.firebaseDB = firebase.firestore();
    window.isFirebaseConnected = true;
    console.log("✅ Google Firebase Cloud Firestore successfully connected to Khoula Islamic Institute!");
  } else {
    console.info("ℹ️ Firebase is in Offline/Demo mode. Paste your Firebase keys in firebase-config.js to sync with Google Cloud.");
  }
} catch (error) {
  console.warn("Firebase initialization notice:", error.message);
}

/**
 * Helper function: Save Free Trial Booking to Firebase
 */
window.saveBookingToFirebase = function(bookingData) {
  return new Promise((resolve, reject) => {
    if (window.firebaseDB) {
      window.firebaseDB.collection("trial_bookings").doc(bookingData.id).set({
        ...bookingData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("🔥 Successfully saved trial booking to Google Firebase Cloud:", bookingData.id);
        resolve(true);
      })
      .catch((err) => {
        console.error("Firebase booking save error:", err);
        reject(err);
      });
    } else {
      resolve(false); // Saved in localStorage fallback
    }
  });
};

/**
 * Helper function: Save Shop Order to Firebase
 */
window.saveOrderToFirebase = function(orderData) {
  return new Promise((resolve, reject) => {
    if (window.firebaseDB) {
      window.firebaseDB.collection("shop_orders").doc(orderData.id).set({
        ...orderData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("🔥 Successfully saved shop order to Google Firebase Cloud:", orderData.id);
        resolve(true);
      })
      .catch((err) => {
        console.error("Firebase order save error:", err);
        reject(err);
      });
    } else {
      resolve(false);
    }
  });
};

/**
 * Helper function: Save Contact Inquiry to Firebase
 */
window.saveInquiryToFirebase = function(inquiryData) {
  return new Promise((resolve, reject) => {
    if (window.firebaseDB) {
      window.firebaseDB.collection("contact_inquiries").add({
        ...inquiryData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("🔥 Successfully saved contact inquiry to Google Firebase Cloud, ID:", docRef.id);
        resolve(docRef.id);
      })
      .catch((err) => {
        console.error("Firebase inquiry save error:", err);
        reject(err);
      });
    } else {
      resolve(false);
    }
  });
};

/**
 * Helper function: Save Daily Student Sabaq Progress to Firebase
 */
window.saveSabaqProgressToFirebase = function(sabaqData) {
  return new Promise((resolve, reject) => {
    if (window.firebaseDB) {
      window.firebaseDB.collection("student_progress").add({
        ...sabaqData,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        console.log("🔥 Successfully logged Sabaq to Google Firebase Cloud!");
        resolve(true);
      })
      .catch((err) => {
        console.error("Firebase Sabaq save error:", err);
        reject(err);
      });
    } else {
      resolve(false);
    }
  });
};

/**
 * ==========================================================================
 * Google Firebase Configuration & Unified Database Services
 * Khoula Islamic Institute (khoulainstituteofquranicstudies.com)
 * ==========================================================================
 */

const firebaseConfig = {
  apiKey: "AIzaSyA6NdDpp1UmNLC5eFkYAtrStjAjWFLrLjs",
  authDomain: "khoula-islamic-institute.firebaseapp.com",
  projectId: "khoula-islamic-institute",
  storageBucket: "khoula-islamic-institute.firebasestorage.app",
  messagingSenderId: "771674251214",
  appId: "1:771674251214:web:ab6da261e857a380e5959f"
};

// Global Firebase References
window.firebaseDB = null;
window.firebaseAuth = null;
window.isFirebaseConnected = false;

try {
  if (firebaseConfig.apiKey && typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.firebaseDB = firebase.firestore();
    if (firebase.auth) {
      window.firebaseAuth = firebase.auth();
    }
    window.isFirebaseConnected = true;
    console.log("✅ Google Firebase Cloud Firestore successfully initialized!");
  }
} catch (error) {
  console.warn("Firebase initialization notice:", error.message);
}

// ==========================================
// UNIFIED FIRESTORE HELPERS & CRUD SERVICE
// ==========================================
window.KII_DB = {
  // Collection Names
  COLLECTIONS: {
    TRIALS: "trial_bookings",
    STUDENTS: "students",
    TEACHERS: "teachers",
    COURSES: "courses",
    CLASSES: "classes",
    ATTENDANCE: "attendance",
    PAYMENTS: "payments",
    INVOICES: "invoices",
    PROGRESS: "student_progress",
    ORDERS: "shop_orders",
    PRODUCTS: "products",
    INQUIRIES: "contact_inquiries",
    TESTIMONIALS: "testimonials",
    CMS: "website_content",
    NOTIFICATIONS: "notifications",
    ADMIN_USERS: "admin_users",
    LOGS: "activity_logs"
  },

  // Generic Get All Documents
  async getAll(collectionName, orderByField = "createdAt", orderDirection = "desc") {
    if (window.firebaseDB) {
      try {
        let query = window.firebaseDB.collection(collectionName);
        if (orderByField) {
          try {
            query = query.orderBy(orderByField, orderDirection);
          } catch(e) {
            console.warn("Index sort fallback for", collectionName);
          }
        }
        const snapshot = await query.get();
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        return docs;
      } catch (err) {
        console.error(`Error reading ${collectionName}:`, err);
        return this.getLocal(collectionName);
      }
    }
    return this.getLocal(collectionName);
  },

  // Realtime Listener
  onCollectionChange(collectionName, callback) {
    if (window.firebaseDB) {
      return window.firebaseDB.collection(collectionName).onSnapshot(snapshot => {
        const docs = [];
        snapshot.forEach(doc => {
          docs.push({ id: doc.id, ...doc.data() });
        });
        callback(docs);
      }, err => {
        console.error(`Listener error on ${collectionName}:`, err);
        callback(this.getLocal(collectionName));
      });
    }
    callback(this.getLocal(collectionName));
    return () => {};
  },

  // Save / Update with custom ID or auto ID
  async setDoc(collectionName, docId, data) {
    const payload = {
      ...data,
      updatedAt: firebase?.firestore?.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString()
    };
    if (window.firebaseDB) {
      if (docId) {
        await window.firebaseDB.collection(collectionName).doc(docId).set(payload, { merge: true });
        this.logActivity(`Saved ${collectionName} item`, collectionName, docId);
        return docId;
      } else {
        payload.createdAt = firebase?.firestore?.FieldValue ? firebase.firestore.FieldValue.serverTimestamp() : new Date().toISOString();
        const ref = await window.firebaseDB.collection(collectionName).add(payload);
        this.logActivity(`Created ${collectionName} item`, collectionName, ref.id);
        return ref.id;
      }
    }
    // Local fallback
    return this.saveLocal(collectionName, docId, payload);
  },

  // Delete Document
  async deleteDoc(collectionName, docId) {
    if (window.firebaseDB) {
      await window.firebaseDB.collection(collectionName).doc(docId).delete();
      this.logActivity(`Deleted ${collectionName} item`, collectionName, docId);
      return true;
    }
    return this.deleteLocal(collectionName, docId);
  },

  // Audit Activity Logger
  async logActivity(action, module, recordId = "") {
    try {
      const log = {
        action,
        module,
        recordId,
        adminUser: localStorage.getItem("khoula_admin_email") || "admin@khoula.org",
        timestamp: new Date().toISOString()
      };
      if (window.firebaseDB) {
        await window.firebaseDB.collection(this.COLLECTIONS.LOGS).add({
          ...log,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
      }
    } catch (e) {
      console.warn("Audit log notice:", e);
    }
  },

  // LocalStorage Helpers for smooth offline/fallback experience
  getLocal(collectionName) {
    const raw = localStorage.getItem(`kii_local_${collectionName}`);
    return raw ? JSON.parse(raw) : [];
  },

  saveLocal(collectionName, docId, data) {
    const list = this.getLocal(collectionName);
    const id = docId || `LOCAL-${Date.now()}`;
    const idx = list.findIndex(item => item.id === id);
    const item = { id, ...data };
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(`kii_local_${collectionName}`, JSON.stringify(list));
    return id;
  },

  deleteLocal(collectionName, docId) {
    let list = this.getLocal(collectionName);
    list = list.filter(item => item.id !== docId);
    localStorage.setItem(`kii_local_${collectionName}`, JSON.stringify(list));
    return true;
  }
};

// Backward-compatible global bindings for existing website forms
window.saveBookingToFirebase = function(bookingData) {
  return window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.TRIALS, bookingData.id, bookingData);
};

window.saveOrderToFirebase = function(orderData) {
  return window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.ORDERS, orderData.id, orderData);
};

window.saveInquiryToFirebase = function(inquiryData) {
  return window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.INQUIRIES, null, inquiryData);
};

window.saveSabaqProgressToFirebase = function(sabaqData) {
  return window.KII_DB.setDoc(window.KII_DB.COLLECTIONS.PROGRESS, null, sabaqData);
};

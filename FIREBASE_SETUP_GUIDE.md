# Google Firebase Complete Setup & Integration Guide
## Khoula Islamic Institute (`khoulainstituteofquranicstudies.com`)
**Apni Website ko Google Firebase se Link karne aur Real-time Data Save karne ka Tafseeli Tareeqa**

---

## 🌟 Google Firebase Kya Hai aur Ye Kaise Kaam Karta Hai?

Google Firebase Google ka ek taqatwar cloud platform hai jo aapki website ko:
1. **Cloud Firestore Database** deta hai (jahan website par aane wale Free Trial bookings, Islamic Store orders, aur Contact messages hamesha ke liye real-time save hote hain).
2. **Google Firebase Hosting** deta hai (jahan aapki website Google ke fast servers par bilkul muft live chal sakti hai with Green Padlock `https://` SSL).
3. **100% Free Tier**: Google har mahine 50,000 reads aur 20,000 writes bilkul muft deta hai jo kisi bhi academy ke shuruati hazaron students ke liye kafi hai.

Maine aapki website ke andar **`firebase-config.js`** file pehle se bana kar connect kar di hai. Aapko sirf **Firebase Console** se apni 6 keys copy karke paste karni hain!

---

## 📋 Step-by-Step Tafseeli Tareeqa (5 Aasan Steps)

---

### Step 1: Firebase Console par Project Banayein

1. Browser mein **[https://console.firebase.google.com/](https://console.firebase.google.com/)** open karein.
2. Apne kisi bhi Gmail / Google account se sign-in karein.
3. Screen par **"+ Add Project"** (Create a project) par click karein.
4. **Project name** likhein: `khoula-islamic-institute` (ya apni pasand ka koi bhi naam).
5. "Continue" par click karein. Google Analytics ko enable rehne dein ya disable kar dein, phir **"Create Project"** dabayein.
6. 10 seconds mein project tayyar ho jayega. **"Continue"** par click karein.

---

### Step 2: Web App Add karein aur Config Keys Hasil karein

1. Project khulte hi dashboard par aapko icons nazar aayenge (iOS, Android, Web `</>`, Unity).
2. Web icon **`</>`** par click karein.
3. **App nickname** likhein: `Khoula Web`
4. *"Also set up Firebase Hosting"* ke checkbox ko tick kar sakti hain (optional), phir **"Register app"** par click karein.
5. Ab screen par aapko ek code box nazar aayega jismein **`const firebaseConfig = { ... }`** likha hoga.
   
   Ye kuch is tarah dikhta hai:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyD-ExampleKey123456789",
     authDomain: "khoula-islamic-institute.firebaseapp.com",
     projectId: "khoula-islamic-institute",
     storageBucket: "khoula-islamic-institute.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef123456"
   };
   ```
6. Is configuration code ko copy kar lein.

---

### Step 3: Keys ko Apni Website ki `firebase-config.js` File mein Paste karein

1. Apne computer par ye file open karein (Notepad ya VS Code mein):
   📁 **`C:\Users\INDUS\Desktop\khoula-islamic-institute\firebase-config.js`**
2. File ke shuru mein jo placeholder keys hain:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY_HERE",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     ...
   };
   ```
3. Wahan apni Firebase Console se copy ki hui asli keys paste kar dein.
4. File ko **Save (Ctrl + S)** kar dein!

---

### Step 4: Cloud Firestore Database Enable karein (Jahan Data Jama hoga)

1. Wapis Firebase Console par jayen.
2. Left side menu mein **Build** par click karein, aur phir **"Firestore Database"** chunein.
3. **"Create database"** ke button par click karein.
4. **Database location**: Default hi rehne dein (maslan `nam5 (us-central)`).
5. **Security rules**:
   * Yahan **"Start in test mode"** select karein (taake website se aane wali koi bhi inquiry bina login ke database mein save ho sake).
   * *"Test mode"* agle 30 din ke liye database ko open rakhta hai testing ke liye.
6. **"Enable"** par click karein.
7. Aapka real-time Cloud Database active ho chuka hai! 🎉

---

### Step 5: Test karein aur Google Cloud par Live Data Dekhein!

1. Apni website **`index.html`** ko browser mein open karein.
2. Homepage par **"Book a 3-Day Free Trial Class"** wala form fill karein:
   * Student Name: `Ali Raza`
   * Phone: `+92 300 1234567`
   * Email: `ali@example.com`
   * Course: *Quran Reading & Nazra with Tajweed*
   * Form submit karein.
3. Ab apne browser mein wapis **Firebase Console > Firestore Database** open karein.
4. Aap dekhenge ke wahan khud-ba-khud ek nayi collection ban chuki hai:
   * 📂 **`trial_bookings`**: Is ke andar Ali Raza ka mukammal data, time, phone number, aur course name Google Cloud par mehfooz ho chuka hai!
5. Jab koi Islamic Store se item order karega to wo:
   * 📂 **`shop_orders`** collection mein save hoga!
6. Jab koi Contact Us page se message bhejega to wo:
   * 📂 **`contact_inquiries`** collection mein save hoga!

---

## 🔒 Security Rules (Production ke liye)

Jab aapki website fully live ho jaye to Firebase Console mein **Firestore Database > Rules** tab par jakar ye rules paste kar dein taake koi bahar se data delete na kar sake:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kisi bhi visitor ko nayi booking ya order create karne ki ijazat dein
    match /trial_bookings/{docId} {
      allow create: if true;
      allow read, update, delete: if false; // Sirf aap Console se dekh sakti hain
    }
    match /shop_orders/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /contact_inquiries/{docId} {
      allow create: if true;
      allow read, update, delete: if false;
    }
    match /student_progress/{docId} {
      allow create, read: if true;
    }
  }
}
```

---

## 🚀 Website ko Firebase Hosting par Free Live Karna (Optional)

Agar aap chahti hain ke website GitHub ke bajaye seedha Google ke servers par live ho jaye:

1. Terminal / PowerShell khol kar chalayein:
   ```powershell
   npm install -g firebase-tools
   ```
2. Google account se login karein:
   ```powershell
   firebase login
   ```
3. Apne folder mein jayen aur hosting initialize karein:
   ```powershell
   cd "C:\Users\INDUS\Desktop\khoula-islamic-institute"
   firebase init hosting
   ```
   *(Options mein: select existing project -> select `khoula-islamic-institute` -> public directory: press Enter for current directory -> single-page app: No)*
4. Live publish karein:
   ```powershell
   firebase deploy
   ```
5. Google aapko foran ek live website link de dega:
   **`https://khoula-islamic-institute.web.app`**
   Jo 24/7 internet par free chalegi!

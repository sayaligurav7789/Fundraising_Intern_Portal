# 💼 Fundraising Intern Portal - FundNest

A modern React-based basic fundraising intern portal that allows users to log in using Firebase Authentication and view referral details fetched from Firebase Firestore. This project demonstrates frontend authentication, real-time data reading, and clean UI practices.

## 🚀 Live Demo

🔗 [Visit the Live Site](https://fundnest-internhub.netlify.app/)  

---

## 📸 Features

- 🔐 **Firebase Authentication** (Email/Password)
- 📡 **Firebase Firestore** for data storage
- 👤 Displays:
  - User Name
  - Referral Code
  - Amount Raised
- ⚡ Built with **React + Vite**
- 🎨 Styled using **Tailwind CSS**
- 🌍 Deployable via Netlify, GitHub Pages

---

## 🧰 Tech Stack

| Tech        | Purpose                        |
|-------------|--------------------------------|
| React       | Frontend Framework             |
| Vite        | Fast Development Environment   |
| Firebase    | Auth + Firestore DB            |
| TailwindCSS | UI Styling                     |

---

## 📁 Folder Structure

```

project/
│
├── public/
├── src/
│   ├── components/
│   ├── firebase/
│   │   └── firebaseConfig.js
│   ├── App.jsx
│   └── main.jsx
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md

````

---

## 🔧 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/intern-portal.git
cd intern-portal
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Setup

* Go to [Firebase Console](https://console.firebase.google.com/)
* Create a new project
* Enable:

  * 🔐 **Authentication** (Email/Password)
  * 🔥 **Firestore Database**

#### 👇 Sample Firestore Data Structure

Collection: `users`
Document: `uid-of-user`

```json
{
  "name": "Sayali Gurav",
  "referralCode": "REF2025",
  "amountRaised": "₹12,000"
}
```

### 4. Add Firebase Config

In `src/firebaseConfig.js`, paste your Firebase credentials:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
```

---

## 🧪 Running the Project

```bash
npm run dev
```

Open your browser at `http://localhost:5173/` to see the app.

---

## 🔐 Firebase Firestore Rules

These rules are for testing/demo purposes only.

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

---

## 🌍 Deployment Options

* **Frontend:** Netlify / Vercel / GitHub Pages
* **Firebase Project:** Used for authentication and Firestore backend
* No backend server or Express.js required

---

## 📷 Screenshots

## 📸 Application Screenshots

### 🔐 Sign In Page  
<img width="1901" height="917" alt="Sign In" src="https://github.com/user-attachments/assets/cc932977-6534-4c67-b072-3f8d208537c9" />

---

### 📝 Sign Up Page  
<img height="914" alt="Sign Up" src="https://github.com/user-attachments/assets/512658db-2c3e-40e0-aa89-d17a704606e6" />

---

### 🏠 Home Page  
<img width="1877" height="909" alt="Home 1" src="https://github.com/user-attachments/assets/6297ecd6-11c8-407f-a876-aa116110bbc0" />  
<img width="1879" height="910" alt="Home 2" src="https://github.com/user-attachments/assets/7b7df262-ba92-4cb1-9fac-3c179e68c1b5" />

---

### 📊 Dashboard  
<img width="1880" height="917" alt="Dashboard 1" src="https://github.com/user-attachments/assets/194f52b0-a334-4e2c-bdca-2fb238ab0371" />  
<img width="1875" height="915" alt="Dashboard 2" src="https://github.com/user-attachments/assets/9e4724f1-43e3-4238-92c7-c7cb3a066b4c" />

---

### 🏆 Rewards  
<img width="1895" height="908" alt="Rewards" src="https://github.com/user-attachments/assets/2d4234d9-8a28-4010-a65b-7fb0f3f5e7a4" />

---

### 🙋‍♀️ Profile Check  
<img width="690" height="388" alt="Profile" src="https://github.com/user-attachments/assets/ee174343-fdbc-4d7f-9ddf-fc3efb9648cf" />

---

## 📜 License

Licensed under the [MIT License](LICENSE)

---

## 🤝 Contributions

Feel free to open issues or submit pull requests for suggestions or improvements.

---

```

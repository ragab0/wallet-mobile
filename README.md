<div align="center">
  <h1>💳 Wallet Mobile App</h1>
  <p>
    <strong>A modern, cross-platform mobile application for personal finance management</strong>
  </p>
  <p>
    <a href="#-features">Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-api-integration">API Integration</a>
  </p>
  
  [![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
  [![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)](https://react-query.tanstack.com/)
  [![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=redux&logoColor=white)](https://github.com/pmndrs/zustand)
  [![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)](https://react-hook-form.com/)
  [![Axios](https://img.shields.io/badge/Axios-671ddf?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
  [![Yup](https://img.shields.io/badge/Yup-red?style=for-the-badge&logo=expo&logoColor=white)](https://docs.yup.io/)

</div>

## ✨ Features

### 🔐 Authentication

- Secure JWT-based authentication
- Email verification flow
- Social login (Google, Apple)
- Secure token storage
- Token refresh mechanism

### 💰 Transaction Management

- Add, view, and manage transactions
- Categorize income and expenses
- Transaction history with filters

### 👥 User Management

- User profile management
- Password reset functionality
- Role-based access control

### ⚙️ App Settings & Preferences

- Multiple theme support
- Notification settings
- Contact support via email/phone
- Report bugs directly from the app
- Rate the app

### 🎨 Modern UI/UX

- Clean, intuitive interface
- Multiple theme support with smooth transitions
- Responsive design for all devices
- Accessibility features
- Smooth animations and transitions

## 🛠️ Tech Stack

| Category        | Technologies                   |
| --------------- | ------------------------------ |
| **Framework**   | React Native, Expo             |
| **Language**    | TypeScript                     |
| **State**       | React Query, Zustand           |
| **Forms**       | React Hook Form, Yup           |
| **HTTP Client** | Axios                          |
| **Storage**     | Expo SecureStore, AsyncStorage |
| **Icons**       | Ionicons                       |

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Android Emulator / iOS Simulator / Expo Go

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ragab0/wallet-mobile.git
   cd wallet-mobile
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:

   ```env
   EXPO_PUBLIC_API_URL=your_api_url_here
   ```

4. **Start the development server**

   ```bash
   npx expo start
   ```

5. **Run on your device**
   - Scan the QR code with your phone's camera (iOS) or Expo Go app (Android)
   - Or use an emulator/simulator

## 🏗️ Project Structure

```
wallet-mobile/
├── app/                    # Main app navigation and screens
│   ├── (auth)/             # Authentication flow
│   ├── (tabs)/             # Main app tabs
│   └── _layout.tsx         # Root navigation layout
├── assets/                 # Static assets
│   ├── fonts/              # Custom fonts
│   ├── images/             # App images
│   └── styles/             # Global styles
├── components/             # Reusable components
├── constants/              # App constants
├── hooks/                  # Custom hooks
├── services/               # API services
├── configs/                # App configurations
│   ├── apiClient.ts        # API client configuration
│   ├── queryClient.ts      # Query client configuration
├── types/                  # TypeScript types
├── utils/                  # Utility functions
└── validations/            # Yup validation schemas
```

## 🌐 API Integration

The app integrates with a RESTful API built with NestJS. Key integration points include:

- **Authentication**: JWT-based auth with refresh tokens
- **Transactions**: CRUD operations with real-time updates
- **User Profile**: Manage user information and preferences

---

<!-- screens section (title with mobile icon) -->

## 📸 Screens

![image](/assets/images/screens/signup.webp)
![image](/assets/images/screens/login.webp)
![image](/assets/images/screens/loginFailed.webp)
![image](/assets/images/screens/send.webp)
![image](/assets/images/screens/verify.webp)

---

Made with ❤️ by Ragab | 2025

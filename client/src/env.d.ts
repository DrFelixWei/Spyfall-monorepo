// src/env.d.ts
interface ImportMetaEnv {
    VITE_BACKEND_URL: string;
    VITE_BACKEND_URL_PROD: string;
    VITE_PUBLIC_GA_TRACKING_ID: string;
    // Add other environment variables here as needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  
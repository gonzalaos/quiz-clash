declare global {
  interface Window {
    _env_: {
      BACKEND_EXTERNAL_URL?: string;
    };
  }
}

export {};

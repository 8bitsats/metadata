/// <reference types="vite/client" />

interface Window {
  solana?: {
    connect(): Promise<void>;
    publicKey: {
      toString(): string;
    };
  };
}
export const NONCE_BIT_LENGTH = 128;

export const generateNonce = (): string => {
  const bytes = globalThis.crypto.getRandomValues(new Uint8Array(NONCE_BIT_LENGTH / 8));

  return [...bytes].map(n => n.toString(16).padStart(2, "0")).join("");
};

export {}

declare global {
  interface Window {
    Clerk: any;
    location: {
      domain: any
    }
  }
}
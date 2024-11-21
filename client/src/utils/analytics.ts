// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
declare global {
  interface Window {
    gtag: (command: string, id: string, config?: object) => void;
  }
}
export const pageView = (url: string) => {
  window.gtag('config', process.env.VITE_PUBLIC_GA_TRACKING_ID as string, {
    page_path: url,
  });
};

export const emitEvent = (event: string) => {
  window.gtag('event', event);
};
import WebApp from "@twa-dev/sdk";

export function showAlert(message: string): Promise<void> {
  return new Promise((resolve) => {
    if (WebApp.showAlert) {
      WebApp.showAlert(message, () => resolve());
    } else {
      window.alert(message);
      resolve();
    }
  });
}

export function showConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (WebApp.showConfirm) {
      WebApp.showConfirm(message, (confirmed) => {
        resolve(confirmed);
      });
    } else {
      const confirmed = window.confirm(message);
      resolve(confirmed);
    }
  });
}

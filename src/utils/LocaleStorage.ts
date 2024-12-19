import { DEVBOOK_PASSPORT_KEY } from "@/config/config";

class LocaleStorage {
  setValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key: string): string | Array<string> {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : "";
  }

  removeValue(key: string) {
    localStorage.removeItem(key);
  }

  // JWT //
  setJWT(jwt: string) {
    this.setValue(DEVBOOK_PASSPORT_KEY, jwt);
  }

  getJWT() {
    return this.getValue(DEVBOOK_PASSPORT_KEY) as string;
  }

  removeJWT() {
    this.removeValue(DEVBOOK_PASSPORT_KEY);
  }
}

export default new LocaleStorage();

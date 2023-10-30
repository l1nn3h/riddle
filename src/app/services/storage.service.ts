import { Injectable } from '@angular/core';
import {EncryptionService} from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private encryptionService: EncryptionService) { }

  getItem(key: string): string {
    return localStorage.getItem(key);
  }

  removeItemsIfExist(keys: string[]): void {
    for (let key of keys) {
      if (this.checkIfItemExists(key)) {
        localStorage.removeItem(key);
      }
    }
  }

  checkIfItemExists(key: string): boolean {
    return localStorage?.getItem(key) != null;
  }

  checkIfEncryptedItemExists(key: string): boolean {
    return this.encryptionService.secureStorage.getItem(key) != null;
  }

  setEncryptedItem(key: string, value: any) {
    this.encryptionService.secureStorage.setItem(key, value);
  }

  getEncryptedItem(key: string) {
    return this.encryptionService.secureStorage.getItem(key);
  }

  removeEncryptedItem(key: string) {
    this.encryptionService.secureStorage.removeItem(key);
  }

  clearToken() {
    return this.encryptionService.secureStorage.clear();
  }
}

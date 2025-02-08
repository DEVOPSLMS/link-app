import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  key: any = 'cffa606a76fabca4036740d02b8182c2';
  IV = '0000000000000000';

  // ENCRYPTION USING CBC TRIPLE DES
  encryptUsingTripleDES(res: any, typeObj: boolean): string {
    const data = typeObj ? JSON.stringify(res) : res;
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.IV);
    console.log(iv);
    const mode = CryptoJS.mode.CBC;
    const encrypted = CryptoJS.TripleDES.encrypt(data, keyHex, { iv, mode });
    return encrypted.toString();
  }
  encryptUsingDES(data: string): string {
    const key = CryptoJS.enc.Utf8.parse('sz83kd75');
    const iv = CryptoJS.enc.Base64.parse('MTIzNDU2Nzg=');
    return CryptoJS.DES.encrypt(data, key, { 
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    }).toString();
  }
  // DECRYPTION USING CBC TRIPLE DES
  decryptUsingTripleDES(encrypted: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(this.key);
    const iv = CryptoJS.enc.Utf8.parse(this.IV);
    const mode = CryptoJS.mode.CBC;
    const decrypted = CryptoJS.TripleDES.decrypt(encrypted, keyHex, {
      iv,
      mode,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  // ENCRYPTION USING AES
   encryptUsingAES(data: string)  {
    var encryptedMessage=CryptoJS.AES.encrypt(data,'');
    return encryptedMessage.toString();
}


  // DECRYPTION USING AES
  decryptUsingAES(encrypted: string): string {
    const hash = CryptoJS.MD5(this.key).toString();
    const decrypted = CryptoJS.AES.decrypt(encrypted, hash);
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
  encrypt(data: string, key: string): { ciphertext: string, iv: string } {
    const iv = CryptoJS.lib.WordArray.random(128/8); // 16 bytes
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    
    const encrypted = CryptoJS.AES.encrypt(data, keyHex, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return {
      ciphertext: encrypted.toString(),
      iv: CryptoJS.enc.Base64.stringify(iv)
    };
  }
  decrypt(ciphertext: string, iv: string, key: string): string {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const ivHex = CryptoJS.enc.Base64.parse(iv);

    const decrypted = CryptoJS.AES.decrypt(ciphertext, keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
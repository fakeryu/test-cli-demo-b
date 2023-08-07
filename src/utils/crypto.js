/*
 * @Author: berg yu
 * @Date: 2022-07-05 14:38:38
 * @LastEditors: berg yu
 * @LastEditTime: 2023-08-04 16:45:07
 * @Description: 加解密函数
 */
import CryptoJS from "crypto-js/crypto-js";

function encryption(data) {
  let key = CryptoJS.enc.Utf8.parse("vnh52veisY2Y4BOvQSfm5O7SsNpNSLjr");
  let iv = CryptoJS.enc.Utf8.parse("vnh52veisY2Y4BOvQSfm5O7SsNpNSLjr"); //  矢量
  let enc;
  if (typeof data === "string") {
    const dataHex = CryptoJS.enc.Utf8.parse(data); // hex编码
    enc = CryptoJS.AES.encrypt(dataHex, key, {
      iv: iv,
    });
  } else if (typeof data === "object") {
    let datas = JSON.stringify(data);
    const dataHex = CryptoJS.enc.Utf8.parse(datas);
    enc = CryptoJS.AES.encrypt(dataHex, key, {
      iv: iv,
    }); 
  }
  return CryptoJS.enc.Base64.stringify(enc.ciphertext);
  // return enc.ciphertext.toString();
}

function decryption(data) {
  let key = CryptoJS.enc.Utf8.parse("vnh52veisY2Y4BOvQSfm5O7SsNpNSLjr"); // 加密秘钥
  let iv = CryptoJS.enc.Utf8.parse("vnh52veisY2Y4BOvQSfm5O7SsNpNSLjr"); //  矢量
  // let baseResult = CryptoJS.enc.Hex.parse(data); // hex解析
  // let ciphertext = CryptoJS.enc.Base64.stringify(baseResult);
  let decryptResult = CryptoJS.AES.decrypt(data, key, {
    iv: iv,
  });
  let resData = decryptResult.toString(CryptoJS.enc.Utf8).toString();

  return resData;
}

export { encryption, decryption };

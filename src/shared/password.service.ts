import { Injectable, Logger } from "@nestjs/common";
@Injectable()
export class PasswordService {
  generatePassword(length: number = 12): string {
    const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "!@#$%^&*()_+[]{}|;:,.<>?";
    const allCharacters = upperCase + lowerCase + numbers + special;

    let password = "";
    password += upperCase.charAt(Math.floor(Math.random() * upperCase.length));
    password += lowerCase.charAt(Math.floor(Math.random() * lowerCase.length));
    password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    password += special.charAt(Math.floor(Math.random() * special.length));

    for (let i = 4; i < length; i++) {
      password += allCharacters.charAt(Math.floor(Math.random() * allCharacters.length));
    }

    return password
      .split("")
      .sort(() => 0.5 - Math.random())
      .join("");
  }
}

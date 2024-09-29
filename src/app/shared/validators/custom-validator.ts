import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

  // Remarks should not exactly match prohibited words like 'test' or 'dummy'
  static prohibitedExactWords(control: AbstractControl): ValidationErrors | null {
    const forbiddenWords = ['test', 'dummy'];
    const value = control.value?.trim().toLowerCase();

    // Check if the value exactly matches any of the prohibited words
    const isExactMatch = forbiddenWords.some(word => value === word);

    return isExactMatch ? { prohibitedExactWord: true } : null;
  }
}

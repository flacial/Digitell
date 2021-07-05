export default class Guess {
  digitNumber: number;

  convertNextBinary = (): string => {
    return (this.digitNumber + 1).toString(2)
  };
  
  isInputCorrect = (inputValue: string | null): boolean => {
    return inputValue === this.convertNextBinary()
  };

  constructor(digitNumber: number) {
    this.digitNumber = digitNumber;
  }
}

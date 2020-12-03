export class Faq {
  constructor({ question = ``, answer = `` } = {}) {
    this.question = question;
    this.answer = answer;
    this.status = 1;
  }
}

export function CreateFaq(data) {
  return Object.freeze(new Faq(data.faq));
}

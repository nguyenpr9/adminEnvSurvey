export class SurveyQuestionOption {
  constructor({ title = ``, value = `` } = {}) {
    this.title = title;
    this.value = value;
  }
}

export function createQuestionOption(data) {
  return Object.freeze(new SurveyQuestionOption(data));
}

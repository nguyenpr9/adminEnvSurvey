import { SurveyQuestionOption } from "./SurveyQuestionOption";

export class SurveyQuestion {
  constructor({
    number = ``,
    question = ``,
    answer = ``,
    options = [new SurveyQuestionOption()]
  } = {}) {
    this.number = number;
    this.question = question;
    this.answer = answer;
    this.options = options;
  }
}

export function createSurveyQuestion(data) {
  return Object.freeze(new SurveyQuestion(data));
}

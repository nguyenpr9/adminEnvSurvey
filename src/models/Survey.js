import moment from "moment";
import { createSurveyQuestion } from "./SurveyQuestion";
export class Survey {
  constructor({
    title = ``,
    description = ``,
    userId = ``,
    startDate = moment().format("YYYY-MM-DD"),
    endDate = moment()
      .add(2, "years")
      .format("YYYY-MM-DD"),
    questions = ``
  } = {}) {
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.questions = questions;
  }
}

export function CreateSurvey(survey, surveyQs) {
  let title = survey.survey.title;
  let description = survey.survey.description;
  let userId = survey.survey.userId;
  let startDate = survey.survey.startDate;
  let endDate = survey.survey.endDate;
  const questions = surveyQs.surveyQs.map(x => createSurveyQuestion(x));
  return Object.freeze(
    new Survey({ title, description, userId, startDate, endDate, questions })
  );
}

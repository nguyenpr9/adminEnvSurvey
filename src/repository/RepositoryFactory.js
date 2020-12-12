import { FaqRepository } from "./FaqRepository";
import { UserRepository } from "./UserRepository";
import { AuthRepository } from "./AuthRepository";
import { SurveyRepository } from "./SurveyRepository";
import { StatisticRepository } from "./StatisticRepository";
let authRepo = new AuthRepository();
let faqRepo = new FaqRepository();
let userRepo = new UserRepository();
let surveyRepo = new SurveyRepository();
let statisticRepo = new StatisticRepository();
const repositories = {
  auth: authRepo,
  faq: faqRepo,
  user: userRepo,
  survey: surveyRepo,
  statistic: statisticRepo
};
export default {
  get: name => repositories[name]
};

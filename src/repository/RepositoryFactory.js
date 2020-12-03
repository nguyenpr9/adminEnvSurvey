import { FaqRepository } from "./FaqRepository";
import { UserRepository } from "./UserRepository";
import { AuthRepository } from "./AuthRepository";
import { SurveyRepository } from "./SurveyRepository";
let authRepo = new AuthRepository();
let faqRepo = new FaqRepository();
let userRepo = new UserRepository();
let surveyRepo = new SurveyRepository();
const repositories = {
  auth: authRepo,
  faq: faqRepo,
  user: userRepo,
  survey: surveyRepo
};
export default {
  get: name => repositories[name]
};

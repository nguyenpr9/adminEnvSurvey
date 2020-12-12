import { Repository } from "./Repository";
export class StatisticRepository extends Repository {
  constructor() {
    super("statistic");
  }
  async surveyUserCount(payload) {
    await this.setPath("survey-user-count");
    return await this.get(payload);
  }
  async dashboard(payload) {
    await this.setPath("dashboard");
    return await this.get(payload);
  }
}

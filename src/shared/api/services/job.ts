import connection from "../connection";
import { TJob } from "../types";

export class JobService {
  static getJob = async (): Promise<TJob[]> => {
    try {
      const [rows]: any = await connection.execute("SELECT * FROM job");
      const result = rows?.map((item: any) => {
        return {
          ...item,
          startYear: item.start_year,
          endYear: item.end_year
        }
      })
      return result;
    } catch (error) {
      console.error("Ошибка при получении информации о пользователе:", error);
      throw error;
    }
  };
}

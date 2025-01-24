import connection from "../connection";
import { TEducation } from "../types";

export class EducationService {
  static getEducation = async (): Promise<TEducation[]> => {
    try {
      const [rows]: any = await connection.execute("SELECT * FROM education");
      const result = rows?.map((item: any) => {
        return {
          ...item,
          startYear: item.start_year,
          endYear: item.end_year
        }
      })
      return result;
    } catch (error) {
      console.error("Ошибка при получении данных образования:", error);
      throw error;
    }
  };
}

import connection from "../connection";
import { TSkills } from "../types";

export class SkillsService {
  static getSkills = async (): Promise<TSkills[]> => {
    try {
      const [rows]: any = await connection.execute("SELECT * FROM skills");
      return rows;
    } catch (error) {
      console.error("Ошибка при получении навыков:", error);
      throw error;
    }
  };
}

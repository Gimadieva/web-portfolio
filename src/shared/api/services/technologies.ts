import connection from "../connection";
import { TTechnologies } from "../types";

export class TechnologiesService {
  static getTechnologies = async (): Promise<TTechnologies[]> => {
    try {
      const [rows]: any = await connection.execute(
        "SELECT * FROM technologies"
      );
      return rows;
    } catch (error) {
      console.error("Ошибка при получении технологий:", error);
      throw error;
    }
  };
}

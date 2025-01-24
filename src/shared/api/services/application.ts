import connection from "../connection";
import { TApplicationBody } from "../types";

export class ApplicationService {
  static saveApplication = async (body: TApplicationBody): Promise<any[]> => {
    try {
      const query = `
        INSERT INTO applications (name, email, message, created_at)
        VALUES (?, ?, ?, NOW())
    `;

      const { name, email, message } = body;

      // запрос с параметрами
      const [result]: any = await connection.execute(query, [
        name,
        email,
        message,
      ]);
      return result;
    } catch (error) {
      console.error("Ошибка при отправки заявки:", error);
      throw error;
    }
  };

  static getApplications = async (): Promise<TApplicationBody[]> => {
    try {
      const [rows]: any = await connection.execute("SELECT * FROM applications");
      const result = rows?.map((item: any) => {
        return {
          ...item,
          createdAt: item.created_at,
        }
      })
      return result;
    } catch (error) {
      console.error("Ошибка при получении заявок:", error);
      throw error;
    }
  };

  static deleteApplication = async (id: number): Promise<any[]> => {
    try {
      const query = "DELETE FROM applications WHERE id = ?";
      const [result]: any = await connection.execute(query, [id]);
      return result;
    } catch (error) {
      console.error("Ошибка при удалении заявки:", error);
      throw error;
    }
  };
}

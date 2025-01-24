import connection from "../connection";
import { TInformation } from "../types";

export class InformationService {
    static getAboutInfo = async (): Promise<TInformation> => {
      try {
        const [rows]: any = await connection.execute("SELECT * FROM about");
        const result = rows?.map((item: any) => {
          return {
            ...item,
            aboutMe: item.about_me,
            aboutJob: item.about_job,
          }
        })
        return result[0];
      } catch (error) {
        console.error("Ошибка при получении информации о пользователе:", error);
        throw error;
      }
    };
  }
  
import connection from "../connection";
import { TPortfolio } from "../types";

export class PortfolioService {
  static getAllPortfolio = async (): Promise<TPortfolio[]> => {
    try {
      const [rows]: any = await connection.execute(
        "SELECT portfolio.*, skills.color as skills_color, skills.icon as skills_icon, skills.title as skills_title FROM portfolio INNER JOIN skills ON portfolio.tag = skills.name"
      );
      const portfolio = rows?.map((item: any) => ({
        ...item,
        tags: {
          name: item.tag,
          title: item.skills_title,
          color: item.skills_color,
          icon: item.skills_icon
        }
      }))
      return portfolio;
    } catch (error) {
      console.error("Ошибка при получении данных портфолио:", error);
      throw error;
    }
  };

  static getPortfolio = async (id: number): Promise<TPortfolio> => {
    try {
      const [rows]: any = await connection.execute(
        "SELECT portfolio.*, skills.color as skills_color, skills.icon as skills_icon, skills.title as skills_title FROM portfolio INNER JOIN skills ON portfolio.tag = skills.name WHERE portfolio.id = ?", [id],
      );
      const portfolio = rows?.map((item: any) => ({
        ...item,
        tags: {
          name: item.tag,
          title: item.skills_title,
          color: item.skills_color,
          icon: item.skills_icon
        }
      }))
      return portfolio[0];
    } catch (error) {
      console.error("Ошибка при получении данных портфолио:", error);
      throw error;
    }
  };
}

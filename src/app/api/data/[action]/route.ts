import { InformationService } from "@/shared/api/services/about";
import { ApplicationService } from "@/shared/api/services/application";
import { EducationService } from "@/shared/api/services/education";
import { JobService } from "@/shared/api/services/job";
import { PortfolioService } from "@/shared/api/services/portfolio";
import { SkillsService } from "@/shared/api/services/skills";
import { TechnologiesService } from "@/shared/api/services/technologies";
import { NextResponse } from "next/server";

const cache = new Map();

export async function GET(
  request: Request,
  context: { params: { action: string } }
) {
  const { params } = context; 
  const action = await params.action; 

  if (cache.has(action)) {
    // Возврат данных из кеша
    return NextResponse.json(cache.get(action));
  }

  const url = new URL(request.url);
  const id = (url.searchParams.get("id")); 

  try {
    if (action === "allPortfolio") {
      const portfolio = await PortfolioService.getAllPortfolio();
      cache.set(action, portfolio); // Кешируем данные
      return NextResponse.json(portfolio);
    }

    if (action === "portfolio" && id) {
      const portfolio = await PortfolioService.getPortfolio(parseInt(id));
      return NextResponse.json(portfolio);
    }

    if (action === "skills") {
      const skills = await SkillsService.getSkills();
      cache.set(action, skills); // Кешируем данные
      return NextResponse.json(skills);
    }

    if (action === "technologies") {
      const technologies = await TechnologiesService.getTechnologies();
      cache.set(action, technologies); // Кешируем данные
      return NextResponse.json(technologies);
    }

    if (action === "about") {
      const information = await InformationService.getAboutInfo();
      cache.set(action, information); // Кешируем данные
      return NextResponse.json(information);
    }

    if (action === "job") {
      const jobs = await JobService.getJob();
      cache.set(action, jobs); // Кешируем данные
      return NextResponse.json(jobs);
    }

    if (action === "education") {
      const educations = await EducationService.getEducation();
      cache.set(action, educations); // Кешируем данные
      return NextResponse.json(educations);
    }

    if (action === "applications") {
      const applications = await ApplicationService.getApplications();
      return NextResponse.json(applications);
    }

    return NextResponse.json(
      { error: "Неизвестное действие" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  context: { params: { action: string } }
) {
  const { params } = context;
  const action = params.action;

  try {
    // Проверяем действие
    if (action === "application") {
      const body = await request.json();

      if (!body.name || !body.email) {
        return NextResponse.json(
          { error: "Поля имя, почта обязательны" },
          { status: 400 }
        );
      }

      const result = await ApplicationService.saveApplication(body);
      return NextResponse.json(
        { message: "Заявка успешно отправлена", data: result },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Неизвестное действие" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Ошибка при обработке POST-запроса:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: { action: string } }
) {
  const { params } = context;
  const action = params.action;

  try {
    // Проверяем действие
    if (action === "application") {
      const { id } = await request.json();

      if (!id) {
        return NextResponse.json({ error: "ID is required" }, { status: 400 });
      }

      const result = await ApplicationService.deleteApplication(id);
      return NextResponse.json(
        { message: "Заявка успешно удалена", data: result },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Неизвестное действие" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Ошибка при обработке POST-запроса:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}


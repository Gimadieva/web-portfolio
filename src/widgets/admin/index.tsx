"use client";

import { TApplicationBody } from "@/shared/api/types";
import { LogOutIcon } from "@/shared/lib/icons";
import { DatePicker, Pagination, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { ApplicationCard } from "./card";
import { Button } from "@nextui-org/button";

export default function AdminPage() {
  const [applications, setApplications] = useState<
    TApplicationBody[] | undefined
  >(undefined);
  const [filterApplications, setFilterApplications] = useState<
    TApplicationBody[] | undefined
  >(undefined);
  const [date, setDate] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    if (!date) return;
    const filtered = applications?.filter((item: any) => {
      return (
        new Date(item.createdAt).toLocaleDateString() ===
        new Date(date).toLocaleDateString()
      );
    });
    setFilterApplications(filtered);
  }, [date]);

  const fetchApplications = async () => {
    try {
      const response = await fetch("/api/data/applications");
      const data = await response.json();
      setApplications(data);
      setFilterApplications(data);
    } catch (error) {
      console.error("Ошибка при загрузке заявок:", error);
    }
  };

  const getCurrentPageData = () => {
    if (!filterApplications) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filterApplications.slice(startIndex, endIndex);
  };
  
  const onLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/auth";
  };

  return (
    <>
      <div className="w-full border-b dark:border-zinc-900 py-0 border-zinc-100">
        <div className="max-w-[800px] mx-auto w-full px-4 pb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Заявки</h2>
          <Button
            onClick={onLogout}
            className="flex items-center py-2 px-4 rounded-xl gap-2 bg-inherit "
          >
            <LogOutIcon />
            <p className="text-sm text-blue-500">Выйти</p>
          </Button>
        </div>
      </div>
      {!applications ? (
        <Spinner color="primary" />
      ) : (
        <div className="w-full px-4">
          <div className="max-w-[800px] mx-auto w-full flex flex-col gap-4">
            <div className="flex gap-2">
              <DatePicker
                value={date}
                className="max-w-[250px]"
                label="Выберите дату"
                onChange={(date: any) => setDate(date)}
                classNames={{
                  calendarContent: "dark:bg-zinc-900 bg-zinc-100",
                }}
              />
              <Button
                onClick={() => {
                  setDate(null);
                  setFilterApplications(applications);
                }}
                className="dark:bg-zinc-900 bg-zinc-100 text-opacity-60"
              >
                Сброс
              </Button>
            </div>

            {getCurrentPageData().map((item: TApplicationBody, index) => (
              <ApplicationCard
                key={item.id}
                item={item}
                onDelete={fetchApplications}
              />
            ))}
          </div>
          {applications.length > itemsPerPage && (
            <div className="max-w-[800px] mx-auto mt-4 flex justify-center">
              <Pagination
                total={Math.ceil(applications.length / itemsPerPage)}
                initialPage={1}
                page={currentPage}
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

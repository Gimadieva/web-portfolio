"use client";

import { TApplicationBody } from "@/shared/api/types";
import { ClipIcon } from "@/shared/lib/icons";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

interface ApplicationCardProps {
  item: TApplicationBody;
  onDelete: () => void;
}

export const ApplicationCard = ({ item, onDelete }: ApplicationCardProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<number>(0);

  const date = item?.createdAt && new Date(item?.createdAt).toLocaleDateString();

  const onDeleteApplication = async () => {
    try {
      if (id !== 0) {
        const response = await fetch("/api/data/application", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          alert("Возникла ошибка при удалении заявки");
          return;
        }

        alert("Заявка успешно удалена");
        onClose();
        onDelete();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const onOpenModal = (id: number) => {
    setId(id);
    onOpen();
  };

  return (
    <div className="w-full flex flex-col items-start p-6 gap-2 rounded-2xl border dark:border-zinc-900 border-zinc-100">
      <div className="flex flex-col items-start">
        <p className="text-lg font-semibold">{item.name}</p>
        <p className="text-sm font-normal opacity-40">{date}</p>
      </div>
      <p className="text-base font-normal">{item.message}</p>
      <a type="email" href={`mailto:${item.email}`} className="flex gap-1 text-blue-500">
        <ClipIcon /> {item.email}
      </a>
      <div className="flex w-full justify-end">
        <Button
          className="dark:bg-zinc-900 bg-zinc-100"
          onClick={() => onOpenModal(item?.id ?? 0)}
        >
          <p className="text-sm text-blue-500">Удалить</p>
        </Button>
      </div>
      <Modal isOpen={isOpen} size={"md"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Удаление заявки
              </ModalHeader>
              <ModalBody>Вы точно хотите удалить данную заявку?</ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Закрыть
                </Button>
                <Button color="primary" onPress={onDeleteApplication}>
                  Да
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

import { Icon } from "@/featured/iconComponent";
import { TPortfolio } from "@/shared/api/types";
import { Card, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export const ServiceCards = ({
  tag,
  portfolio,
}: {
  tag?: string;
  portfolio?: TPortfolio[];
}) => {
  const filteredServices = portfolio?.filter((portfolio) =>
    tag === "all" ? true : portfolio.tags.name === tag
  );
  const router = useRouter()

  const cardCustomColors = {
    base: "dark:bg-zinc-900 bg-zinc-100",
    header: "dark:bg-zinc-900 bg-zinc-100", 
    body: "dark:bg-zinc-900 bg-zinc-100",
  }

  return (
    <div className="flex flex-wrap gap-4">
      {filteredServices?.map((item, index) => (
        <Card
          key={index}
          isPressable
          onPress={() => router.push(`/portfolio?id=${item.id}`)}
          className="flex-[1_1_300px] max-w-[calc(33.333%-1rem)] min-w-[300px]"
          classNames={cardCustomColors}
        >
          <CardBody className="flex flex-col items-start gap-2 p-2 rounded-lg">
            <div className="w-full h-[200px]">
              <Image
                alt={item?.title}
                className="w-full h-[200px] object-cover rounded-md"
                radius="lg"
                shadow="sm"
                src={item?.image}
                width="100%"
                height={200}
              />
            </div>
            <div className="flex flex-col items-start p-2 gap-3 w-full">
              <div
                className="flex h-6 py-0 px-2 items-center gap-2 rounded"
                style={{
                  backgroundColor: `${item?.tags?.color}1f`,
                  color: item?.tags?.color,
                }}
              >
                <div className="flex justify-center items-center rounded gap-2 h-6">
                  <Icon icon={item?.tags?.icon} size={16}/>
                </div>
                <p className="text-xs font-semibold color-inherit">
                  {item?.tags?.title}
                </p>
              </div>
              <div className="flex flex-col items-start w-full">
                <p className="text-xl font-semibold line-clamp-1">
                  {item?.title}
                </p>
                <p className="text-base font-normal opacity-40 line-clamp-2">
                  {item?.description}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export const Icon = ({ icon, size = 24 }: { icon?: string, size?: number }) => {
  const iconPath = "/icons/icons.svg";

  return (
    <svg height={size} width={size}>
      <use href={`${iconPath}#${icon}`}></use>
    </svg>
  );
};

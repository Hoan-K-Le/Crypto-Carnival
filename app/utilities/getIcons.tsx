import Icon from "../components/Icon/Icon";

export const getIcon = (data: number) => {
  return data < 0 ? (
    <Icon iconVariant="arrowDown" />
  ) : (
    <Icon iconVariant="arrowUp" />
  );
};

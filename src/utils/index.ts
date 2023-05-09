import moment from "moment";

export const getTitle = (key: string) => {
  key = key || "";
  return key
    ?.split("_")
    .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
    .join(" ");
};

export const getFileSize = (size: number) => {
  if (size < 1024) {
    return `${size} Bytes`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  }

  if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }

  if (size < 1024 * 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }

  return 0;
};

export const getHoursOptions = () => {
  return Array.from(Array(24).keys()).map((_, index) => {
    return {
      label: index <= 9 ? `0${index}` : index?.toString(),
      value: index <= 9 ? `0${index}` : index?.toString(),
    };
  });
};

export const getMinutesOptions = () => {
  return Array.from(Array(60).keys()).map((_, index) => {
    return {
      label: index <= 9 ? `0${index}` : index?.toString(),
      value: index <= 9 ? `0${index}` : index?.toString(),
    };
  });
};

export const getTotalLogHoursDuration = (logs: any[]) => {
  const total = logs.reduce((acc, cur) => {
    return acc + +cur.duration;
  }, 0);

  return moment.utc(total).format("HH:mm");
};

export const covertToKb = (size: number, type: "KB" | "MB" | "GB") => {
  if (type === "KB") {
    return size;
  }

  if (type === "MB") {
    return size * 1024;
  }

  return 0;
};

export const fileSizeInKb = (size: number) => {
  return size / 1024;
};

export const reorder = (
  list: any[],
  startIndex: number,
  endIndex: number
): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const move = (
  source: any,
  destination: any,
  droppableSource: any,
  droppableDestination: any
) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: any = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

export const colors = ["#149ECD", "#F7964F", "#F2353C", "#673AB7", "#8BC34A"];

export const getContainerHeight = (item: HTMLElement | null) => {
  const height = item ? item.getBoundingClientRect().y + 24 : 0;
  return `calc(100vh - ${height + "px"}) `;
};

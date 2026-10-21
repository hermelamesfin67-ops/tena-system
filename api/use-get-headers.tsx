type HeaderType = "FormData" | "Json";
interface Props {
  type?: HeaderType;
}
export const useGetHeaders = ({ type = "Json" }: Props) => {
  if (type === "FormData") {
    return {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    };
  }
  else {
    return {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
  }
};

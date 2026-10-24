/* eslint-disable @typescript-eslint/no-explicit-any */
import Pagination from "./pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn";

const paginationLimitOptions = [5, 10, 25, 50].map((v, idx) => ({
  id: idx,
  label: String(v),
  value: v,
}));

export type PaginationProps = {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number) => void;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  paginatorClassName?: string;
};

export default function TablePagination({
  pageSize,
  setPageSize,
  onChange,
  total,
  paginatorClassName = "mt-5 xs:mt-6 sm:mt-7",
  ...props
}: PaginationProps) {
  return (
    <div
      className={cn(
        "table-pagination flex flex-col sm:flex-row md:items-center justify-between m-2 w-full",
        paginatorClassName,
      )}
    >
      {!setPageSize ? (
        total && (
          <div className="text-gray-500 sm:inline-flex">
            {props.current} of {Math.ceil(total / pageSize)} pages
          </div>
        )
      ) : (
        <div className="hidden items-center sm:flex whitespace-nowrap m-2 text-sm">
          Rows per page:{" "}
          <Select items={paginationLimitOptions} defaultValue={pageSize} onValueChange={(v: any) => setPageSize && setPageSize(v)}>
            <SelectTrigger className="w-fit">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {paginationLimitOptions.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}
      {total ? (
        <Pagination
          total={total}
          pageSize={pageSize}
          onChange={onChange}
          defaultCurrent={1}
          showLessItems={true}
          prevIconClassName="py-0 text-gray-500 !leading-[26px]"
          nextIconClassName="py-0 text-gray-500 !leading-[26px]"
          {...props}
          color="primary"
        />
      ) : (
        <div />
      )}
    </div>
  );
}

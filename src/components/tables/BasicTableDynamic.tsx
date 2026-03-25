import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type BasicTableDynamicProps = {
  headers: Array<string>;
  data: Record<string, unknown>[]; 
};

const BasicTableDynamic: React.FC<BasicTableDynamicProps> = ({
  headers,
  data
}) => {
  const dataTableHeader = headers.map((header) => (
    <TableCell
      isHeader
      className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400"
      key={header}
    >
      {header}
    </TableCell>
  ));

  const dataTableBody: React.ReactNode[] = [];

  if (data && data.length > 0) {
    const fieldKeys = Object.keys(data[0]);

    data.forEach((item, index) => {
      const dataPerRows = fieldKeys.map((key) => {
        const rawValue = item[key];
        
        let displayValue: React.ReactNode;

        if (typeof rawValue === "object" && rawValue !== null) {
          displayValue = JSON.stringify(rawValue);
        } else {
          displayValue = rawValue as React.ReactNode;
        }

        return (
          <TableCell 
            className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" 
            key={key}
          >
            {displayValue}
          </TableCell>
        );
      });

      const rowKey = (item._id as string) || `row-${index}`;

      dataTableBody.push(
        <TableRow key={rowKey}>
          {dataPerRows}
        </TableRow>
      );
    });
  }

  return (
    <div className="min-w-[1102px]">
      <Table>
        <TableHeader>
          <TableRow>
            {dataTableHeader}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataTableBody}
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicTableDynamic;
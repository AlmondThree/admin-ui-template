import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

export interface ActionComponentProps<T> {
    className: string;
    disabled: boolean | undefined;
    isAdded?: boolean;
    onToggle?: (item: T) => void;
    rowData: T;
    onClick: () => void;
}

interface DynamicTableRowActionProps<T> {
    data: T[],
    columns: {
        header: string,
        key: keyof T
    }[],
    ActionComponent: React.ComponentType<ActionComponentProps<T>>;
    addedIds?: string[];
    onToggle?: (data: T) => void
    actionComponentClassName: string;
    onActionClick: (data: T) => void;
}

function DynamicTableRowAction<T> ({ data, columns, ActionComponent, addedIds, onToggle, actionComponentClassName, onActionClick }: DynamicTableRowActionProps<T>) {

    return (
        <div className="min-w-[1102px]">
            <Table>
                <TableHeader>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableCell isHeader className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400" key={index}>
                                {col.header}
                            </TableCell>
                        ))}
                        <TableCell isHeader className="px-5 py-3 font-large text-gray-500 text-start text-theme-xs dark:text-gray-400" key={"Action"}>
                            Action
                        </TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, rowIndex) => {
                        const firstColKey = columns[0].key;
                        const itemId = String(item[firstColKey]);
                        const isAdded = addedIds?.includes(itemId) ?? false;
                        return (
                            <TableRow key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <TableCell key={colIndex} className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                        {String(item[col.key])}
                                    </TableCell>
                                ))}
                                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                                    <ActionComponent
                                        className={actionComponentClassName}
                                        disabled={false}
                                        rowData={item}
                                        isAdded= {isAdded}
                                        onToggle={onToggle}
                                        onClick={() => onActionClick(item)}
                                    />
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default DynamicTableRowAction
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

type BasicTableDynamicProps = {
    headers: Array<string>,
    data: Object[]
}

const BasicTableDynamic: React.FC<BasicTableDynamicProps> = ({
    headers,
    data
}) => {

    let dataTableHeader:React.ReactNode[] = []
    let dataTableBody:React.ReactNode[] = []

    for (const i of headers) {
        dataTableHeader.push(
            <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                key={i}
            >
                {i}
            </TableCell>
        )
    }

    if(data.length > 0) {
        let fieldKey = Object.keys(data[0])
        for (let i = 0 ; i < data.length; i++) {
            let dataIterator: any = data[i]
            let dataPerRows = []
            for(const x of fieldKey) {
                let value = dataIterator[x]
                if(dataIterator[x] instanceof Object) {
                    value = JSON.stringify(dataIterator[x])
                }

                dataPerRows.push(
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400" key={x}>
                        {value}
                    </TableCell>
                )
            }

            dataTableBody.push(
                <TableRow key={dataIterator._id+"cell"}>
                    {dataPerRows}
                </TableRow>
            )
        }
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
    )
}

export default BasicTableDynamic
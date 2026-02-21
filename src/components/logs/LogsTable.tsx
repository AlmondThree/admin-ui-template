"use client"

import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import apiAttribute from "../../manifest/json/logsSystemAttr.json"
import BasicTableDynamic from "../tables/BasicTableDynamic";
import Pagination from "../tables/Pagination";
import TableLoadingSkeleton from "../tables/TableLoadingSkeleton";

type paginationPropsLogs = {
  currType: "log_system" | "session_log" | "interface_log",
  currPage: number,
  totalPage: number,
  size: number
}

const LogsTable: React.FC = () => {
  const [selected, setSelected] = useState<
    "log_system" | "session_log" | "interface_log"
  >("log_system");
  const [data, setData] = useState<Object[]>([{}]);
  const [listHeaders, setListHeaders] = useState<string[]>([]);
  const [fetchStatus, setFetchStatus] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState<paginationPropsLogs>({
    currType: "log_system",
    currPage: 1,
    totalPage: 10,
    size: 5
  })


  const getButtonClass = (option: "log_system" | "session_log" | "interface_log") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  const onPageChange = (pageNumber: number) => {
    setPageInfo({...pageInfo, currPage: pageNumber})
  }

  const onSelectedChange = (selectedType: "log_system" | "session_log" | "interface_log") => {
    setSelected(selectedType);
    setPageInfo({...pageInfo, currPage: 1})
  }

  useEffect(() => {
    async function fetchData() {
      const apiCall = await fetch(
        `/api/logs?type=${selected}&page=${pageInfo.currPage}&limit=${pageInfo.size}`,
        {
          method: "GET",
          headers: 
            {
              'Content-Type': 'application/json',
            }
        }
      )

      if(apiCall.ok){
        const res = await apiCall.json();
        
        setData(res.data);
        setPageInfo({
          ...pageInfo,
          totalPage:res.last_page
        })
        setFetchStatus(true);
      }
    }

    setListHeaders(apiAttribute[selected].responseField)
    fetchData();

  }, [selected, pageInfo.currPage])

  return (
    <div>
      <ComponentCard title="Logs Table">
        <div className="flex w-fit items-center text-nowrap gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
          <button
            onClick={() => onSelectedChange("log_system")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "log_system"
            )}`}
          >
            System Logs
          </button>

          <button
            onClick={() => onSelectedChange("session_log")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "session_log"
            )}`}
          >
            Session Logs
          </button>

          <button
            onClick={() => onSelectedChange("interface_log")}
            className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
              "interface_log"
            )}`}
          >
            Interface Logs
          </button>

          
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
              {
                (fetchStatus) ? (
                  <BasicTableDynamic 
                    headers={listHeaders!}
                    data={data!}
                  />
                ) : (
                  <TableLoadingSkeleton
                  />
                )
                
              }
          </div>
        </div>
        <Pagination currentPage={pageInfo.currPage} totalPages={pageInfo.totalPage} onPageChange={onPageChange}/>
    
      </ComponentCard>
    </div>
  );
};

export default LogsTable;

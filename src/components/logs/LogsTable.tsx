"use client"

import React, { useEffect, useState } from "react";
import ComponentCard from "../common/ComponentCard";
import apiAttribute from "../../manifest/json/logsSystemAttr.json"
import createParamsAPI from "../../hooks/createParamsAPI"
import BasicTableDynamic from "../tables/BasicTableDynamic";

const LogsTable: React.FC = () => {
  const [selected, setSelected] = useState<
    "log_system" | "session_log" | "interface_log"
  >("log_system");
  const [data, setData] = useState<Object[]>([{}]);
  const [listHeaders, setListHeaders] = useState<string[]>([])

  const getButtonClass = (option: "log_system" | "session_log" | "interface_log") =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  useEffect(() => {
    async function fetchData() {
      let objectLogs: any = apiAttribute[selected]

      const paramPagination = {
        page: 1,
        limit: 5
      }

      const parameter = createParamsAPI(objectLogs.parameters, paramPagination)

      fetch(
        `${process.env["NEXT_PUBLIC_BACKEND_HOST"]}/api/logs/v1${objectLogs.endpoint}${parameter}`,
        {
          method: "GET",
          headers: 
            {
              'Content-Type': 'application/json',
              'x-api-key': `${process.env["NEXT_PUBLIC_API_KEY"]}`
            },
        }
      ).then((res) => {
        let data = res.json();

        data.then((res) => {
          setData(res.data)
        })

        setListHeaders(apiAttribute[selected].responseField)
      })

    }
    fetchData()

  }, [selected])

  return (
    <div>
      <ComponentCard title="Logs Table">
        <div className="flex w-fit items-center text-nowrap gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
        <button
          onClick={() => setSelected("log_system")}
          className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
            "log_system"
          )}`}
        >
          System Logs
        </button>

        <button
          onClick={() => setSelected("session_log")}
          className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
            "session_log"
          )}`}
        >
          Session Logs
        </button>

        <button
          onClick={() => setSelected("interface_log")}
          className={`px-3 py-2 font-medium w-full rounded-md text-theme-sm hover:text-gray-900   dark:hover:text-white ${getButtonClass(
            "interface_log"
          )}`}
        >
          Interface Logs
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
            <BasicTableDynamic 
              headers={listHeaders!}
              data={data!}
            />
        </div>
      </div>
    
      </ComponentCard>
    </div>
  );
};

export default LogsTable;

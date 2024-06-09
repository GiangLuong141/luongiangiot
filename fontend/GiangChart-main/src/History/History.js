import historyData from "../data/history.json";
import HistorySearch from "../Component/HistorySearch";
import { useState } from "react";
const History = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="w-full h-screen bg-[#ddd] flex justify-center items-center">
      <div className="mb-8ccc">
        <div className="mb-3">
          <HistorySearch
            onchange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <table className="">
          <thead className="bg-blue-400">
            <tr>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                STT
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Type
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Activity
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {historyData &&
              historyData
                .filter((data) => {
                  return search.toLowerCase() === ""
                    ? data
                    : data.stt.toString().toLowerCase().includes(search);
                })
                .map((data) => (
                  <tr>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.stt}
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.type}
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.activity}
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.time}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;

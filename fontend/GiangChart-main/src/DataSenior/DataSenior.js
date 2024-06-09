import SeniorData from "../data/dataSenior.json";
import { useState } from "react";
const DataSenior = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = SeniorData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(SeniorData.length / recordsPerPage);
  const number = [...Array(npage + 1).keys()].slice(1);
  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prePage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changePage = (id) => {
    setCurrentPage(id);
  };
  return (
    <div className="">
      <form className="max-w-md mx-auto py-6">
        <label
          for="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
            placeholder="Enter ID..."
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            required
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search ID
          </button>
        </div>
      </form>
      <div className="w-full h-[400px] flex justify-center ">
        <table className="">
          <thead className="bg-blue-400">
            <tr>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                ID
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Temp
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Humid
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Light
              </th>
              <th className="border-solid border-2 border-sky-500  px-14 py-2">
                Time
              </th>
            </tr>
          </thead>
          <tbody>
            {records &&
              records
                .filter((data) => {
                  return search.toLowerCase() === ""
                    ? data
                    : data.id.toString().toLowerCase().includes(search);
                })
                .map((data) => (
                  <tr key={data.id}>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.id}
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.temp}°C
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.humid}
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.light}%
                    </td>
                    <td className="border-solid border-2 border-sky-500  px-14 py-2">
                      {data.time}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      <nav>
        <ul className="flex justify-end pr-[340px] pt-6">
          <li className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <a href="#" className="page-link block" onClick={prePage}>
              Prev
            </a>
          </li>
          {number.map((n, i) => (
            <li
              className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                currentPage === n ? "activePage" : ""
              }`}
              key={i}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => {
                  changePage(n);
                }}
              >
                {n}
              </a>
            </li>
          ))}
          <li className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DataSenior;

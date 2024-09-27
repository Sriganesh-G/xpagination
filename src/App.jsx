import { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";
import Pagination from "./components/Pagination";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [error, setError] = useState(null);

  // fetching data
  useEffect(() => {
    const fetchData = () => {
      fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      )
        .then((res) => res.json())
        .then((res) => {
          setData(res);
        })
        .catch((e) => {
          alert("Failed to fetch data");
          console.error("Failed to fetch data", e);
        });
    };

    fetchData();
    console.log(data);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      {error ? (
        <div>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <EmployeeTable data={currentData} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handleNext={handleNext}
            handlePrevious={handlePrevious}
          />
        </>
      )}
    </div>
  );
}

export default App;

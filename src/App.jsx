import { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);

  // Fetching data
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
          alert("Failed to fetch data"); // Add alert for failed fetch
          console.error("Failed to fetch data", e);
        });
    };

    fetchData();
  }, []);

  // Logic to calculate the current employees based on the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = data.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  // Handle page change
  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / employeesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div>
      <div>
        <h1>Employee Data Table</h1>
      </div>
      <EmployeeTable data={currentEmployees} />

      {/* Pagination Controls */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(data.length / employeesPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

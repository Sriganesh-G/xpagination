import { useEffect, useState } from "react";
import "./App.css";
import EmployeeTable from "./components/EmployeeTable";

function App() {
  const [details, setDetails] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10; // Number of items per page

  // Fetching data
  const fetchData = async () => {
    try {
      const resp = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await resp.json();
      setDetails(data);
    } catch (err) {
      alert("Failed to fetch data");
    }
  };

  // Handle decrement
  const handleDecrement = () => {
    if (page === 1) return; // Do nothing if on the first page
    setPage((prevPage) => prevPage - 1); // Go to the previous page
  };

  // Handle increment
  const handleIncrement = () => {
    if (page >= Math.ceil(details.length / itemsPerPage)) return; // Do nothing if on the last page
    setPage((prevPage) => prevPage + 1); // Go to the next page
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculate the current data to display
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = details.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <div>
        <h1>Employee Data Table</h1>
      </div>
      <EmployeeTable data={currentItems} />
      <div>
        <button onClick={handleDecrement} disabled={page === 1}>
          Previous
        </button>
        <span className="currNum"> {page} </span>
        <button
          onClick={handleIncrement}
          disabled={page >= Math.ceil(details.length / itemsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;

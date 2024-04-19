import React, { useEffect, useState } from "react";
import { apiUrl, filterData } from "./data";
import Navbar from "./Components/Navbar";
import Filter from "./Components/Filter";
import { toast } from "react-toastify";
import Cards from "./Components/Cards";
import Spinner from "./Components/Spinner";

const App = () => {
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(apiUrl);
      const output = await response.json();
      //save data into variable
      setCourses(output.data);
    } catch (error) {
      toast.error("something went wrong");
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className=" bg-bgDark2 flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>
      <div className="">
        <div>
          <Filter
            category={category}
            setCategory={setCategory}
            filterData={filterData}
          />
        </div>
        <div className="w-11/12 max-w-[1200px] mx-auto flex justify-center items-center min-h-[50vh] flex-wrap">
          {loading ? (
            <Spinner />
          ) : (
            <Cards courses={courses} category={category} />
          )}
        </div>
      </div>
    </div>
  );
};
export default App;

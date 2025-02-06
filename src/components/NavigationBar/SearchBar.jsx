// import React from "react";
// import SearchIcon from "../../assets/Icons/SearchIcon.svg";

// const SearchBar = () => {
//   return (
//     <div className="flex items-center bg-white border border-[#BDBDBD] rounded-[8px] px-4 py-[6px] w-[250px]">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full outline-none bg-transparent text-gray-600 text-sm"
//       />
//       <img
//         src={SearchIcon}
//         alt="SearchIcon"
//         className="w-[20px] h-[20px] text-gray-400"
//       />
//     </div>
//   );
// };

// export default SearchBar;


// SECOND TRY 
// import React from "react";
// import { useDispatch } from "react-redux";
// import SearchIcon from "../../assets/Icons/SearchIcon.svg";
// import { setSearchTerm } from "../../Redux/Slices/SearchSlice";

// const SearchBar = () => {
//   const dispatch = useDispatch();

//   const handleSearch = (e) => {
//     dispatch(setSearchTerm(e.target.value));
//   };

//   return (
//     <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
//       <input
//         type="text"
//         placeholder="Search"
//         className="w-full outline-none bg-transparent text-gray-600 text-sm"
//         onChange={handleSearch}
//       />
//       <img
//         src={SearchIcon}
//         alt="Search"
//         className="w-5 h-5 text-gray-400"
//       />
//     </div>
//   );
// };

// export default SearchBar;  



// THIRD TRY  
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import SearchIcon from "../../assets/Icons/SearchIcon.svg";
import { setSearchTerm } from "../../redux/Slices/SearchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = () => {
    dispatch(setSearchTerm(searchInput));
    setSearchInput(""); 
  };

  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md">
      <input
        type="text"
        value={searchInput} 
        placeholder="Search"
        className="w-full outline-none bg-transparent text-gray-600 text-sm"
        onChange={handleInputChange}
      />
      <button
        type="button"
        onClick={handleSearch} 
        className="ml-2"
      >
        <img src={SearchIcon} alt="Search" className="w-5 h-5 text-gray-400" />
      </button>
    </div>
  );
};

export default SearchBar;


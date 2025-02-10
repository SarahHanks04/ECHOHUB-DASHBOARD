import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Spinner from "../Spinner/Spinner";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: false,
      // text: "Yearly Feedback and Complaints",
    },
    legend: {
      position: "top",
    },
  },
  responsive: true,
  scales: {
    x: {
      grid: {
        display: true,
      },
      stacked: false,
    },
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
      grid: {
        display: true,
      },
    },
  },

  datasets: {
    bar: {
      categoryPercentage: 0.6,
      barPercentage: 0.9,
    },
  },
};

const BASE_URL = "http://localhost:5000";

const BarChart = () => {
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Fetching data from API (only Feedback and Complaints)
  const {
    data: formData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["formData"],
    queryFn: async () => {
      const [feedbackResponse, complaintResponse] = await Promise.all([
        axios.get(`${BASE_URL}/responses?formType=feedback`),
        axios.get(`${BASE_URL}/responses?formType=complaint`),
      ]);

      return {
        feedback: feedbackResponse.data,
        complaint: complaintResponse.data,
      };
    },
  });

  useEffect(() => {
    if (formData) {
      // Unique years from all datasets
      const allYears = [
        ...new Set(
          Object.values(formData).flatMap((data) =>
            data.map((item) => new Date(item.submissionDate).getFullYear())
          )
        ),
      ].sort();

      setYears(allYears);
      setSelectedYear(allYears[0] || new Date().getFullYear());
    }
  }, [formData]);

  const filterDataByYear = (data, year) => {
    return months.map((month) => {
      return data.filter((item) => {
        const itemDate = new Date(item.submissionDate);
        return (
          itemDate.getFullYear() === year &&
          itemDate.toLocaleString("default", { month: "long" }) === month
        );
      }).length;
    });
  };

  const feedbackCounts =
    selectedYear && formData
      ? filterDataByYear(formData.feedback, selectedYear)
      : [];
  const complaintCounts =
    selectedYear && formData
      ? filterDataByYear(formData.complaint, selectedYear)
      : [];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Feedback",
        data: feedbackCounts,
        backgroundColor: "#FDBF17",
      },
      {
        label: "Complaints",
        data: complaintCounts,
        backgroundColor: "#13162D",
      },
    ],
  };

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (isError) return <div>Error fetching data</div>;

  return (
    <div className="w-full h-full p-2 rounded-[8px] bg-bulb-white">
      <Bar
        options={options}
        data={data}
        className="p-2 w-full h-full bg-bulb-white rounded-md"
      />
      <div className="flex justify-center space-x-6 mt-4">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`flex items-center space-x-2 text-sm font-medium cursor-pointer ${
              selectedYear === year ? "text-bulb-blue" : "text-[#000000B2]"
            }`}
          >
            <div
              className={`w-[6px] h-[6px] ${
                year === new Date().getFullYear() ? "bg-red-500" : "bg-gray-400"
              }`}
            ></div>
            <span>{year}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BarChart;

// import React, { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Bar } from "react-chartjs-2";
// import Spinner from "../Spinner/Spinner";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// export const options = {
//   plugins: {
//     title: {
//       display: true,
//       text: "Yearly Feedback, Complaints, and Events",
//     },
//     legend: {
//       position: "top",
//     },
//   },
//   responsive: true,
//   scales: {
//     x: {
//       grid: {
//         display: true,
//       },
//     },
//     y: {
//       beginAtZero: true,
//       ticks: {
//         stepSize: 1,
//       },
//       grid: {
//         display: true,
//       },
//     },
//   },
// };

// const BASE_URL = "http://localhost:5000";

// const BarChart = () => {
//   const [years, setYears] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(null);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   // Fetching data from API
//   const {
//     data: formData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["formData"],
//     queryFn: async () => {
//       const [feedbackResponse, complaintResponse, eventResponse] =
//         await Promise.all([
//           axios.get(`${BASE_URL}/responses?formType=feedback`),
//           axios.get(`${BASE_URL}/responses?formType=complaint`),
//           axios.get(`${BASE_URL}/responses?formType=event`),
//         ]);

//       return {
//         feedback: feedbackResponse.data,
//         complaint: complaintResponse.data,
//         event: eventResponse.data,
//       };
//     },
//   });

//   useEffect(() => {
//     if (formData) {
//       // Unique years from all datasets
//       const allYears = [
//         ...new Set(
//           Object.values(formData).flatMap((data) =>
//             data.map((item) => new Date(item.submissionDate).getFullYear())
//           )
//         ),
//       ].sort();

//       setYears(allYears);
//       setSelectedYear(allYears[0] || new Date().getFullYear());
//     }
//   }, [formData]);

//   const filterDataByYear = (data, year) => {
//     return months.map((month) => {
//       return data.filter((item) => {
//         const itemDate = new Date(item.submissionDate);
//         return (
//           itemDate.getFullYear() === year &&
//           itemDate.toLocaleString("default", { month: "long" }) === month
//         );
//       }).length;
//     });
//   };

//   const feedbackCounts =
//     selectedYear && formData
//       ? filterDataByYear(formData.feedback, selectedYear)
//       : [];
//   const complaintCounts =
//     selectedYear && formData
//       ? filterDataByYear(formData.complaint, selectedYear)
//       : [];
//   const eventCounts =
//     selectedYear && formData
//       ? filterDataByYear(formData.event, selectedYear)
//       : [];

//   const data = {
//     labels: months,
//     datasets: [
//       {
//         label: "Feedback",
//         data: feedbackCounts,
//         backgroundColor: "#FDBF17",
//       },
//       {
//         label: "Complaints",
//         data: complaintCounts,
//         backgroundColor: "#13162D",
//       },
//       {
//         label: "Events",
//         data: eventCounts,
//         backgroundColor: "#4CAF50",
//       },
//     ],
//   };

//   if (isLoading)
//     return (
//       <div>
//         <Spinner />
//       </div>
//     );
//   if (isError) return <div>Error fetching data</div>;

//   return (
//     <div className="w-full h-full p-6 rounded-[8px] bg-bulb-white">
//       <Bar
//         options={options}
//         data={data}
//         className="p-2 w-full h-full bg-bulb-white rounded-md"
//       />
//       <div className="flex justify-center space-x-6 mt-4">
//         {years.map((year) => (
//           <button
//             key={year}
//             onClick={() => setSelectedYear(year)}
//             className={`flex items-center space-x-2 text-sm font-medium cursor-pointer ${
//               selectedYear === year ? "text-bulb-blue" : "text-[#000000B2]"
//             }`}
//           >
//             <div
//               className={`w-[6px] h-[6px] ${
//                 year === new Date().getFullYear() ? "bg-red-500" : "bg-gray-400"
//               }`}
//             ></div>
//             <span>{year}</span>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BarChart;

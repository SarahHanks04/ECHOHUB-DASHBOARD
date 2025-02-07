// import { useMutateFormEvent } from "@/api/ResponseApi";
// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import { toast } from "react-toastify";

// const AdminFormCreator = () => {
//   const [formData, setFormData] = useState({
//     id: uuidv4().substr(0, 5),
//     formId: "",
//     formType: "",
//     title: "",
//     eventDate: "",
//     fields: [],
//   });

//   const mutateFormEvent = useMutateFormEvent();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     mutateFormEvent.mutate(
//       {
//         id: "",
//         data: formData,
//       },
//       {
//         onSuccess: () => {
//           toast.success("Form created successfully!");
//           setFormData({ ...formData, fields: [] });
//         },
//         onError: (error) => {
//           toast.error("Error creating form: " + error.message);
//         },
//       }
//     );
//   };

//   return (
//     <div className="flex justify-center items-center p-4 bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8"
//       >
//         <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
//           Create New Form
//         </h2>

//         <div className="space-y-4">
//           <input
//             name="formId"
//             value={formData.formId}
//             onChange={handleInputChange}
//             placeholder="Form ID"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             name="formType"
//             value={formData.formType}
//             onChange={handleInputChange}
//             placeholder="Form Type"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             placeholder="Title"
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />

//           <input
//             type="date"
//             name="eventDate"
//             value={formData.eventDate}
//             onChange={handleInputChange}
//             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all"
//         >
//           Create Form
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AdminFormCreator;

import { useMutateFormEvent } from "@/api/ResponseApi";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const AdminFormCreator = () => {
  const [formData, setFormData] = useState({
    id: uuidv4().substr(0, 5),
    formId: "",
    formType: "",
    title: "",
    eventDate: "",
    fields: [],
  });

  const queryClient = useQueryClient(); // Hook to access the query client
  const mutateFormEvent = useMutateFormEvent();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateFormEvent.mutate(
      {
        id: "",
        data: formData,
      },
      {
        onSuccess: () => {
          toast.success("Form created successfully!");
          setFormData({ ...formData, fields: [] }); // Reset form fields

          // Invalidate and refetch all form events
          queryClient.invalidateQueries(["formEvents"]);
        },
        onError: (error) => {
          toast.error("Error creating form: " + error.message);
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center p-4 bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6 md:p-8"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Create New Form
        </h2>

        <div className="space-y-4">
          <input
            name="formId"
            value={formData.formId}
            onChange={handleInputChange}
            placeholder="Form ID"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="formType"
            value={formData.formType}
            onChange={handleInputChange}
            placeholder="Form Type"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all"
        >
          Create Form
        </button>
      </form>
    </div>
  );
};

export default AdminFormCreator;

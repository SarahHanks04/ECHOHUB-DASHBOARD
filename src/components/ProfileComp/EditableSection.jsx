// import React from "react";
// import { Formik, Field } from "formik";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setEditing,
//   saveProfileToBackend,
//   updatePersonalInfo,
// } from "../../redux/Slices/ProfileSlice";
// import { EditIcon } from "lucide-react";

// const EditableSection = ({ section, title, fields }) => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.profile[section]);
//   const isEditing = useSelector((state) => state.profile.editing[section]);

//   const handleSave = async (values) => {
//     await dispatch(saveProfileToBackend({ [section]: values }));
//     dispatch(setEditing({ section, isEditing: false }));

//     // Sync local state after successful save
//     if (section === "personalInfo") {
//       dispatch(updatePersonalInfo(values));
//     }
//   };

//   return (
//     <section className="p-10 rounded shadow border-[1px] border-gray-300 bg-[#F9F6F4]">
//       <header className="flex justify-between items-center mb-[3.5rem]">
//         <h2 className="font-semibold text-[24px] text-[#000000]">{title}</h2>

//         <button
//           className="text-[#4A4848] bg-[#C7C6C6] flex items-center p-[8px] rounded gap-[8px]"
//           onClick={() =>
//             dispatch(setEditing({ section, isEditing: !isEditing }))
//           }
//         >
//           <span>Edit</span>
//           <EditIcon size={16} />
//         </button>
//       </header>
//       <Formik initialValues={data} onSubmit={handleSave}>
//         {({ handleSubmit }) => (
//           <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//             <div className="grid grid-cols-2 gap-4">
//               {fields.map((field) => (
//                 <div key={field.name} className="flex flex-col">
//                   <label className="text-[#000000] text-[18px] font-medium">
//                     {field.label}
//                   </label>
//                   <Field
//                     name={field.name}
//                     type={field.type || "text"}
//                     disabled={!isEditing}
//                     className="border p-2 rounded w-full text-[14px] text-[#4A4848] outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//             {isEditing && (
//               <button
//                 type="submit"
//                 className="bg-[#B5835E] text-white text-[13px] px-[12px] py-[6px] rounded"
//               >
//                 Save
//               </button>
//             )}
//           </form>
//         )}
//       </Formik>
//     </section>
//   );
// };

// export default EditableSection;

// import React from "react";
// import { Formik, Field } from "formik";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   setEditing,
//   saveProfileToBackend,
//   updatePersonalInfo,
//   updateLastUpdated,
// } from "../../redux/Slices/ProfileSlice";
// import { EditIcon } from "lucide-react";

// const EditableSection = ({ section, title, fields }) => {
//   const dispatch = useDispatch();
//   const data = useSelector((state) => state.profile[section]);
//   const isEditing = useSelector((state) => state.profile.editing[section]);

//   const handleSave = async (values) => {
//     try {
//       // Save to backend
//       await dispatch(saveProfileToBackend({ [section]: values })).unwrap();

//       // Update local state
//       if (section === "personalInfo") {
//         dispatch(updatePersonalInfo(values));
//       }

//       // Update lastUpdated timestamp
//       dispatch(updateLastUpdated());

//       // Exit editing mode
//       dispatch(setEditing({ section, isEditing: false }));
//     } catch (error) {
//       console.error("Failed to save changes:", error);
//     }
//   };

//   return (
//     <section className="p-10 rounded shadow border-[1px] border-gray-300 bg-[#F9F6F4]">
//       <header className="flex justify-between items-center mb-[3.5rem]">
//         <h2 className="font-semibold text-[24px] text-[#000000]">{title}</h2>

//         <button
//           className="text-[#4A4848] bg-[#C7C6C6] flex items-center p-[8px] rounded gap-[8px]"
//           onClick={() =>
//             dispatch(setEditing({ section, isEditing: !isEditing }))
//           }
//         >
//           <span>Edit</span>
//           <EditIcon size={16} />
//         </button>
//       </header>
//       <Formik initialValues={data} onSubmit={handleSave}>
//         {({ handleSubmit }) => (
//           <form onSubmit={handleSubmit} className="space-y-6 mt-4">
//             <div className="grid grid-cols-2 gap-4">
//               {fields.map((field) => (
//                 <div key={field.name} className="flex flex-col">
//                   <label className="text-[#000000] text-[18px] font-medium">
//                     {field.label}
//                   </label>
//                   <Field
//                     name={field.name}
//                     type={field.type || "text"}
//                     disabled={!isEditing}
//                     className="border p-2 rounded w-full text-[14px] text-[#4A4848] outline-none"
//                   />
//                 </div>
//               ))}
//             </div>
//             {isEditing && (
//               <button
//                 type="submit"
//                 className="bg-[#B5835E] text-white text-[13px] px-[12px] py-[6px] rounded"
//               >
//                 Save
//               </button>
//             )}
//           </form>
//         )}
//       </Formik>
//     </section>
//   );
// };

// export default EditableSection;

import React from "react";
import { Formik, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import {
  setEditing,
  saveProfileToBackend,
  updatePersonalInfo,
  updateLastUpdated,
} from "../../redux/Slices/ProfileSlice";
import Edit from "../../assets/Icons/Edit.svg";

const EditableSection = ({ section, title, fields }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.profile[section]);
  const isEditing = useSelector((state) => state.profile.editing[section]);

  const handleSave = async (values) => {
    try {
      // First update the local state
      if (section === "personalInfo") {
        dispatch(updatePersonalInfo(values));
      }

      // Save to backend
      await dispatch(saveProfileToBackend({ [section]: values })).unwrap();

      // Update the last updated timestamp
      dispatch(updateLastUpdated());

      dispatch(setEditing({ section, isEditing: false }));
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

  return (
    <section className="p-10 rounded shadow border-[1px] border-gray-300 bg-[#F9F6F4]">
      <header className="flex justify-between items-center mb-[3.5rem]">
        <h2 className="font-semibold text-[24px] text-[#000000]">{title}</h2>

        <button
          className="text-[#4A4848] bg-bulb-white border-[1.5px] border-gray-300 flex items-center p-[8px] rounded gap-[8px]"
          onClick={() =>
            dispatch(setEditing({ section, isEditing: !isEditing }))
          }
        >
          <span>{isEditing ? "Cancel" : "Edit"}</span>
          <img src={Edit} alt="EditIcon" sizes={10} />
        </button>
      </header>
      <Formik
        initialValues={data}
        onSubmit={handleSave}
        enableReinitialize={true}
      >
        {({ handleSubmit, dirty }) => (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="grid grid-cols-2 gap-4">
              {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                  <label className="text-[#000000] text-[18px] font-medium">
                    {field.label}
                  </label>
                  <Field
                    name={field.name}
                    type={field.type || "text"}
                    disabled={!isEditing}
                    className="border p-2 rounded w-full text-[14px] text-[#4A4848] outline-none"
                  />
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                type="submit"
                disabled={!dirty}
                className={`text-white text-[13px] px-[12px] py-[6px] rounded ${
                  dirty ? "bg-[#B5835E]" : "bg-[#B5835E]/50 cursor-not-allowed"
                }`}
              >
                Save Changes
              </button>
            )}
          </form>
        )}
      </Formik>
    </section>
  );
};

export default EditableSection;

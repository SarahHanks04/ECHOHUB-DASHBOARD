// import React, { useEffect } from "react";
// import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
// import { BASE_URL } from "@/api/api";
// import { useParams } from "react-router-dom";
// import { toast } from "react-toastify";
// import FieldEditor from "./FieldEditor";
// import { useQueryClient } from "@tanstack/react-query";

// const FormEditor = () => {
//   const { id } = useParams();
//   const params = useParams();
//   console.log("All params:", params);
//   console.log("Fetching form with ID:", id);
//   console.log("Constructed URL:", `${BASE_URL}/formEvents/${id}`);
//   const { data: form, isLoading, isError } = useFetchFormById(id);
//   const { mutate: updateForm } = useMutateFormEvent();

//   if (isLoading) return <div>Loading form...</div>;
//   if (isError) return <div>Error loading form</div>;
//   if (!form) return <div>Form not found</div>;

// //   useEffect(() => {
// //     console.log("Form data:", form);
// //     console.log("Is loading:", isLoading);
// //     console.log("Is error:", isError);
// //   }, [form, isLoading, isError]);

//   const handleSaveFields = (updatedFields) => {
//     // Prepare the data to send back to the server
//     const updatedForm = {
//       ...form, // Keep other form properties unchanged
//       fields: updatedFields, // Update only the fields
//     };

//     updateForm(
//       { id, data: updatedForm },
//       {
//         onSuccess: () => {
//           toast.success("Form updated successfully!");
//           // Optionally, you might want to refresh the form data here if needed
//           useQueryClient().invalidateQueries(['form', id]);
//         },
//         onError: (error) => {
//           toast.error("Error updating form: " + error.message);
//         },
//       }
//     );
//   };

//   return (
//     <div>
//       <FieldEditor fields={form.fields} onSave={handleSaveFields} />

//     </div>
//   );
// };

// export default FormEditor;

import React, { useEffect } from "react";
import { useFetchFormById, useMutateFormEvent } from "@/api/ResponseApi";
import { BASE_URL } from "@/api/api";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FieldEditor from "./FieldEditor";
import { useQueryClient } from "@tanstack/react-query";

const FormEditor = () => {
  const { formId } = useParams(); // Changed from id to formId
  const params = useParams();
  console.log("All params:", params);
  console.log("Fetching form with formId:", formId); // Changed log message
  console.log("Constructed URL:", `${BASE_URL}/formEvents/${formId}`); // Changed URL construction

  // Assuming useFetchFormById can handle 'formId' instead of 'id'
  const { data: form, isLoading, isError } = useFetchFormById(formId);

  const { mutate: updateForm } = useMutateFormEvent();

  if (isLoading) return <div>Loading form...</div>;
  if (isError) return <div>Error loading form</div>;
  if (!form) return <div>Form not found</div>;

  const handleSaveFields = (updatedFields) => {
    // Prepare the data to send back to the server
    const updatedForm = {
      ...form,
      fields: updatedFields,
    };

    updateForm(
      { formId, data: updatedForm }, // Changed from id to formId
      {
        onSuccess: () => {
          toast.success("Form updated successfully!");
          const queryClient = useQueryClient();
          queryClient.invalidateQueries(["form", formId]); // Changed from id to formId
        },
        onError: (error) => {
          toast.error("Error updating form: " + error.message);
        },
      }
    );
  };

  return (
    <div>
      <FieldEditor fields={form.fields} onSave={handleSaveFields} />
    </div>
  );
};

export default FormEditor;

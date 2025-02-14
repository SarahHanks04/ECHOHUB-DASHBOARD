import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  useFetchFormEvents,
  useMutateFormEvent,
  useDeleteFormEvent,
} from "@/api/ResponseApi";
import { toast, ToastContainer } from "react-toastify";
import FieldEditor from "./FieldEditor";
import { Trash } from "lucide-react";
import Spinner from "../Spinner/Spinner";

const AdminFormManager = () => {
  const queryClient = useQueryClient();
  const { data: forms, isLoading, error } = useFetchFormEvents();
  const { mutate: saveForm } = useMutateFormEvent();
  const { mutate: deleteForm } = useDeleteFormEvent();

  const [selectedForm, setSelectedForm] = useState(null);

  const handleFormSelect = (form) => {
    setSelectedForm(form);
  };

  const handleSaveForm = (updatedFields) => {
    if (!selectedForm) return;

    const updatedForm = {
      ...selectedForm,
      fields: updatedFields,
    };

    saveForm(
      { id: selectedForm.id, data: updatedForm },
      {
        onSuccess: () => {
          toast.success("Form updated successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          queryClient.invalidateQueries(["formEvents"]);
        },
        onError: () => {
          toast.error("Failed to update the form. Please try again.");
        },
      }
    );
  };

  const handleDeleteForm = (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      deleteForm(id, {
        onSuccess: () => {
          toast.success("Form deleted successfully!");
          setSelectedForm(null);
        },
        onError: () => {
          toast.error("Failed to delete the form. Please try again.");
        },
      });
    }
  };

  if (isLoading)
    return (
      <div className="p-4 text-center">
        <Spinner />
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-center text-red-500">Error loading forms.</div>
    );

  return (
    <div className="h-full bg-bulb-lightBlue p-4 md:p-6 lg:p-8 ml-0 md:ml-56">
      {/* Centered h1 */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Form Management</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Form List */}
        <div className="w-full md:w-1/4">
          <h2 className="text-xl font-semibold mb-4">Forms</h2>
          <ul className="space-y-2">
            {forms.map((form) => (
              <li
                key={form.id}
                className={`p-2 cursor-pointer rounded-lg transition-colors ${
                  selectedForm?.id === form.id
                    ? "bg-bulb-yellow text-bulb-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleFormSelect(form)}
              >
                <div className="flex items-center justify-between">
                  <span>{form.formType}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteForm(form.id);
                    }}
                    className="text-red-500 text-sm hover:text-red-700"
                  >
                    <Trash size={12} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Form Editor */}
        <div className="w-full md:w-3/4">
          {selectedForm ? (
            <>
              <h2 className="text-xl flex justify-center items-center font-semibold mb-4">
                Editing: {selectedForm.formType}
              </h2>
              <FieldEditor
                key={selectedForm.id}
                fields={selectedForm.fields}
                onSave={handleSaveForm}
              />
            </>
          ) : (
            <div className="text-gray-500 text-sm">Select a form to edit.</div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default AdminFormManager;

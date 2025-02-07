import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notification from "../Notification/Notification";
import FieldEditor from "../Editor/FieldEditor";
import Spinner from "../Spinner/Spinner";
import { useMutateFormEvent, useFetchFormById } from "@/api/ResponseApi";

const AdminFormView = () => {
  const { formId } = useParams();
//   console.log("AdminComplaintView received formId:", formId);

  const { data: form, isLoading, error, refetch } = useFetchFormById(formId);
  const { mutate: saveForm } = useMutateFormEvent();
  const [message, setMessage] = useState("");

  useEffect(() => {
    refetch();
  }, [formId]);

  useEffect(() => {
    if (error) {
      setMessage("Failed to fetch form data");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (!form || !form.fields) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg text-center">
        <Notification message="Form not found" type="error" />
      </div>
    );
  }

  const handleSave = (updatedFields) => {
    console.log("Saving form with fields:", updatedFields);
    if (!updatedFields || updatedFields.length === 0) {
      setMessage("Error: No fields to save.");
      return;
    }
    saveForm(
      { id: formId, data: { ...form, fields: updatedFields } },
      {
        onSuccess: () => {
          setMessage("Form updated successfully!");
          setTimeout(() => refetch(), 500);
        },
      }
    );
  };

  return (
    <div className="max-w-5xl mt-[3.4rem] mx-auto p-6 md:p-8 bg-bulb-lightBlue shadow-lg rounded-lg">
      {message && (
        <Notification
          message={message}
          type="success"
          className="mb-4 text-center"
        />
      )}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-6">
        Admin Editor
      </h1>
      {form?.fields ? (
        <FieldEditor fields={form.fields} onSave={handleSave} />
      ) : (
        <Notification message="Complaint form fields not found" type="error" />
      )}
    </div>
  );
};

export default AdminFormView;

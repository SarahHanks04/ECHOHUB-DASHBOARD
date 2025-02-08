import { useFetchResponses } from "@/api/ResponseApi";
import React, { useState } from "react";
import Modal from "react-modal";
import Spinner from "./Spinner/Spinner";
import { X } from "lucide-react";

Modal.setAppElement("#root"); // Replace '#root' with your root element id

const SuggestionList = () => {
  const { data: responses, isLoading, isError } = useFetchResponses();
  const [isModalOpen, setIsModalOpen] = useState(true);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-lg">
        Error loading suggestions
      </div>
    );

  const suggestions = responses.filter(
    (response) => response.formType === "suggestion"
  );

  if (suggestions.length === 0) {
    return (
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="No Suggestions"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        overlayClassName="modal-overlay"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
          <h2 className="text-lg font-semibold">
            OOPS! No suggestions available.
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-4">
        User Suggestions
      </h2>
      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all"
          >
            <p className="text-gray-700">
              {
                suggestion.data.find((field) => field.type === "textarea")
                  ?.value
              }
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;

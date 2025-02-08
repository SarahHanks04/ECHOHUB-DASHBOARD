import AdminFormCreator from "@/utils/Editor/AdminFormCreator";
import FormEditor from "@/utils/Editor/FormEditor";
import AdminFeedbackView from "@/views/AdminFeedbackView";
import AdminFormView from "@/views/AdminFormView";
import React from "react";

const Editor = () => {
  return (
    <div>
      <AdminFormCreator />
      <FormEditor />
      {/* <AdminFeedbackView /> */}
      {/* <AdminFormView /> */}
    </div>
  );
};

export default Editor;

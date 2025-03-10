import React, { useState } from "react";
import FroalaEditorComponent from "react-froala-wysiwyg";
import "froala-editor/js/plugins.pkgd.min.js"; // Import Froala plugins

const RichTextEditor = ({ setContent }) => {
  const [editorContent, setEditorContent] = useState("");

  // Handle changes in editor
  const handleModelChange = (content) => {
    setEditorContent(content);
    setContent(content); // Pass content to parent component if needed
  };

  return (
    <div>
      {/* Froala Editor */}
      <FroalaEditorComponent
        tag="textarea"
        model={editorContent}
        onModelChange={handleModelChange}
        config={{
          placeholderText: "Start typing...",
          toolbarButtons: [
            "bold",
            "italic",
            "underline",
            "strikeThrough",
            "|",
            "formatOL",
            "formatUL",
            "paragraphFormat",
            "|",
            "align",
            "insertLink",
            "insertImage",
            "insertTable",
            "|",
            "undo",
            "redo",
            "fullscreen",
          ],
          quickInsertTags: ["image", "video", "table"],
          theme: "royal",
        }}
      />
    </div>
  );
};

export default RichTextEditor;

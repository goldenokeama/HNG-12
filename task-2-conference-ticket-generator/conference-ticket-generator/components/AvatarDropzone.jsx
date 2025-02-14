import React, { useCallback } from "react";

import { useDropzone } from "react-dropzone";

const AvatarDropzone = ({ onFileUpload }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Pass the uploaded file to the parent component
      onFileUpload(acceptedFiles[0]);
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*", // Accept only image files
  });

  // border-2 border-dashed p-6 rounded-lg cursor-pointer
  return (
    <div {...getRootProps()} className={isDragActive ? "active" : "not-active"}>
      <input {...getInputProps()} />
      <p className="avatar-dropzone-text">
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop or click to upload"}
      </p>
    </div>
  );
};

export default AvatarDropzone;

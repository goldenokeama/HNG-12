import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloudinary } from "@cloudinary/url-gen";

const cloudinaryCore = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
});

const AvatarDropzone = ({ onUpload }) => {
  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ticket_avatar_upload");

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${
        import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
      }/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    // Pass URL to parent component
    onUpload(data.secure_url);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });
  const active = {
    color: "#4caf50",
  };

  return (
    <div
      {...getRootProps()}
      className={isDragActive ? "drag-zone-active" : "not-active"}
    >
      <input {...getInputProps()} />

      <p className="avatar-dropzone-text" style={isDragActive ? active : {}}>
        {isDragActive
          ? "Drop the image here..."
          : "Drag & drop or click to upload"}
      </p>
    </div>
  );
};

export default AvatarDropzone;

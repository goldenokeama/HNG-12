import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Cloudinary } from "@cloudinary/url-gen";

const cloudinaryCore = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
});

const AvatarDropzone = ({ onUpload }) => {
  // const [preview, setPreview] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Preview the image
    // const previewUrl = URL.createObjectURL(file);
    // setPreview(previewUrl);

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
    onUpload(data.secure_url); // Pass URL to parent component
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

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

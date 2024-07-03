import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://backend-feather.vercel.app/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("File uploaded successfully");
      setUploadedFile(response.data.file);
    } catch (error) {
      console.error("There was an error uploading the file!", error);
      setMessage("Error uploading file");
    }
  };

  return (
    <div>
      <h2>File Upload</h2>
      <form onSubmit={onFileUpload}>
        <input type="file" onChange={onFileChange} />
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
      {uploadedFile && (
        <div>
          <h3>Uploaded File:</h3>
          {uploadedFile.mimetype.startsWith("image/") ? (
            <img
              src={`https://backend-feather.vercel.app/uploads/${uploadedFile.filename}`}
              alt={uploadedFile.originalname}
              style={{ width: "300px" }}
            />
          ) : (
            <video
              width={500}
              src={`https://backend-feather.vercel.app/uploads/${uploadedFile.filename}`}
              download
              autoPlay
              controls
              loop
            >
              {uploadedFile.originalname}
            </video>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

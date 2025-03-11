import React, { useState } from "react";
import { DOMParser } from "@xmldom/xmldom";
import * as toGeoJSON from "@tmcw/togeojson";

interface FileUploaderProps {
  onFileParsed: (data: any) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileParsed }) => {
  const [fileName, setFileName] = useState<string>("No file chosen");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".kml")) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const parser = new DOMParser();
        const kml = parser.parseFromString(text, "text/xml");
        const geoJson = toGeoJSON.kml(kml);
        onFileParsed(geoJson);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid KML file.");
    }
  };

  return (
    <div className="file-upload-container">
      <input type="file" id="file-upload" className="file-upload" accept=".kml" onChange={handleFileUpload} />
      <label htmlFor="file-upload" className="file-upload-label">
        Choose File
      </label>
      <span style={{ marginLeft: "10px", fontSize: "14px", color: "#555" }}>{fileName}</span>
    </div>
  );
};

export default FileUploader;

import React, { useState } from "react";
import FileUploader from "./components/FileUploader";
import SummaryTable from "./components/SummaryTable";
import DetailsTable from "./components/DetailsTable";
import MapComponent from "./components/MapComponent";
import "./App.css"; 

const App: React.FC = () => {
  const [geoData, setGeoData] = useState<any>(null);

  return (
    <div className="container">
    
      <h1>KML File Viewer</h1>

      
      <FileUploader onFileParsed={setGeoData} />

      
      {geoData && (
        <div className="content">
          <div className="left-panel">
            <SummaryTable data={geoData} />
            
          </div>
          <div className="left-panel">
          <DetailsTable data={geoData} />
            
          </div>

          
          <div className="map-container">
            <MapComponent data={geoData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

import React, { useState } from "react";

interface DetailsTableProps {
  data: any;
}

const calculateLength = (coordinates: number[][]) => {
  let totalLength = 0;
  for (let i = 1; i < coordinates.length; i++) {
    const [lon1, lat1] = coordinates[i - 1];
    const [lon2, lat2] = coordinates[i];
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    totalLength += R * c;
  }
  return totalLength.toFixed(2);
};

const DetailsTable: React.FC<DetailsTableProps> = ({ data }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!data) return null;

  return (
    <div className="section">
      <button onClick={() => setShowDetails(!showDetails)} className="btn">
        {showDetails ? "Hide Details" : "Show Details"}
      </button>
      {showDetails && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Total Length (km)</th>
            </tr>
          </thead>
          <tbody>
            {data.features
              .filter((feature: any) => feature.geometry.type.includes("LineString"))
              .map((feature: any, index: number) => (
                <tr key={index}>
                  <td>{feature.geometry.type}</td>
                  <td>{calculateLength(feature.geometry.coordinates)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetailsTable;

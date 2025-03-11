import React, { useState } from "react";

interface SummaryTableProps {
  data: any;
}

const SummaryTable: React.FC<SummaryTableProps> = ({ data }) => {
  const [showSummary, setShowSummary] = useState(false);

  if (!data) return null;

  const elementCounts = data.features.reduce((acc: Record<string, number>, feature: any) => {
    const type = feature.geometry.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="section">
      <button onClick={() => setShowSummary(!showSummary)} className="btn">
        {showSummary ? "Hide Summary" : "Show Summary"}
      </button>
      {showSummary && (
        <table className="styled-table">
          <thead>
            <tr>
              <th>Element Type</th>
              <th>Count</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(elementCounts).map(([type, count]) => (
              <tr key={type}>
                <td>{type}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SummaryTable;

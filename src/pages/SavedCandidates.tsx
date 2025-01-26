import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import "../styles/app.css";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

  return (
    <div>
      <h1>Potential Candidates</h1>

      {savedCandidates.length === 0 ? (
        <p>No candidates have been accepted yet.</p>
      ) : (
        <table className="candidate-table">  
          {/* Display saved candidates in table format */}
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Company</th>
              <th>Location</th>
              <th>Email</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.name} width="50" />
                </td>
                <td>{candidate.name}</td>
                <td>{candidate.company}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td>{candidate.bio}</td>
                <td>
                  <button>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;

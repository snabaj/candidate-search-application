import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
  }, []);

// Function to remove candidate when "Reject" is clicked
const handleRejectCandidate = (index: number) => {
  const updatedCandidates = savedCandidates.filter((_, i) => i !== index);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
};

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
                  <img src={candidate.avatar_url} alt={candidate.username} width="50" />
                </td>
                <td>{candidate.username}</td>
                <td>{candidate.company}</td>
                <td>{candidate.location}</td>
                <td style={{ color: 'blue' }}>{candidate.email}</td>
                <td>{candidate.bio}</td>
                <td>
                  <button 
                  onClick={() => handleRejectCandidate(index)} style={{ backgroundColor: 'red' }} 
                    >Reject</button>
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

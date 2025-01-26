import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";
import './app.css';

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
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Company</th>
              <th>Location</th>
              <th>Email</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map((candidate, index) => (
              <tr key={index}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.name} width="50" />
                </td>
                <td>{candidate.name}</td>
                <td>@{candidate.username}</td>
                <td>{candidate.company}</td>
                <td>{candidate.location}</td>
                <td>{candidate.email}</td>
                <td><a href={candidate.html_url} target="_blank">GitHub</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;

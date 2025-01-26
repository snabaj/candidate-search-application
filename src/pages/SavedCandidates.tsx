import { useState, useEffect } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

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
        <ul>
          {savedCandidates.map((candidate, index) => (
            <li key={index}>
              <img src={candidate.avatar_url} alt={candidate.name} width="50" />
              <p><strong>{candidate.name} (@{candidate.username})</strong></p>
              <p>Company: {candidate.company}</p>
              <p>Location: {candidate.location}</p>
              <p>Email: {candidate.email}</p>
              <a href={candidate.html_url} target="_blank">GitHub Profile</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;

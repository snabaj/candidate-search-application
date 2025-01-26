import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      if (data.length === 0) {
        setError('No more candidates available.');
        return;
      }

      setCandidates(data.map((user: any) => ({
        avatar_url: user.avatar_url,
        name: user.name || user.login,
        username: user.login,
        company: user.company || 'N/A',
        location: user.location || 'Unknown',
        email: user.email || 'Not available',
        html_url: user.html_url,
        rejected: false,
      })));

      setCurrentCandidate(data[0]); // Display first candidate initially
    } catch (err) {
      setError('Failed to fetch candidates.');
    } finally {
      setLoading(false);
    }
  };

  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedSavedCandidates = [...savedCandidates, currentCandidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      nextCandidate();
    }
  };

  const nextCandidate = () => {
    if (candidates.length > 1) {
      setCandidates(candidates.slice(1));
      setCurrentCandidate(candidates[1]);
    } else {
      setCurrentCandidate(null);
      setError('No more candidates available.');
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading && <p>Loading candidates...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={currentCandidate.name} width="100" />
          <h2>{currentCandidate.name} (@{currentCandidate.username})</h2>
          <p>Company: {currentCandidate.company}</p>
          <p>Location: {currentCandidate.location}</p>
          <p>Email: {currentCandidate.email}</p>
          <a href={currentCandidate.html_url} target="_blank">GitHub Profile</a>
          <br />
          <button onClick={saveCandidate}>➕ Save Candidate</button>
          <button onClick={nextCandidate}>➖ Skip Candidate</button>
        </div>
      ) : (
        <p>No more candidates to review.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

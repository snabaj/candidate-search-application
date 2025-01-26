import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await searchGithub();
      setCandidates(data.map((user: any) => ({
        avatar_url: user.avatar_url,
        name: user.login,
        company: user.company || 'N/A',
        location: user.location || 'Unknown',
        email: user.email || 'Not available',
        bio: user.bio || 'No bio available',
        rejected: false,
      })));
    } catch (err) {
      setError('Failed to fetch candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUser = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await searchGithubUser(username);
      setSelectedCandidate({
        avatar_url: user.avatar_url,
        name: user.name || username,
        company: user.company || 'N/A',
        location: user.location || 'Unknown',
        email: user.email || 'Not available',
        bio: user.bio || 'No bio available',
        rejected: false,
      });
    } catch (err) {
      setError('User not found.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <button onClick={fetchCandidates} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Candidates'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {candidates.map((candidate, index) => (
          <li key={index}>
            <img src={candidate.avatar_url} alt={candidate.name} width="50" />
            <strong>{candidate.name}</strong> - {candidate.company}
          </li>
        ))}
      </ul>

      <div>
        <h2>Search GitHub User</h2>
        <input
          type="text"
          placeholder="Enter GitHub username"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearchUser(e.currentTarget.value);
          }}
        />
      </div>

      {selectedCandidate && (
        <div>
          <h3>Selected Candidate</h3>
          <img src={selectedCandidate.avatar_url} alt={selectedCandidate.name} width="80" />
          <p>Name: {selectedCandidate.name}</p>
          <p>Company: {selectedCandidate.company}</p>
          <p>Location: {selectedCandidate.location}</p>
          <p>Email: {selectedCandidate.email}</p>
          <p>Bio: {selectedCandidate.bio}</p>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;

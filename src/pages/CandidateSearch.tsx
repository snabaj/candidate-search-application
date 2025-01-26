import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';


const CandidateSearch = () => {
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [candidatesList, setCandidatesList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const storedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(storedCandidates);
    fetchInitialCandidates();
  }, []);

  const fetchInitialCandidates = async () => {
    setLoading(true);
    setError(null);
    try {
      const users = await searchGithub();
      if (!users || users.length === 0) {
        setError('No candidates found.');
        return;
      }

      // Extract usernames from API response
      const usernames = users.map((user: any) => user.login);
      setCandidatesList(usernames);

      fetchCandidate(usernames[0]); // Load first candidate immediately
    } catch (err) {
      setError('Failed to fetch candidates.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidate = async (username: string) => {
    setLoading(true);
    setError(null);
    try {
      const user = await searchGithubUser(username);
      if (!user || Object.keys(user).length === 0) {
        setError('Candidate data not available.');
        setCurrentCandidate(null);
        return;
      }

      setCurrentCandidate({
        avatar_url: user.avatar_url,
        username: user.login,
        company: user.company || 'N/A',
        location: user.location || 'Unknown',
        email: user.email || 'Not available',
        bio: user.bio || 'No bio available',
      });
    } catch (err) {
      setError('Error fetching candidate data.');
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
    if (currentIndex < candidatesList.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      fetchCandidate(candidatesList[nextIndex]);
    } else {
      setCurrentCandidate(null);
      setError('No more candidates available.');
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      {loading && <p>Loading candidate...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {currentCandidate ? (
        <div className="candidate-card"> 
          {/* Display candidate info in card format */}
          <img src={currentCandidate.avatar_url} alt={currentCandidate.username} />
          <h2>@{currentCandidate.username}</h2>
          <p><strong>Company:</strong> {currentCandidate.company}</p>
          <p><strong>Location:</strong> {currentCandidate.location}</p>
          <p><strong>Email:</strong> {currentCandidate.email}</p>
          <p><strong>Bio:</strong> {currentCandidate.bio}</p>
          <div className="card-actions">

          <button 
  onClick={saveCandidate} 
  style={{ backgroundColor: 'green' }}
>
  ➕ Save Candidate
</button>
<button 
  onClick={nextCandidate} 
  style={{ backgroundColor: 'red' }}
>
  ➖ Skip Candidate
</button>

          </div>
        </div>
      ) : (
        <p>No more candidates to review.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

import { createContext, useContext, useState, useEffect } from 'react';

// Votes context for managing battle votes and rankings
const VotesContext = createContext();

export const VotesProvider = ({ children }) => {
  const [votes, setVotes] = useState({});
  const [rankings, setRankings] = useState([]);

  // Load votes from localStorage on mount
  useEffect(() => {
    const storedVotes = localStorage.getItem('streamMixVotes');
    if (storedVotes) {
      setVotes(JSON.parse(storedVotes));
    }
  }, []);

  // Save votes to localStorage whenever votes change
  useEffect(() => {
    localStorage.setItem('streamMixVotes', JSON.stringify(votes));
    // Update rankings based on votes
    const sortedRankings = Object.entries(votes)
      .sort(([, a], [, b]) => b - a)
      .map(([id, score]) => ({ id, score }));
    setRankings(sortedRankings);
  }, [votes]);

  const addVote = (itemId) => {
    setVotes(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
  };

  const getVoteCount = (itemId) => votes[itemId] || 0;

  return (
    <VotesContext.Provider value={{ votes, rankings, addVote, getVoteCount }}>
      {children}
    </VotesContext.Provider>
  );
};

export const useVotesContext = () => {
  const context = useContext(VotesContext);
  if (!context) {
    throw new Error('useVotesContext must be used within a VotesProvider');
  }
  return context;
};

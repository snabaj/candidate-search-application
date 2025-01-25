// TODO: Create an interface for the Candidate objects returned by the API

export interface Candidate {
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  email: string;
  bio: string;
  rejected: boolean;
}
export interface CandidateSearchProps {
  candidates: Candidate[];
}
export interface CandidateSearchState {
  candidates: Candidate[];
}

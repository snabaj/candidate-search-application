// An interface for the Candidate objects returned by the API

export interface Candidate {
  avatar_url: string;
  username: string;
  company: string;
  location: string;
  email: string;
  bio: string;
}
import {UserDTO} from "../authentication/authentication-model";

export class TopicDTO {
  id: number;
  name: string;
  evidences: EvidenceDTO[];
  hypotheses: string[];
}

export class EvidenceDTO {
  id: number;
  topicId: number;
  evidence: string;
  source: string;
  credibility: string;
  hypotheses: { [key: number]: string; };
  creator: UserDTO;
  comments: EvidenceCommentDTO[];
}


export class EvidenceCommentDTO {
  id: number;
  evidenceId: number;
  comment: string;
  user: UserDTO;
}

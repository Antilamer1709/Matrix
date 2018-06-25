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
}

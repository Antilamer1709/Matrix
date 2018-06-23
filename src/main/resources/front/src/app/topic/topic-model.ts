export class TopicDTO {
  id: number;
  name: string;
  evidences: EvidenceDTO[];
  hypotheses: string[];
}

export class EvidenceDTO {
  id: number;
  evidence: string;
  source: string;
}

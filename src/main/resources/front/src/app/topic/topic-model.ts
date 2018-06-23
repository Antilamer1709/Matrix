export class TopicDTO {
  id: number;
  name: string;
  evidences: EvidenceDTO[];
}

export class EvidenceDTO {
  id: number;
  evidence: string;
  source: string;
}

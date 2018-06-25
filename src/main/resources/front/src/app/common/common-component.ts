import {SelectItem} from "primeng/api";

export class CommonComponent {

  suppotOptions: SelectItem[];
  credibilityOptions: SelectItem[];

  constructor() {}

  public initDicts(): void {
    this.suppotOptions = [
      { label: 'Select support', value: null },
      { label: 'Strongly support', value: '++' },
      { label: 'Support', value: '+' },
      { label: 'Neutral', value: '0' },
      { label: 'Dispute', value: '-' },
      { label: 'Strongly dispute', value: '--' }
    ];
    this.credibilityOptions = [
      { label: 'Select credibility', value: null },
      { label: 'Very credible', value: '++' },
      { label: 'Credible', value: '+' },
      { label: 'Unknown', value: '0' },
      { label: 'Doubtful', value: '-' },
      { label: 'Very doubtful', value: '--' }
    ];
  }

}

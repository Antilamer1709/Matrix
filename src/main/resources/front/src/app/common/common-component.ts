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

  public getColorStyle(rowData, col): string {
    let field = this.getFieldValue(rowData, col);
    switch (field) {
      case "0": {
        return 'normalCell';
      }
      case "++": {
        return 'veryGoodCell';
      }
      case "+": {
        return 'goodCell';
      }
      case "-": {
        return 'badCell';
      }
      case "--": {
        return 'varyBadCell';
      }
      default: {
        return null
      }
    }
  }
  private getFieldValue(rowData, col): string {
    if (isNaN(Number(col.field))) {
      return rowData[col.field]
    } else {
      return rowData.hypotheses[col.field];
    }
  }

}

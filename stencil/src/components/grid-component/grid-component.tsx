import { Component, Prop, h, State, Watch } from '@stencil/core';

@Component({
  tag: 'app-grid',
  styleUrl: 'grid-component.scss',
  scoped: true,
})
export class GridComponent {
  @Prop() items: string;
  @State() internalOptions: string[];
  gridContent: any;

  componentWillLoad() {
    this.parseOptions();
  }

  @Watch('items')
  parseOptions() {
    if (this.items) {
      this.gridContent = JSON.parse(this.items);
    }
  }

  render() {
    return (
      <div class="grid">
        <div class="header">
          <h2>{this.gridContent[0]}</h2>
        </div>
        <br />
        <div class="subtitle">
          {this.gridContent[1]}
          <br />
        </div>
        <div class="content">{this.gridContent[2]}</div>
      </div>
    );
  }
}

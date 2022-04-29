import { Component, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'my-event-component',
  shadow: true,
})
export class MyEventComponent {
  @Event() myEvent: EventEmitter<string>;

  render() {
    return (
      <div>
        <button onClick={() => this.myEvent.emit('Hello World')}>Click me to emit an event</button>
      </div>
    );
  }
}

import type { EventSpy } from '../page/event-spy';

export function toHaveReceivedEvent(eventSpy: EventSpy) {
  if (!eventSpy) {
    return {
      message: () => `toHaveReceivedEvent event spy is null`,
      pass: false,
    };
  }

  if (typeof (eventSpy as any).then === 'function') {
    return {
      message: () =>
        `expected spy to have received event, but it was not resolved (did you forget an await operator?).`,
      pass: false,
    };
  }

  const pass = eventSpy.events.length > 0;

  return {
    message: () => `expected to have ${pass ? 'not ' : ''}called "${eventSpy.eventName}" event`,
    pass: pass,
  };
}

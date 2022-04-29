import { expect } from '@playwright/test';
import type { EventSpy } from '../page/event-spy';
import deepEqual from 'fast-deep-equal';

export function toHaveNthReceivedEventDetail(eventSpy: EventSpy, index: number, eventDetail: any) {
  if (!eventSpy) {
    return {
      message: () => `toHaveReceivedEventDetail event spy is null`,
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

  if (!eventSpy.eventName) {
    return {
      message: () => `toHaveReceivedEventDetail did not receive an event spy`,
      pass: false
    }
  }

  const event = eventSpy.events[index];

  if (!event) {
    return {
      message: () => `event at index ${index} was not received`,
      pass: false
    }
  }

  const pass = deepEqual(eventSpy.lastEvent.detail, eventDetail);

  expect(eventSpy.lastEvent.detail).toEqual(eventDetail);

  return {
    message: () => `expected event "${eventSpy.eventName}" detail to ${pass ? 'not ' : ''}equal`,
    pass: pass,
  };
}

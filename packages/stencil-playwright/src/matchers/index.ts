import { toHaveNthReceivedEventDetail } from "./toHaveNthReceivedEventDetail";
import { toHaveReceivedEvent } from "./toHaveReceivedEvent";
import { toHaveReceivedEventDetail } from "./toHaveReceivedEventDetail";
import { toHaveReceivedEventTimes } from "./toHaveReceivedEventTimes";

export const matchers = {
  toHaveReceivedEvent,
  toHaveReceivedEventTimes,
  toHaveReceivedEventDetail,
  toHaveNthReceivedEventDetail
}
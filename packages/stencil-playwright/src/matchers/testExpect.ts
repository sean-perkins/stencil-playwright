interface CustomMatchers<R = unknown> {
  /**
   * Will check if the event spy received the expected event.
   */
  toHaveReceivedEvent(): R;
  /**
   * Will check if the event spy received the expected event a specific number of times.
   * @param count The number of times the event should have been called.
   */
  toHaveReceivedEventTimes(count: number): R;
  /**
   * Will check if the event spy received the expected event with the expected detail.
   * @param eventDetail The expected detail of the event.
   */
  toHaveReceivedEventDetail(eventDetail: any): R;
  /**
   * Will check if the event spy received the expected event with the expected detail at a specific index.
   * @param index The index of the event to check.
   * @param eventDetail The expected detail of the event.
   */
  toHaveNthReceivedEventDetail(index: number, eventDetail: any): R;
}

declare global {
  namespace PlaywrightTest {
    interface Matchers<R> extends CustomMatchers<R> { }
  }
}

export { };
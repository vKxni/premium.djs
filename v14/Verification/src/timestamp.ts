export class Timestamp {
  /**
   * Discord Timestamps
   * @param timestamp The timestamp to convert to a readable string
   * @requires [UNIX](https://en.wikipedia.org/wiki/Unix_time) timestamp in `milliseconds`
   */
  constructor(private readonly timestamp: number) {
    if (this.timestamp < 0)
      throw new Error("Timestamp must be a positive number");
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getRelativeTime();
   * // => a few seconds ago
   * ```
   * @returns {string} The relative time from this timestamp to now
   */
  public getRelativeTime(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:R>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getShortDateTime();
   * // => 5 March 2022 9:48 PM
   * ```
   * @returns {string} The date and time in the format of `Date Month Year HH:MM`
   */
  public getShortDateTime(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:f>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getLongDateTime();
   * // => Saturday, 5 March 2022 9:48 PM
   * ```
   * @returns {string} The date and time in the format of `Day Date Month Year HH:MM`
   */
  public getLongDateTime(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:F>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getShortDate();
   * // => 05/03/2022
   * ```
   * @returns {string} The date and time in the format of `DD/MM/YYYY`
   */
  public getShortDate(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:d>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getLongDate();
   * // => 5 March 2022
   * ```
   * @returns {string} The date and time in the format of `Date Month Year`
   */
  public getLongDate(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:D>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getShortTime();
   * // => 9:48 PM
   * ```
   * @returns {string} The date and time in the format of `HH:MM`
   */
  public getShortTime(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:t>`;
  }
  /**
   * @example
   * ```ts
   * const timestamp = new Timestamp(Date.now());
   * timestamp.getLongTime();
   * // => 9:48:38 PM
   * ```
   * @returns {string} The date and time in the format of `HH:MM:SS`
   */
  public getLongTime(): string {
    return `<t:${Math.floor(this.timestamp / 1000)}:T>`;
  }
}

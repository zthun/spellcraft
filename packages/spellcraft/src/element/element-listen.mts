/**
 * Represents a listening state for an event on a child target.
 */
export interface IZElementListen {
  /**
   * The selector to listen on.
   *
   * You can specify just a tag name here and use name
   * to get a named listen background element.
   */
  selector: string;

  /**
   * The event name to listen to.
   *
   * If this is undefined, then components will
   * listen for 'change'
   */
  event?: string;
}

/**
 * A builder that constructs a listen object.
 */
export class ZElementListenBuilder {
  private _listen: IZElementListen;

  /**
   * Initializes a new instance of this object.
   */
  public constructor() {
    this._listen = {
      selector: ''
    };
  }

  /**
   * Sets the entire selector.
   *
   * @param value -
   *        The value to set.
   *
   * @returns
   *        This object.
   */
  public selector(value: string) {
    this._listen.selector = value;
    return this;
  }

  /**
   * Sets the selector to the tag name with a name attribute or a data-name attribute.
   */
  public namedElement(tag: string, name: string) {
    return this.selector(`${tag}[name="${name}"],${tag}[data-name="${name}"]`);
  }

  /**
   * Sets the event name.
   *
   * @param value -
   *        The event name.
   *
   * @returns
   *        This object.
   */
  public event(value: string) {
    this._listen.event = value;
    return this;
  }

  /**
   * Sets the event to 'change'.
   *
   * @returns
   *        This object.
   */
  public change = this.event.bind(this, 'change');

  /**
   * Builds the constructed listen object.
   *
   * @returns
   *        The built listen object.
   */
  public build(): IZElementListen {
    return structuredClone(this._listen);
  }
}

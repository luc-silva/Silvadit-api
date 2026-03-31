import { ApiResource, ILink, IMetadata } from '~/utils/resource';

export class ResourceBuilder<T> {
  private success: boolean = true;
  private message: string = 'Request successful';
  private statusCode: number = 200;
  private data: T;
  private meta?: IMetadata;
  private _links: ILink[] = [];

  constructor(data: T) {
    this.data = data;
  }

  setSuccess(success: boolean): this {
    this.success = success;
    return this;
  }

  setMessage(message: string): this {
    this.message = message;
    return this;
  }

  setStatusCode(statusCode: number): this {
    this.statusCode = statusCode;
    return this;
  }

  setMeta(meta: IMetadata): this {
    this.meta = meta;
    return this;
  }

  addLink(rel: string, href: string, method: ILink['method']): this {
    this._links.push({ rel, href, method });
    return this;
  }

  addLinks(links: ILink[]): this {
    this._links.push(...links);
    return this;
  }

  build(): ApiResource<T> {
    return {
      success: this.success,
      message: this.message,
      statusCode: this.statusCode,
      data: this.data,
      meta: this.meta,
      _links: this._links,
    };
  }
}

export function buildResource<T>(data: T): ResourceBuilder<T> {
  return new ResourceBuilder<T>(data);
}

import { ResourceBuilder, buildResource } from '~/utils/resource/builder';

describe('ResourceBuilder', () => {
  describe('constructor', () => {
    it('should initialize with data', () => {
      const data = { id: 1, name: 'Test' };
      const builder = new ResourceBuilder(data);

      const result = builder.build();

      expect(result.data).toEqual(data);
    });

    it('should set default values', () => {
      const data = { id: 1 };
      const builder = new ResourceBuilder(data);

      const result = builder.build();

      expect(result.success).toBe(true);
      expect(result.message).toBe('Request successful');
      expect(result.statusCode).toBe(200);
      expect(result.meta).toBeUndefined();
      expect(result._links).toEqual([]);
    });
  });

  describe('setSuccess', () => {
    it('should set success flag', () => {
      const builder = new ResourceBuilder({ id: 1 });

      const result = builder.setSuccess(false).build();

      expect(result.success).toBe(false);
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });

      expect(builder.setSuccess(false)).toBe(builder);
    });
  });

  describe('setMessage', () => {
    it('should set custom message', () => {
      const builder = new ResourceBuilder({ id: 1 });

      const result = builder.setMessage('Custom message').build();

      expect(result.message).toBe('Custom message');
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });

      expect(builder.setMessage('Test')).toBe(builder);
    });
  });

  describe('setStatusCode', () => {
    it('should set status code', () => {
      const builder = new ResourceBuilder({ id: 1 });

      const result = builder.setStatusCode(201).build();

      expect(result.statusCode).toBe(201);
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });

      expect(builder.setStatusCode(201)).toBe(builder);
    });
  });

  describe('setMeta', () => {
    it('should set metadata', () => {
      const builder = new ResourceBuilder({ id: 1 });
      const meta = {
        totalItems: 100,
        itemCount: 10,
        itemsPerPage: 10,
        totalPages: 10,
        currentPage: 1,
      };

      const result = builder.setMeta(meta).build();

      expect(result.meta).toEqual(meta);
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });
      const meta = {
        totalItems: 100,
        itemCount: 10,
        itemsPerPage: 10,
        totalPages: 10,
        currentPage: 1,
      };

      expect(builder.setMeta(meta)).toBe(builder);
    });
  });

  describe('addLink', () => {
    it('should add a single link', () => {
      const builder = new ResourceBuilder({ id: 1 });

      const result = builder
        .addLink('self', '/api/resource/1', 'GET')
        .build();

      expect(result._links).toHaveLength(1);
      expect(result._links[0]).toEqual({
        rel: 'self',
        href: '/api/resource/1',
        method: 'GET',
      });
    });

    it('should add multiple links sequentially', () => {
      const builder = new ResourceBuilder({ id: 1 });

      const result = builder
        .addLink('self', '/api/resource/1', 'GET')
        .addLink('update', '/api/resource/1', 'PUT')
        .addLink('delete', '/api/resource/1', 'DELETE')
        .build();

      expect(result._links).toHaveLength(3);
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });

      expect(builder.addLink('self', '/test', 'GET')).toBe(builder);
    });
  });

  describe('addLinks', () => {
    it('should add multiple links at once', () => {
      const builder = new ResourceBuilder({ id: 1 });
      const links = [
        { rel: 'self', href: '/api/resource/1', method: 'GET' as const },
        { rel: 'update', href: '/api/resource/1', method: 'PUT' as const },
      ];

      const result = builder.addLinks(links).build();

      expect(result._links).toHaveLength(2);
      expect(result._links).toEqual(expect.arrayContaining(links));
    });

    it('should return this for chaining', () => {
      const builder = new ResourceBuilder({ id: 1 });

      expect(builder.addLinks([])).toBe(builder);
    });
  });

  describe('build', () => {
    it('should return complete ApiResource object', () => {
      const data = { id: 1, name: 'Test' };
      const meta = {
        totalItems: 100,
        itemCount: 10,
        itemsPerPage: 10,
        totalPages: 10,
        currentPage: 1,
      };

      const result = new ResourceBuilder(data)
        .setSuccess(true)
        .setMessage('Success')
        .setStatusCode(200)
        .setMeta(meta)
        .addLink('self', '/api/resource', 'GET')
        .build();

      expect(result).toEqual({
        success: true,
        message: 'Success',
        statusCode: 200,
        data,
        meta,
        _links: [{ rel: 'self', href: '/api/resource', method: 'GET' }],
      });
    });

    it('should work without optional fields', () => {
      const data = { id: 1 };

      const result = new ResourceBuilder(data).build();

      expect(result).toEqual({
        success: true,
        message: 'Request successful',
        statusCode: 200,
        data,
        meta: undefined,
        _links: [],
      });
    });
  });

  describe('method chaining', () => {
    it('should support full method chaining', () => {
      const data = { id: 1 };
      const meta = {
        totalItems: 50,
        itemCount: 5,
        itemsPerPage: 10,
        totalPages: 5,
        currentPage: 1,
      };

      const result = new ResourceBuilder(data)
        .setSuccess(true)
        .setMessage('Items retrieved')
        .setStatusCode(200)
        .setMeta(meta)
        .addLink('self', '/api/items', 'GET')
        .addLink('create', '/api/items', 'POST')
        .build();

      expect(result.success).toBe(true);
      expect(result.message).toBe('Items retrieved');
      expect(result.statusCode).toBe(200);
      expect(result.meta).toEqual(meta);
      expect(result._links).toHaveLength(2);
    });
  });
});

describe('buildResource helper', () => {
  it('should create ResourceBuilder instance', () => {
    const data = { id: 1 };
    const builder = buildResource(data);

    expect(builder).toBeInstanceOf(ResourceBuilder);
  });

  it('should build resource with default values', () => {
    const data = { id: 1, name: 'Test' };

    const result = buildResource(data).build();

    expect(result).toEqual({
      success: true,
      message: 'Request successful',
      statusCode: 200,
      data,
      meta: undefined,
      _links: [],
    });
  });

  it('should support chaining like ResourceBuilder', () => {
    const result = buildResource({ id: 1 })
      .setMessage('Custom')
      .setStatusCode(201)
      .build();

    expect(result.message).toBe('Custom');
    expect(result.statusCode).toBe(201);
  });
});

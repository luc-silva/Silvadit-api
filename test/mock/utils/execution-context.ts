import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class ExecutionHostMock implements ExecutionContext {
  getArgByIndex = jest.fn();
  getArgs = jest.fn();
  getClass = jest.fn();
  getHandler = jest.fn();
  getType = jest.fn();
  switchToRpc = jest.fn();
  switchToWs = jest.fn();

  getRequest = jest.fn();
  getResponse = jest.fn();
  getNext = jest.fn();

  switchToHttp = () => ({
    getRequest: this.getRequest,
    getResponse: this.getResponse,
    getNext: this.getNext,
  });
}

export class ReflectorMock implements Reflector {
  get = jest.fn();
  getAll = jest.fn();
  getAllAndMerge = jest.fn();
  getAllAndOverride = jest.fn();
}

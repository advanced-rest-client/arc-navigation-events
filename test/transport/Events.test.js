import { assert } from '@open-wc/testing';
import { DataGenerator } from '@advanced-rest-client/arc-data-generator';
import { TransportEventTypes, ApiRequestEvent, ApiResponseEvent, ApiTransportEvent } from  '../../index.js';
import { generateEditorRequest, generateTransportRequest } from './Utils.js';

describe('Transport', () => {
  const generator = new DataGenerator();

  describe('Events', () => {
    describe('ApiRequestEvent', () => {
      const request = generateEditorRequest();

      it('has the correct type', () => {
        const e = new ApiRequestEvent(request);
        assert.equal(e.type, TransportEventTypes.request);
      });

      it('has the detail property', () => {
        const e = new ApiRequestEvent(request);
        assert.deepEqual(e.detail, request);
      });

      it('bubbles', () => {
        const e = new ApiRequestEvent(request);
        assert.isTrue(e.bubbles);
      });

      it('is composed', () => {
        const e = new ApiRequestEvent(request);
        assert.isTrue(e.composed);
      });

      it('is cancelable', () => {
        const e = new ApiRequestEvent(request);
        assert.isTrue(e.cancelable);
      });
    });

    describe('ApiResponseEvent', () => {
      const source = generator.generateHistoryObject();
      const response = generator.generateResponse();
      const request = generateTransportRequest();
      const id = generator.chance.guid();
      const type = TransportEventTypes.response;

      it('has the correct type', () => {
        const e = new ApiResponseEvent(type, id, source, request, response);
        assert.equal(e.type, type);
      });

      it('has the detail property', () => {
        const e = new ApiResponseEvent(type, id, source, request, response);
        assert.deepEqual(e.detail.request, request, 'has the transport request');
        assert.deepEqual(e.detail.response, response, 'has the response');
        assert.deepEqual(e.detail.id, id, 'has the id');
        assert.deepEqual(e.detail.source, source, 'has the source request');
      });

      it('bubbles', () => {
        const e = new ApiResponseEvent(type, id, source, request, response);
        assert.isTrue(e.bubbles);
      });

      it('is composed', () => {
        const e = new ApiResponseEvent(type, id, source, request, response);
        assert.isTrue(e.composed);
      });

      it('is cancelable', () => {
        const e = new ApiResponseEvent(type, id, source, request, response);
        assert.isTrue(e.cancelable);
      });
    });

    describe('ApiTransportEvent', () => {
      const request = generator.generateSavedItem();
      const id = generator.chance.guid();
      const config = { enabled: false };

      it('has the correct type', () => {
        const e = new ApiTransportEvent(id, request);
        assert.equal(e.type, TransportEventTypes.transport);
      });

      it('has the detail property', () => {
        const e = new ApiTransportEvent(id, request, config);
        assert.deepEqual(e.detail.request, request);
        assert.deepEqual(e.detail.config, config);
        assert.deepEqual(e.detail.id, id);
      });

      it('bubbles', () => {
        const e = new ApiTransportEvent(id, request);
        assert.isTrue(e.bubbles);
      });

      it('is composed', () => {
        const e = new ApiTransportEvent(id, request);
        assert.isTrue(e.composed);
      });

      it('is cancelable', () => {
        const e = new ApiTransportEvent(id, request);
        assert.isTrue(e.cancelable);
      });
    });
  });
});
import request from 'supertest';
import { application  } from '../src/index';

// Todo: Add tests for the application
describe('Appliceation', () => {
    it('Starts and listens on a port', async () => {
        expect(application).toBeDefined();
    }, 30000);
});
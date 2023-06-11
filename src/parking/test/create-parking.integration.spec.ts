import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { IntegrationTestManager } from 'test/IntegrationTestManager';
import { testPaking } from 'test/test-data';
import { Parking } from '../entities/parking.entity';

describe('createParking', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('Given that the parking does not already exist', () => {
    describe('When a createParking mutation is executed', () => {
      let createdParking: Parking;

      beforeAll(async () => {
        const response = await request<{ createParking: any }>(
          integrationTestManager.httpServer,
        )
          .mutate(
            gql`
              mutation CreateParking($createParkingInput: CreateParkingInput!) {
                createParking(createParkingInput: $createParkingInput) {
                  id
                  name
                }
              }
            `,
          )
          .variables({
            createParkingInput: {
              name: testPaking.name,
              spots: testPaking.spots,
              contact: testPaking.contact,
              parkingType: testPaking.parkingType,
            },
          })
          .expectNoErrors();

        createdParking = response.data.createParking;

        console.log('createdParking', createdParking);
      });
    });
  });
});

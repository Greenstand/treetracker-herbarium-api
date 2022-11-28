const request = require('supertest');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const app = require('../../server/app');
const { knex } = require('../utils');
const species1 = require('../mock/species1.json');
const species2 = require('../mock/species2.json');


describe('species', () => {

    const speciesUpdate = {
        "description": "quis nostrud exercitation ullamco laboris",
        "morphology": "incididunt"
    };

    after(async () => {
        await knex('reference_image').del();
        await knex('species').del();
    });

    describe('POST', () => {
        it('should create a species', async () => {
            const res = await request(app)
                .post(`/species`)
                .send(species1)
                .set('Accept', 'application/json')
                .expect(201);
            
            expect(res.body).include({
                ...species1
            });
        });
    });

    describe('GET', () => {

        let speciesId = null;

        before(async () => {
            const speciesResponse =  await knex('species').insert({
                ...species2
            })
            .returning('id');

            speciesId =  [speciesResponse];
        });

        it('should get species', async () => {
            const result = await request(app).get(`/species?limit=1`).expect(200);
            expect(result.body.links).to.have.keys(['prev', 'next']);
            expect(result.body.species)
                .to.be.an('array')
                .that.contains.something.like({
                    ...species1
            });
        });

        it('should get species -- by id', async () => {
            const result = await request(app)
                .get(`/species/${speciesId}`)
                .expect(200);
            expect(result.body).to.include({
                ...species2
            });
        });
    });

    describe('PATCH', () => {
        before(async () => {
            const species = await knex('species').select('id');
            species1.id = species[0].id;
        });

        it('should update species', async () => {
            const res = await request(app)
                .patch(`/species/${species1.id}`)
                .send(speciesUpdate)
                .set('Accept', 'application/json')
                .expect(200);
            
            expect(res.body).to.include({
                ...species1,
                ...speciesUpdate
            })
        })
    });
});
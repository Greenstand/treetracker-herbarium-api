const request = require('supertest');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const app = require('../../server/app');
const { knex } = require('../utils');
const common_name1 = require('../mock/common_name1.json');
const common_name2 = require('../mock/common_name2.json');
const species1 = require('../mock/species1.json');
const species2 = require('../mock/species2.json');


describe('common_name', () => {

    before(async () => {
        const species1Response = await knex('species')
            .insert({
                ...species1
            })
            .returning('id');
        
        const [species1Id] = species1Response;

        const species2Response = await knex('species')
            .insert({
                ...species2
            })
            .returning('id');
        
        const [species2Id] = species2Response;

        common_name1.species_id = species1Id;
        common_name2.species_id = species2Id;
    });

    after(async () => {
        await knex('organization_species').del();
        await knex('common_name').del();
        await knex('species').del();
    });

    describe('POST', () => {
        it('should create a common name', async () => {
            const res = await request(app)
                .post(`/common_name`)
                .send(common_name1)
                .set('Accept', 'application/json')
                .expect(200);
            
            expect(res.body).include({
                ...common_name1
            });
        });
    });

    describe('GET', () => {

        before(async () => {
            await knex('common_name').insert({
                ...common_name2
            })
        });

        it('should get common name', async () => {
            const result = await request(app).get(`/common_name?limit=1`).expect(200);
            expect(result.body.links).to.have.keys(['prev', 'next']);
            expect(result.body.common_names)
                .to.be.an('array')
                .that.contains.something.like({
                    ...common_name1
            });
        });
    });
});
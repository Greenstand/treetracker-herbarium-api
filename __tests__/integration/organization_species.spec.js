const request = require('supertest');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const app = require('../../server/app');
const { knex } = require('../utils');
const species1 = require('../mock/species1.json');
const species2 = require('../mock/species2.json');
const organization_species1 = require('../mock/organization_species1.json');
const organization_species2 = require('../mock/organization_species2.json');


describe('organization_species', () => {

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

        organization_species1.species_id = species1Id;
        organization_species2.species_id = species2Id;
    });

    after(async () => {
        await knex('organization_species').del();
        await knex('common_name').del();
        await knex('species').del();
    });

    describe('POST', () => {
        it('should create a organization species', async () => {
            const res = await request(app)
                .post('/organization_species')
                .send(organization_species1)
                .set('Accept', 'application/json')
                .expect(200);
                
                expect(res.body.organization_id).to.eql(organization_species1.organization_id);
        });
    });

    describe('GET', () => {

        let organizationSpeciesId = null;

        before(async () => {
            const res = await request(app)
                .post('/organization_species')
                .send(organization_species2)
                .set('Accept', 'application/json')

            organizationSpeciesId = res.body.id;
        });

        it('should get organization species', async () => {
            const result = await request(app).get('/organization_species?limit=1').expect(200);
            expect(result.body.links).to.have.keys(['prev', 'next']);
            expect(result.body.organization_species)
                .to.be.an('array')
        });

        it('should get organization species -- by id', async () => {
            await request(app)
                .get(`/organization_species/${organizationSpeciesId}`)
                .expect(200);
        });

        it('should delete a organization species', async () => {
            await request(app)
                .delete(`/organization_species/${organizationSpeciesId}`)
                .set('Accept', 'application/json')
                .expect(200);
        });
    });
});
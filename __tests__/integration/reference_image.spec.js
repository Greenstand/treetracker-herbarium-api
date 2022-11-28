const request = require('supertest');
const chai = require('chai');

const { expect } = chai;
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const app = require('../../server/app');
const { knex } = require('../utils');
const species1 = require('../mock/species1.json');
const species2 = require('../mock/species2.json');
const reference_image1 = require('../mock/reference_image1.json');
const reference_image2 = require('../mock/reference_image2.json');


describe('reference_image', () => {

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

        reference_image1.species_id = species1Id;
        reference_image2.species_id = species2Id;
    });

    after(async () => {
        await knex('reference_image').del();
        await knex('species').del();
    });

    describe('POST', () => {
        it('should create a reference image', async () => {
            const res = await request(app)
                .post('/reference_image')
                .send(reference_image1)
                .set('Accept', 'application/json')
                .expect(201);

            expect(res.body).include({
                ...reference_image1,
            });
        });
    });

    describe('GET', () => {

        let referenceImageId = null;

        before(async () => {
            const res = await knex('reference_image').insert({
                ...reference_image2
            })
            .returning('id');

            referenceImageId = [res]
        });

        it('should get referance images', async () => {
            const result = await request(app).get('/reference_image?limit=1').expect(200);
            expect(result.body.links).to.have.keys(['prev', 'next']);
            expect(result.body.reference_images)
                .to.be.an('array')
                .that.contains.something.like({
                    ...reference_image1
            });
        });

        it('should get reference image -- by id', async () => {
            const result = await request(app)
                .get(`/reference_image/${referenceImageId}`)
                .expect(200);
            expect(result.body).to.include({
                ...reference_image2
            });
        });

        it('should delete a reference image', async () => {
            await request(app)
                .delete(`/reference_image/${referenceImageId}`)
                .set('Accept', 'application/json')
                .expect(200);
        });
    });
});
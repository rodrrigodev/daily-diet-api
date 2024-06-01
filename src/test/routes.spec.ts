import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { app } from '../app'
import { execSync } from 'node:child_process'

describe('Diet routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('Should get all the user information', async () => {
    const newUser = await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })

    const cookie = newUser.get('Set-Cookie')

    if (!cookie) {
      throw new Error('Check if a cookie exists')
    }

    const user = await request(app.server)
      .get('/diet/user')
      .set('Cookie', cookie)
      .expect(200)

    expect(user.body).toEqual(
      expect.objectContaining({
        totalDiets: 0,
        activeDiets: 0,
        notActiveDiets: 0,
        actualStreak: 0,
        dietsCompleted: 0,
      }),
    )
  })

  it('Should get all the diets', async () => {
    const newUser = await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })

    const cookie = newUser.get('Set-Cookie')

    if (!cookie) {
      throw new Error('Check if a cookie exists')
    }

    await request(app.server).post('/diet/new').set('Cookie', cookie).send({
      name: 'Arroz com feijão',
      description: 'Arroz com feijão e carne seca.',
      completed: false,
      dayAndHour: '2024-09-27T15:00:00',
      active: false,
    })

    const allDiets = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    expect(allDiets.body.diets).toEqual([
      expect.objectContaining({
        name: 'Arroz com feijão',
        description: 'Arroz com feijão e carne seca.',
        completed: 0,
        active: 0,
      }),
    ])
  })

  it('Should get the diet by ID', async () => {
    const newUser = await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })

    const cookie = newUser.get('Set-Cookie')

    if (!cookie) {
      throw new Error('Check if a cookie exists')
    }

    await request(app.server).post('/diet/new').set('Cookie', cookie).send({
      name: 'Arroz com feijão',
      description: 'Arroz com feijão e carne seca.',
      completed: false,
      dayAndHour: '2024-09-27T15:00:00',
      active: false,
    })

    const allDiets = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    const { id } = allDiets.body.diets[0]

    const dietById = await request(app.server)
      .get(`/diet/${id}`)
      .set('Cookie', cookie)
      .expect(200)

    expect(dietById.body.diet).toEqual(
      expect.objectContaining({
        id,
        name: 'Arroz com feijão',
        description: 'Arroz com feijão e carne seca.',
        completed: 0,
        active: 0,
      }),
    )
  })

  it('Should create a new user', async () => {
    await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })
      .expect(201)
  })

  it('Should update a diet', async () => {
    const newUser = await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })

    const cookie = newUser.get('Set-Cookie')

    if (!cookie) {
      throw new Error('Check if a cookie exists')
    }

    await request(app.server).post('/diet/new').set('Cookie', cookie).send({
      name: 'Arroz com feijão',
      description: 'Arroz com feijão e carne seca.',
      completed: false,
      dayAndHour: '2024-09-27T15:00:00',
      active: false,
    })

    const allDiets = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    const { id } = allDiets.body.diets[0]

    await request(app.server)
      .put(`/diet/${id}`)
      .set('Cookie', cookie)
      .send({
        name: 'Leite',
        description: 'Cookies de chocolate e copo de leite.',
        completed: false,
        dayAndHour: '2024-09-27T18:00:00',
        active: true,
      })
      .expect(200)

    const updatedDietInfo = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    expect(updatedDietInfo.body.diets[0]).toEqual(
      expect.objectContaining({
        name: 'Leite',
        description: 'Cookies de chocolate e copo de leite.',
        completed: 0,
        active: 1,
      }),
    )
  })

  it('Should delete a diet', async () => {
    const newUser = await request(app.server)
      .post('/diet/create-user')
      .send({ name: 'Rodrigo' })

    const cookie = newUser.get('Set-Cookie')

    if (!cookie) {
      throw new Error('Check if a cookie exists')
    }

    await request(app.server).post('/diet/new').set('Cookie', cookie).send({
      name: 'Arroz com feijão',
      description: 'Arroz com feijão e carne seca.',
      completed: false,
      dayAndHour: '2024-09-27T15:00:00',
      active: false,
    })

    let allDiets = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    const { id } = allDiets.body.diets[0]

    await request(app.server).delete(`/diet/${id}`).set('Cookie', cookie)

    allDiets = await request(app.server)
      .get('/diet/all')
      .set('Cookie', cookie)
      .expect(200)

    expect(allDiets.body.diets).toHaveLength(0)
  })
})

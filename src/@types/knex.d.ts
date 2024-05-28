// eslint-disable-next-line
import { Knex } from 'knex'

declare module 'knex/types/tables' {
  interface Tables {
    users: {
      id: string
      name: string
      created_at: string
      session_id?: string
    }

    diets: {
      id: string
      user_id: string
      name: string
      description: string
      completed: boolean
      day_hour: string
      created_at: string
      active: boolean
    }
  }
}

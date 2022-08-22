import postgres from 'postgres'

export const sql = postgres({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    pass: 'admin',
    database: 'api-express-ts'
})


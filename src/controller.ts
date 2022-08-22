import { Request, RequestHandler, Response } from "express"
import { DefinedRoutes } from './defined-routes'
import {sql} from './db'


/*
export namespace Controller {
    export const helloWorld: RequestHandler = (req: Request, res: Response) => {
        res.send('Olá mundo!')
    }
}
*/

export const Controller: Record<DefinedRoutes, RequestHandler> = {
    [DefinedRoutes.HelloWorld]: (req: Request, res: Response) => {
        res.send('Hello World!')
    },
    
    [DefinedRoutes.HelloLeo]: (req: Request, res: Response) => {
        res.send('Hello leo!')
    },

    [DefinedRoutes.CreateSeller]: async (req: Request, res: Response) => {
        const email: string = req.body.email
        const password: string = req.body.password

        if (!email || !password) {
            return res
                .send({ status: 'Error', message: 'Validation error' })
                .status(400)
                .json()
        }

        try {
            const seller = await sql`
            insert into tseller
            (email, password)
            values
            (${ email }, ${ password })`
            return res
                .send({status: 'Created', message: 'Seller created with success!'})
                .status(200)
                .json()

        } catch (err: any) {
            console.log(err.code)
            if (err.code === '23505'){
                return res
                    .send({status: 'Error', message: 'Email already exists'})
                    .status(409)
                    .json()
            }

            return res
                .send({status: 'Error', message: 'Internal server error' })
                .status(500)
                .json()
        }
        
    },

    [DefinedRoutes.CreateOrder]: async (req: Request, res: Response) => {
        const idSeller: number = req.body.idSeller;
        const description: string = req.body.description;
        const quantity: number = req.body.quantity;
        const total: number = req.body.total;

        if (!idSeller || !quantity || !total || !description){
            return res
                .send({status: 'Error', message: 'Valitation error'})
                .status(400)
                .json()
        }

        try{
            const order = await sql`
                insert into torder
                (id_seller, description,  quantity, total)
                values
                (${idSeller}, ${description}, ${quantity}, ${total})`
            return res
                .send({status: 'Ok', message: 'Order create with success'})
                .status(200)
                .json()

        } catch (err: any) {
            return res
                .send({status: 'Error', message: 'Internal server error'})
                .status(400)
                .json()

        }
        
    }
    
}
import {Router, Response, Request} from 'express'
import { Controller } from './controller'
import { DefinedRoutes } from './defined-routes'
export const router = Router()

router.use('/hello-world', Controller[DefinedRoutes.HelloWorld])
router.use('/hello-leo', Controller[DefinedRoutes.HelloLeo])
router.post('/create-seller', Controller[DefinedRoutes.CreateSeller])
router.post('/create-order', Controller[DefinedRoutes.CreateOrder])
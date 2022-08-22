"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const defined_routes_1 = require("./defined-routes");
const db_1 = require("./db");
exports.Controller = {
    [defined_routes_1.DefinedRoutes.HelloWorld]: (req, res) => {
        res.send('Hello World!');
    },
    [defined_routes_1.DefinedRoutes.HelloLeo]: (req, res) => {
        res.send('Hello leo!');
    },
    [defined_routes_1.DefinedRoutes.CreateSeller]: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            return res
                .send({ status: 'Error', message: 'Validation error' })
                .status(400)
                .json();
        }
        try {
            const seller = yield (0, db_1.sql) `
            insert into tseller
            (email, password)
            values
            (${email}, ${password})`;
            return res
                .send({ status: 'Created', message: 'Seller created with success!' })
                .status(200)
                .json();
        }
        catch (err) {
            console.log(err.code);
            if (err.code === '23505') {
                return res
                    .send({ status: 'Error', message: 'Email already exists' })
                    .status(409)
                    .json();
            }
            return res
                .send({ status: 'Error', message: 'Internal server error' })
                .status(500)
                .json();
        }
    }),
    [defined_routes_1.DefinedRoutes.CreateOrder]: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const idSeller = req.body.idSeller;
        const description = req.body.description;
        const quantity = req.body.quantity;
        const total = req.body.total;
        if (!idSeller || !quantity || !total || !description) {
            return res
                .send({ status: 'Error', message: 'Valitation error' })
                .status(400)
                .json();
        }
        try {
            const order = yield (0, db_1.sql) `
                insert into torder
                (id_seller, description,  quantity, total)
                values
                (${idSeller}, ${description}, ${quantity}, ${total})`;
            return res
                .send({ status: 'Ok', message: 'Order create with success' })
                .status(200)
                .json();
        }
        catch (err) {
            return res
                .send({ status: 'Error', message: 'Internal server error' })
                .status(400)
                .json();
        }
    })
};

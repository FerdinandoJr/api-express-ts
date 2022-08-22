"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sql = void 0;
const postgres_1 = __importDefault(require("postgres"));
exports.sql = (0, postgres_1.default)({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    pass: 'admin',
    database: 'api-express-ts'
});

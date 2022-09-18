"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/ads', (req, res) => {
    return res.json([
        { id: 1, name: 'Obi-Wan Kenobi' },
        { id: 2, name: 'Anakin Skywalker' },
        { id: 3, name: 'Asohka Tano' },
        { id: 4, name: 'R2D2' },
        { id: 5, name: 'C3PO' },
    ]);
});
app.listen(80);

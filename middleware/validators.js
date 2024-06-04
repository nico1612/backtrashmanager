// middlewares/validators.js
import { body, param, validationResult } from 'express-validator';

export const validateTaskCreation = [
    body('description').isString().withMessage('Description must be a string'),
    body('assigned').isString().withMessage('Assigned must be a string'),
    body('status').isIn(['new', 'in_process', 'canceled', 'finished']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

export const validateTaskUpdate = [
    body('status').isIn(['new', 'in_process', 'canceled', 'finished']).withMessage('Invalid status'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

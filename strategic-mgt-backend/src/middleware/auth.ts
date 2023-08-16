import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../utils/auth';

/**
 * middleware to check whether user has access to a specific endpoint
 *
 */
// export const authorize = (allowedAccessTypes: string[]) => async (req: Request, res: Response, next: NextFunction) => {
export const authorize = () => async (req: Request, res: Response, next: NextFunction) => {
    try {
        let jwt = req.headers.authorization;
        if (!jwt) return res.status(401).json({ message: 'Invalid token ' });

        // remove Bearer if using Bearer Authorization mechanism
        if (jwt.toLowerCase().startsWith('bearer')) {
            jwt = jwt.slice('bearer'.length).trim();
        }
        await validateToken(jwt);
        next();
    } catch (error) {

        res.status(401).json({ message: 'Failed to authenticate user' });
    }
};
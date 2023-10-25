import prisma from '../db'
import {comparePasswords, createJwt, hashPassword} from "../modules/auth";

export const createNewUser = async (req, res, next) => {
    const hash = await hashPassword(req.body.password);
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: hash,
            },
        });

        const token = createJwt(user);
        res.json({ token });

    } catch (e) {
        e.type = 'input';
        next(e);
    }
};

export const signIn = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { username: req.body.username },
    });

    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
        res.status(401);
        res.send("Invalid username or password");
        return;
    }
    console.log(user.isVerified);
    const token = createJwt(user);
    res.json({ token });
};
import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken"


export const register = async (req, res) => {

    const { username, email, password } = req.body;

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);
    //console.log(hashedPassword);

    // CREATE NEW USER AND TO DATABASE
    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        })

        console.log("New User Created :", newUser);

        // res.status(200).json({
        //     success: true,
        //     newUser
        // })

    } catch (error) {
        console.error('Error creating user:', error);
    } finally {
        await prisma.$disconnect();
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        // CHECK IF USER EXIST
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        // CHECK IF PASSWORD IS VALID
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Password is invalid" });

        // GENERATE COOKIE TOKEN AND SEND TO THE USER

        const age = 1000 * 60 * 60 * 24 * 7;

        const token = jwt.sign({
            userId: user.id,
        }, process.env.JWT_SECRET_KEY, { expiresIn: age})

        res.cookie("token", token, {
            httpOnly: true,
            //secure: true
            maxAge: age
        }).status(200).json({ message: "Login successfull"});

    } catch (error) {
        console.log(error.message);
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successfull"});
}
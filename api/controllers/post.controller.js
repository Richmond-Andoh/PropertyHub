import prisma from "../lib/prisma.js"

export const getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get posts" })
    }
}

export const getPost = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await prisma.post.findUnique(
            {
                where: { id }
            }
        );
        res.status(200).json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to get post" })
    }
}

export const addPost = async (req, res) => {
    const body = req.body;
    const tokenUserId = req.params.id;
    console.log(req.params.id)
    console.log(tokenUserId);
    // if (!tokenUserId) {
    //     return res.status(400).json({ message: "User ID is required" });
    // }

    try {
        const newPost = await prisma.post.create({
            data: {
                ...body,
                // title: body.title,
                // price: body.price,
                // img: body.img,
                // address: body.address,
                // city: body.city,
                // bedroom: body.bedroom,
                // bathroom: body.bathroom,
                // longitude: body.longitude,
                // latitude: body.latitude,
                // type: body.type,         // Ensure this is a valid enum (buy/rent)
                // property: body.property,
                // user: {
                //     connect: {id: tokenUserId}
                // }
                user: {
                    connect: { userId: tokenUserId }
                }
            }
        });
        res.status(200).json(newPost)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to create post" })
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    console.log(tokenUserId);

    try {

        if (post.userId !== tokenUserId) {
            return res.status(403).json({ message: "Not Authorized" })
        }

        // const post = await prisma.post.findUnique({
        //     where: { id },
        // });
        // if (!post) {
        //     return res.status(404).json({ message: "Post not found"})
        // }

        await prisma.post.delete({
            where: { id }
        })

        res.status(200).json({ message: "Post Deleted Successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to update post" })
    }
}

export const deletePost = async (req, res) => {
    try {
        const posts = await prisma.post.findMany();
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Failed to delete post" })
    }
}
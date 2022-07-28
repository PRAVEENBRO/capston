const database = require('../models/dataSchema.js')
const jwt = require("jsonwebtoken");



const login = async (req, res, next) => {
    console.log(req.body, '-------------login')
    const { email, password } = req.body;

    if (!email || !password) {
        res.json({
            error: true,
            message: "fill details",
            data: null
        })
    } else {

        try {
            // const check = await database.findOne({ email: email, password: password });
            // const check = await database.findOne({ email: email });
            const check = await database.findOne({ });

            console.log(check, '-------');

            if (!check) {
                res.json({
                    error: true,
                    message: "invalid credential...!",
                    data: null
                })
            } else {
                const { name, role, _id } = check
                const payload = { name, role, _id }
                const token = jwt.sign(payload, process.env.SECRET_KEY)
                res.json({
                    error: false,
                    message: "login succesfull...!",
                    role: check.role,
                    token: token
                })
            }

        } catch (err) {
            next(err);
        }

    }

}


const register = async (req, res, next) => {
    console.log(req.body, '-----------');
    const { name, email, password, role, test } = req.body

    if (!name || !email || !password || !role) {
        res.status(401).json({
            error: true,
            message: "Fill the form properly",
            data: null
        })

    } else {

        try {
            const data = await database.findOne({ email: email }).lean();
            console.log(data);
            const status = { hemo: false, thyr: false, glu: false }

            if (!data) {
                const newUser = new database({ name, email, password, role, test, status });
                newUser.save().then(async () => {
                    res.status(200).json({
                        error: false,
                        message: "Registration Successfull",
                        data: null
                    })
                })
            } else {
                res.status(200).json({
                    error: true,
                    message: "user already Exist",
                    data: null
                })
            }


        } catch (err) {
            res.status(401).json({
                error: true,
                message: "Registrated failed",
                data: null
            })
        }
    }
}

const samples = async (req, res, next) => {

    // console.log(req.body, '-------------_id')
    // const { name, role, _id } = req.body

    const allUsers = await database.find({ role: "user" });
    // const rootuser = await database.findOne({ _id: _id });
    // onedata = [rootuser]

    // if (role === "admin") { data = allUsers; }
    // else if (role === "user") { data = onedata; }
    // else { data = null }

    res.send(allUsers)
    // res.send('data')

}

const entersample = async (req, res, next) => {
    const { sampleId, samplestatus } = req.body

    console.log(sampleId, samplestatus);


    await database.updateOne({ _id: sampleId }, { $set: { test: true } })
    await database.updateOne({ _id: sampleId }, { $set: { status: samplestatus } })
    res.json({
        error: false,
        message: "sample created",
        data: null
    })
}

const heamatology = async (req, res, next) => {

    console.log(req.body, '----------heamatology');
    try {
        const { id, haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv } = req.body
        const heamatology = { haemoglobin, neutrophils, eosinophiles, basophills, pcv, wbc, lymphocytes, monocytes, rbc, mcv }
        await database.updateOne({ _id: id }, { $set: { heamatology: heamatology, test: true } });
        res.status(200).send({
            error: false,
            massage: " data saved",
            data: null
        })
    } catch (err) {
        next(err)
    }

}

const thyroid = async (req, res, next) => {
    console.log(req.body, "--------thyroid");
    const { id, tri, thyroxine, tsh } = req.body
    const thyroid = { tri, thyroxine, tsh }
    console.log(tri, tsh, thyroxine, id, "--------thyroid")

    await database.updateOne({ _id: id }, { $set: { thyroid: thyroid, test: true } })

    res.status(200).send({
        error: false,
        massage: " data saved",
        data: null
    });
}

const glucometry = async (req, res, next) => {
    console.log(req.body, '-----------glucometry');
    const { id, fbs, ppbs, gh, calcium } = req.body
    const glucometry = { fbs, ppbs, gh, calcium }
    await database.updateOne({ _id: id }, { $set: { glucometry: glucometry, test: true } })

    res.status(200).send({
        error: false,
        massage: " data saved",
        data: null
    });
}

module.exports = {
    login, register, samples, entersample, heamatology, thyroid, glucometry
}
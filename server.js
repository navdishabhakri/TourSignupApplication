const express = require("express");
const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// data structures
const TOURS = [
    {
        id: 0,
        name: "CN Tower Tour",
        signups: [
            { user: "elliot", note: "Is the tour wheelchair accessible?" }
        ]
    },
    {
        id: 1,
        name: "Toronto Food Tour",
        signups: [
            { user: "michelle", note: "I have a peanut allergy" },
            { user: "elliot", note: "I'm vegetarian" },
        ]
    },
    {
        id: 2,
        name: "Sunset Canoe at Toronto Islands",
        signups: []
    }
];

// route endpoints
app.get("/", (req, res) => {
    res.render("home.ejs", { tours: TOURS });
});

app.post("/signup", (req, res) => {
    const { tbTourId, tbCustomerName, tbNote } = req.body;
    const tourId = parseInt(tbTourId);
    if (tourId >= 0 && tourId < TOURS.length) {
        TOURS[tourId].signups.push({ user: tbCustomerName, note: tbNote });
    }
    res.redirect("/");
});

app.get("/search/:user", (req, res) => {
    const { user } = req.params;
    let foundSignups = [];
    for (let i = 0; i < TOURS.length; i++) {
        const tour = TOURS[i];
        for (let j = 0; j < tour.signups.length; j++) {
            const signup = tour.signups[j];
            if (signup.user === user) {
                foundSignups.push(signup);
            }
        }
    }
    if (foundSignups.length > 0) {
        const jsonResponse = JSON.stringify(foundSignups);
        res.send(jsonResponse);
    } else {
        res.send("No signups found for this user.");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

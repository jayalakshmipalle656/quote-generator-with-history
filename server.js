const express = require("express");
const fs = require("fs");
const axios = require("axios");

const app = express();

app.use(express.static("public"));

// Get random quote
app.get("/quote", async (req, res) => {

    try {

        const response =
        await axios.get(
        "https://api.quotable.io/random"
        );

        const quote = response.data;

        let history =
        JSON.parse(
        fs.readFileSync("history.json")
        );

        history.push(quote);

        fs.writeFileSync(
        "history.json",
        JSON.stringify(history)
        );

        res.json(quote);

    } catch(error){
        res.send("Error");
    }

});

// Get quote history
app.get("/history", (req, res) => {

    const history =
    JSON.parse(
    fs.readFileSync("history.json")
    );

    res.json(history);

});

app.listen(3000, () => {
    console.log("Server Started");
});
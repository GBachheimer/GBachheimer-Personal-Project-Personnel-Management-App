const express = require("express");
const app = express();
const cors = require("cors");
const Pool = require("pg").Pool;

const db = new Pool({
    user: "postgres",
    password: "Ten0fivepress",
    host: "localhost",
    database: "employment_app",
});

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/addCompany", (req, res) => {
    console.log(req.body);
    try {
        const Co_Name = req.body.companyName;
        const Co_Country = req.body.country;
        const Co_City = req.body.city;
        const Co_Address = req.body.address;
        const Co_Postal_Code = req.body.postalCode;
        const Co_Initial_Total_Pos = req.body.totalPositions;
        const Co_Initial_Open_Pos = req.body.openPositions;
        const Co_Lat = req.body.lat;
        const Co_Lng = req.body.lng;
        db.query("INSERT INTO companies (co_name, co_country, co_city, co_address, co_postal_code, co_initial_total_positions, co_initial_free_positions, co_lat, co_lng) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)", 
            [Co_Name, Co_Country, Co_City, Co_Address, Co_Postal_Code, Co_Initial_Total_Pos, Co_Initial_Open_Pos, Co_Lat, Co_Lng], 
            (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    res.send("Values inserted successfully!");
                }
            }
        );
    } catch (error) {
        console.log(error);
    }
});

app.get("/takeCo", async (req, res) => {
    const allCompanies = await db.query("SELECT * FROM companies");
    res.json(allCompanies);
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM companies WHERE co_id = $1",
    [id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.send("Deleted successfully!");
        }
    });
});

app.listen(5000, () => {
    console.log("Server is running on port 5000!");
});




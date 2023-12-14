const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();
const pool = require("./db");
const path = require("path");
const fs = require("fs");



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "images/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
//upload images
app.post("/test", upload.single("selectedImage"), (req,res) => {
  res.status(200).json({message: "image uploaded"});
});
//send image
// Ajoutez cette route après la configuration de l'upload
app.get("/images/:imageName", (req, res) => {
  const imageName = req.params.imageName;
  const imagePath = path.join(__dirname, "images/", imageName);

  // Vérifiez si le fichier existe
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Le fichier n'existe pas
      res.status(404).json({ message: "Image not found" });
    } else {
      // Le fichier existe, renvoyer l'image
      res.sendFile(imagePath);
    }
  });
});

//upload palt
app.post("/insert/plat",async (req, res) => {
  try {
    const { namePlat,Image,price, restaurant_id, description, quantite } = req.body;

  console.log(req.body)
    const newBILLETTES = await pool.query(
      "INSERT INTO plat (name, image, price, restaurant_id, description, quantite) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [namePlat, Image, price, restaurant_id, description, quantite]
    );
    res.json(newBILLETTES.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur lors de l'insertion du plat." });
  }
});
//select max id plat
app.get("/max/id_plat", async (req, res) => {
  try {
    
    const todo = await pool.query("SELECT max(id)+1 as max from plat");

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//select plat
app.get("/select/plat", async (req, res) => {
  try {
    const allTodos = await pool.query(`SELECT
    r.id AS restaurant_id,
    r.name AS restaurant_name,
    p.id AS id,
    p.name AS name,
    p.price,
    p.description,
    p.quantite,
    p.image,
    r.address,
    r.phone_number
FROM
    plat p
JOIN
    restaurant r ON p.restaurant_id = r.id
`);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//select plat for restourant 
app.get("/select/plat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM plat WHERE restaurant_id = $1", [
      id
    ]);

    res.json(todo.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//select nom de restaurant 
app.get("/select/restaurant/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT name as name FROM restaurant WHERE id = $1", [
      id
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//delete plat
app.delete("/delete/plat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM plat WHERE id = $1", [
      id
    ]);
    res.json("plat was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
///modifier nom de plat 
app.post("/modifier/plat/nom/:id/:nom", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom } = req.params;
    const deleteTodo = await pool.query("UPDATE plat SET name = $1 WHERE id = $2", [
      nom ,id
    ]);
    res.json("plat nom was modifier!");
  } catch (err) {
    console.log(err.message);
  }
});
//modifier price
app.post("/modifier/plat/price/:id/:price", async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.params;
    const deleteTodo = await pool.query("UPDATE plat SET price = $1 WHERE id = $2", [
      price ,id
    ]);
    res.json("plat price was modifier!");
  } catch (err) {
    console.log(err.message);
  }
});
//modifier quantite
app.post("/modifier/plat/quantite/:id/:quantite", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite } = req.params;
    const deleteTodo = await pool.query("UPDATE plat SET quantite = quantite+ $1 WHERE id = $2", [
      quantite ,id
    ]);
    res.json("plat quantite was modifier!");
  } catch (err) {
    console.log(err.message);
  }
});
//add user
app.post("/insert/user",async (req, res) => {
  try {
    const {  userName  , email , password,confirmPassword } = req.body;

  console.log(req.body)
    const newBILLETTES = await pool.query(
      "INSERT INTO personne ( nom  , email , mot_de_passe) VALUES ($1, $2, $3) RETURNING *",
      [userName  , email , password]
    );
    res.json(newBILLETTES.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur lors de l'insertion du plat." });
  }
});
//select user 
app.get("/select/user/:nom/:mot_de_passe", async (req, res) => {
  try {
    const { nom } = req.params;
    const { mot_de_passe } = req.params;
    const todo = await pool.query("SELECT * FROM personne WHERE nom = $1 and mot_de_passe = $2", [
         nom , mot_de_passe
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/insert/user",async (req, res) => {
  try {
    const {  userName  , email , password,confirmPassword } = req.body;

  console.log(req.body)
    const newBILLETTES = await pool.query(
      "INSERT INTO personne ( nom  , email , mot_de_passe) VALUES ($1, $2, $3) RETURNING *",
      [userName  , email , password]
    );
    res.json(newBILLETTES.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur lors de l'insertion du plat." });
  }});
  ///
  //select restaurant 
app.get("/select/restaurant/:nom/:mot_de_passe", async (req, res) => {
  try {
    const { nom } = req.params;
    const { mot_de_passe } = req.params;
    const todo = await pool.query("SELECT * FROM restaurant WHERE name = $1 and password = $2", [
         nom , mot_de_passe
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
//add restaurant
app.post("/insert/restaurant",async (req, res) => {
  try {
    const {  userName , password,confirmPassword, address,phone_number } = req.body;

  console.log(req.body)
    const newBILLETTES = await pool.query(
      "INSERT INTO restaurant ( name , address , phone_number ,password) VALUES ($1, $2, $3,$4) RETURNING *",
      [userName  , address , phone_number,password]
    );
    res.json(newBILLETTES.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur lors de l'insertion du plat." });
  }});



  ///add achat
  app.post("/insert/achat", async (req, res) => {
   
    try {
      const { personne_id, restaurant_id, plat_id, date_achat, quantite,address_personne,phone_personne } = req.body;
      console.log(req.body)
      const newAchat = await pool.query(
        "INSERT INTO achat (personne_id, restaurant_id, plat_id, date_achat, quantite,address_personne,phone_personne) VALUES ($1, $2, $3, $4, $5,$6,$7) RETURNING *",
        [personne_id, restaurant_id, plat_id, date_achat, quantite,address_personne,phone_personne]
      );
      res.json(newAchat.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Erreur lors de l'insertion du achat." });
    }
  });
/////select Achat
app.get("/select/achat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query(`SELECT 
    achat.id AS achat_id,
    personne.id AS personne_id,
    personne.nom AS personne_nom,
    restaurant.id AS restaurant_id,
    restaurant.name AS restaurant_nom,
    plat.id AS plat_id,
    plat.name AS plat_nom,
    plat.price AS plat_prix,
    achat.date_achat,
    achat.quantite,
    achat.address_personne,
    achat.phone_personne
FROM 
    achat
JOIN 
    personne ON achat.personne_id = personne.id
JOIN 
    restaurant ON achat.restaurant_id = restaurant.id
JOIN 
    plat ON achat.plat_id = plat.id
    where achat.restaurant_id = $1

`,[id]);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});
///delete achat
app.post("/delete/achat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query("DELETE FROM achat WHERE id = $1", [
      id
    ]);
    res.json("achat was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});
app.post("/delete/achate/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Select the purchase information before deleting it
    const selectAchatQuery = "SELECT * FROM achat WHERE id = $1";
    const selectedAchat = await pool.query(selectAchatQuery, [id]);

    if (selectedAchat.rows.length === 0) {
      return res.status(404).json("Achat not found");
    }

    // Insert the selected purchase information into the archive table
    const archiveAchatQuery = `
      INSERT INTO archive_achat (personne_id, restaurant_id, plat_id, date_achat, quantite, address_personne, phone_personne)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const archiveValues = [
      selectedAchat.rows[0].personne_id,
      selectedAchat.rows[0].restaurant_id,
      selectedAchat.rows[0].plat_id,
      selectedAchat.rows[0].date_achat,
      selectedAchat.rows[0].quantite,
      selectedAchat.rows[0].address_personne,
      selectedAchat.rows[0].phone_personne
    ];
    await pool.query(archiveAchatQuery, archiveValues);

    // Delete the purchase from the original table
    const deleteAchatQuery = "DELETE FROM achat WHERE id = $1";
    await pool.query(deleteAchatQuery, [id]);

    res.json("Achat was moved to archive and deleted!");
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Internal Server Error");
  }
});
//select plat prefere 
app.post("/most/plat/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query(`SELECT
    plat.id AS plat_id,
    plat.name AS plat_name,
    COUNT(*) AS purchase_count
FROM
    plat
LEFT JOIN
    achat ON plat.id = achat.plat_id
LEFT JOIN
    archive_achat ON plat.id = archive_achat.plat_id
WHERE
    COALESCE(achat.restaurant_id, archive_achat.restaurant_id) = $1
GROUP BY
    plat.id
ORDER BY
    purchase_count DESC
LIMIT 1;


`,[id]);
    res.json(allTodos.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/most/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query(`SELECT
    personne.id AS personne_id,
    personne.nom AS personne_nom,
    COUNT(*) AS total_purchases
FROM
    personne
LEFT JOIN
    archive_achat ON personne.id = archive_achat.personne_id
WHERE
    archive_achat.restaurant_id = $1
GROUP BY
    personne.id
ORDER BY
    total_purchases DESC
LIMIT 1;



`,[id]);
    res.json(allTodos.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/most/heur/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query(`SELECT
    EXTRACT(HOUR FROM COALESCE(CAST(achat.date_achat AS TIMESTAMP), CAST(archive_achat.date_achat AS TIMESTAMP))) AS hour_of_day,
    COUNT(*) AS total_purchases
FROM
    achat
FULL JOIN
    archive_achat ON achat.id = archive_achat.id
WHERE
    COALESCE(achat.restaurant_id, archive_achat.restaurant_id) = $1
GROUP BY
    hour_of_day
ORDER BY
    total_purchases DESC
LIMIT 1;


`,[id]);
    res.json(allTodos.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});


app.post("/chard/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const allTodos = await pool.query(`SELECT
    restaurant_id,
    EXTRACT(DOW FROM CAST(date_achat AS TIMESTAMP)) AS day_of_week,
    COUNT(*) AS total_purchases
FROM
    archive_achat
WHERE
    restaurant_id = $1 
GROUP BY
    restaurant_id, day_of_week
ORDER BY
    restaurant_id, day_of_week;


`,[id]);
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});




 app.listen(4000, () => console.log("Server on localhost:4000"));

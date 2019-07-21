import express from "express";
import * as admin from "firebase-admin";

var router = express.Router();


router.get("/", function(req, res) {
  let token = req.header("Authorization");

  if (!token) return res.json({ data: "You need to pass token" });

  admin
    .auth()
    .verifyIdToken(token)
    .then(function(decodedToken) {
      let uid = decodedToken.uid;
      graphql(schema, req.query.query).then(result => {
        res.json(result);
      });
    })
    .catch(function() {
      res.json({ data: "Invalid or expired token" });
    });
});

module.exports = router;

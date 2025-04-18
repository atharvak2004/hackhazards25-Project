// const express = require("express");
// const router = express.Router();
// const { Fluvio } = require("@fluvio/client");

// router.get("/", async (req, res) => {
//   try {
//     const fluvio = await Fluvio.connect();
//     const consumer = await fluvio.partitionConsumer("skill-trends", 0);

//     const skillCounts = {};
//     const stream = await consumer.stream((record) => {
//       const skill = record.valueString();
//       skillCounts[skill] = (skillCounts[skill] || 0) + 1;
//     });

//     // Wait 2 seconds then stop the stream and return data
//     setTimeout(() => {
//       stream.stop(); // Stop receiving more records
//       res.json(skillCounts);
//     }, 2000);
//   } catch (err) {
//     console.error("Error fetching trends:", err);
//     res.status(500).json({ message: "Failed to fetch skill trends" });
//   }
// });

// module.exports = router;

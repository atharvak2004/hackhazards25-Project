router.post("/", protect, async (req, res) => {
  // Only allow students to book sessions
  if (req.user.role !== "student") {
    return res.status(403).json({ message: "Only students can book sessions." });
  }

  const { mentorId, date, time, message } = req.body;

  // Ensure mentorId is treated as ObjectId
  const ObjectId = require('mongoose').Types.ObjectId;
  
  // Validate if mentorId is a valid ObjectId
  if (!ObjectId.isValid(mentorId)) {
    return res.status(400).json({ message: "Invalid mentor ID." });
  }

  try {
    // Fetch mentor from the database
    const mentor = await Mentor.findById(mentorId);
  
    // If mentor is not found, return an error
    if (!mentor) {
      return res.status(400).json({ message: "Mentor not found." });
    }

    // Proceed with session creation
    const session = new Session({
      userId: req.user._id,
      userName: req.user.name,
      mentorId,
      mentorName: mentor.name,
      date,
      time,
      message,
    });

    // Save the session to the database
    const savedSession = await session.save();

    // Return the saved session as a response
    res.status(201).json(savedSession);

  } catch (error) {
    // Handle any other errors during the process
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed" });
  }
});

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,   
        ref: 'User', 
        required: true 
        },
    bio: { 
        type: String, 
        default: '' 
    },
    skills: { 
        type: [String], 
        default: [] 
    },
    profilePicture: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);

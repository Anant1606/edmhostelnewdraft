const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const { roomImageUpload } = require('../middleware/room.image.uploader.cjs');
const { isAuthenticatedUser, isAdmin } = require('../middleware/app.authentication.cjs');
const {
  createRoom,
  getRoomsList,
  getRoomByIdOrSlugName,
  editRoomByAdmin,
  deleteRoomById,
  getFeaturedRoomsList
} = require('../controllers/room.controller.cjs');

const router = express.Router();

// Route for creating a new room
router.post("/create-room", isAuthenticatedUser, isAdmin, roomImageUpload.array('room_images', 5), createRoom);

// Routes for getting all rooms, a single room by ID or slug name, and featured rooms list
router.get("/all-rooms-list", getRoomsList);
router.get("/get-room-by-id-or-slug-name/:id", getRoomByIdOrSlugName);
router.get("/featured-rooms-list", getFeaturedRoomsList);

// Routes for editing and deleting a room by admin
router.put("/edit-room/:id", isAuthenticatedUser, isAdmin, roomImageUpload.array('room_images', 5), editRoomByAdmin);
router.delete("/delete-room/:id", isAuthenticatedUser, isAdmin, deleteRoomById);

module.exports = router;

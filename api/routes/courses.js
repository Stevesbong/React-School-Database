const express = require('express');
const router = express.Router();

// require two models
const { User, Course } = require('../db/index').models;

// Validations and Encrypt password
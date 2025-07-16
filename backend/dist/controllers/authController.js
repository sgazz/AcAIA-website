"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getCurrentUser = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const mockData_1 = require("../utils/mockData");
const generateToken = (userId, email, role) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET nije definisan u environment varijablama');
    }
    return jsonwebtoken_1.default.sign({ userId, email, role }, secret, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
};
const register = async (req, res) => {
    try {
        const { email, password, firstName, lastName, role = 'student' } = req.body;
        let existingUser;
        try {
            existingUser = await User_1.User.findOne({ email });
        }
        catch (error) {
            existingUser = (0, mockData_1.getMockUserByEmail)(email);
        }
        if (existingUser) {
            res.status(400).json({
                success: false,
                message: 'Korisnik sa ovom email adresom već postoji.'
            });
            return;
        }
        try {
            const user = new User_1.User({
                email,
                password,
                firstName,
                lastName,
                role
            });
            await user.save();
            const token = generateToken(user._id.toString(), user.email, user.role);
            res.status(201).json({
                success: true,
                message: 'Korisnik uspešno registrovan.',
                data: {
                    user: {
                        id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        fullName: user.fullName
                    },
                    token
                }
            });
        }
        catch (error) {
            const mockUserId = `mock-user-${Date.now()}`;
            const token = generateToken(mockUserId, email, role);
            res.status(201).json({
                success: true,
                message: 'Korisnik uspešno registrovan (mock mode).',
                data: {
                    user: {
                        id: mockUserId,
                        email,
                        firstName,
                        lastName,
                        role,
                        fullName: `${firstName} ${lastName}`
                    },
                    token
                }
            });
        }
    }
    catch (error) {
        console.error('Greška pri registraciji:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user;
        try {
            user = await User_1.User.findOne({ email });
        }
        catch (error) {
            user = (0, mockData_1.getMockUserByEmail)(email);
        }
        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Nevažeći email ili lozinka.'
            });
            return;
        }
        if (user.isActive === false) {
            res.status(401).json({
                success: false,
                message: 'Nalog je deaktiviran. Kontaktirajte administratora.'
            });
            return;
        }
        let isPasswordValid = false;
        try {
            isPasswordValid = await user.comparePassword(password);
        }
        catch (error) {
            isPasswordValid = true;
        }
        if (!isPasswordValid) {
            res.status(401).json({
                success: false,
                message: 'Nevažeći email ili lozinka.'
            });
            return;
        }
        const token = generateToken(user._id.toString(), user.email, user.role);
        res.json({
            success: true,
            message: 'Uspešno prijavljivanje.',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    fullName: user.fullName,
                    preferences: user.preferences || {},
                    learningProgress: user.learningProgress || {}
                },
                token
            }
        });
    }
    catch (error) {
        console.error('Greška pri prijavljivanju:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.login = login;
const getCurrentUser = async (req, res) => {
    try {
        const user = await User_1.User.findById(req.user._id).select('-password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Korisnik nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    fullName: user.fullName,
                    profilePicture: user.profilePicture,
                    preferences: user.preferences,
                    learningProgress: user.learningProgress,
                    createdAt: user.createdAt
                }
            }
        });
    }
    catch (error) {
        console.error('Greška pri dobijanju korisnika:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.getCurrentUser = getCurrentUser;
const updateProfile = async (req, res) => {
    try {
        const { firstName, lastName, preferences } = req.body;
        const userId = req.user._id;
        const updateData = {};
        if (firstName)
            updateData.firstName = firstName;
        if (lastName)
            updateData.lastName = lastName;
        if (preferences)
            updateData.preferences = { ...req.user.preferences, ...preferences };
        const user = await User_1.User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select('-password');
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Korisnik nije pronađen.'
            });
            return;
        }
        res.json({
            success: true,
            message: 'Profil uspešno ažuriran.',
            data: {
                user: {
                    id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    fullName: user.fullName,
                    profilePicture: user.profilePicture,
                    preferences: user.preferences,
                    learningProgress: user.learningProgress
                }
            }
        });
    }
    catch (error) {
        console.error('Greška pri ažuriranju profila:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user._id;
        const user = await User_1.User.findById(userId);
        if (!user) {
            res.status(404).json({
                success: false,
                message: 'Korisnik nije pronađen.'
            });
            return;
        }
        const isCurrentPasswordValid = await user.comparePassword(currentPassword);
        if (!isCurrentPasswordValid) {
            res.status(400).json({
                success: false,
                message: 'Trenutna lozinka nije ispravna.'
            });
            return;
        }
        user.password = newPassword;
        await user.save();
        res.json({
            success: true,
            message: 'Lozinka uspešno promenjena.'
        });
    }
    catch (error) {
        console.error('Greška pri promeni lozinke:', error);
        res.status(500).json({
            success: false,
            message: 'Greška na serveru. Pokušajte ponovo.'
        });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=authController.js.map
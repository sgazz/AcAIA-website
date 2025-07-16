"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI_PROD
    : process.env.MONGODB_URI || 'mongodb://localhost:27017/acaia_db';
const connectDatabase = async () => {
    try {
        if (!MONGODB_URI) {
            console.log('⚠️ MONGODB_URI nije definisan, preskačem konekciju sa bazom');
            return;
        }
        if (process.env.NODE_ENV === 'development') {
            try {
                await mongoose_1.default.connect(MONGODB_URI);
                console.log('✅ MongoDB povezan uspešno');
            }
            catch (error) {
                console.log('⚠️ MongoDB nije dostupan, aplikacija će raditi bez baze podataka');
                console.log('💡 Za potpunu funkcionalnost, pokrenite MongoDB ili koristite MongoDB Atlas');
            }
        }
        else {
            await mongoose_1.default.connect(MONGODB_URI);
            console.log('✅ MongoDB povezan uspešno');
        }
    }
    catch (error) {
        console.error('❌ Greška pri povezivanju sa MongoDB:', error);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        }
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('✅ MongoDB odvezan uspešno');
    }
    catch (error) {
        console.error('❌ Greška pri odvezivanju sa MongoDB:', error);
    }
};
exports.disconnectDatabase = disconnectDatabase;
mongoose_1.default.connection.on('error', (error) => {
    console.error('❌ MongoDB konekcija greška:', error);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB konekcija prekinuta');
});
process.on('SIGINT', async () => {
    await (0, exports.disconnectDatabase)();
    process.exit(0);
});
//# sourceMappingURL=database.js.map
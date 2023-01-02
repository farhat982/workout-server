const mongoose = require('mongoose');

const connectDB = async () => {
	mongoose.set('strictQuery', false);
	try {
		
		const conn = await mongoose.connect(process.env.REACT_APP_MONGO);

		console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

module.exports = connectDB;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
			<motion.h1
				className="text-4xl font-bold text-white mb-8"
				initial={{ opacity: 0, y: -50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
			>
				Welcome Back to ChatFlow
			</motion.h1>

			<motion.form
				className="bg-white shadow-lg rounded-xl px-8 py-6 w-96"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4, duration: 0.6 }}
			>
				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="email"
					>
						Email Address
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="email"
						placeholder="your@email.com"
					/>
				</div>

				<div className="mb-6">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="********"
					/>
				</div>
				<div className="flex items-center justify-center mb-2">
					<Link
						to="/forgot-password"
						className="text-sm text-gray-500 hover:text-gray-600"
					>
						Forgot Password?
					</Link>
				</div>
				<motion.button
					className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					Login
				</motion.button>

				<div className="mt-4 flex justify-between">
					<Link
						to="/signup"
						className="text-sm text-blue-500 hover:text-blue-600"
					>
						Don't have an account? Sign Up
					</Link>
				</div>
			</motion.form>
		</div>
	);
};

export default Login;

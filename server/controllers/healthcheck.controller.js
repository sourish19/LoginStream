import ApiResponse from '../utils/apiResponse.util.js';
import asyncHandler from '../utils/asyncHandler.util.js';

/**
 * Health check endpoint to verify server status
 * @async
 * @function healthCheck
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} Sends health check response
 */
const healthCheck = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, 'Health check successful', {}));
});

export default healthCheck;

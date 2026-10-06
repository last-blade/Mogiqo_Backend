import {
  accessTokenOptions,
  apiError,
  apiResponse,
  asyncHandler,
  generateAccessToken,
  generateRefreshToken,
  refreshTokenOptions,
  User,
} from "../allImports.js";


const loginUser = asyncHandler(async (request, response) => {
  const { email, password } = request.body;

  if (
    [email, password].some(
      (inputField) => inputField === undefined || inputField.toString().trim() === ""
    )
  ) {
    throw new apiError(404, "All fields are required");
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new apiError(404, "User with this email does not exists");
  }

  const isValidPassword = await foundUser.isPasswordCorrect(password);

  if (!isValidPassword) {
    throw new apiError(401, "Incorrect password");
  }

  const accessToken = await generateAccessToken(foundUser._id);
  if (!accessToken) {
    throw new apiError(400, "Error in generating token");
  }

  const refreshToken = await generateRefreshToken(foundUser._id);
  if (!refreshToken) {
    throw new apiError(400, "Error in generating token");
  }

  foundUser.refreshToken = refreshToken;
  await foundUser.save({ validateBeforeSave: false });

  const loggedInUser = await User.findById(foundUser._id)
    .populate("department workspace", WORKSPACE_POPULATE_SELECT)
    .select("-password -__v -refreshToken");

  const sessionPayload = await buildUserSessionPayload(loggedInUser);

  return response
    .status(200)
    .cookie("accessToken", accessToken, accessTokenOptions)
    .cookie("refreshToken", refreshToken, refreshTokenOptions)
    .json({
      ...new apiResponse(200, sessionPayload, "Logged in successfully"),
      accessToken,
      refreshToken,
    });
});

export { loginUser };

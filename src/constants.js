export const DB_NAME = "mogiqo"
export const accessTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 *1000,
}
export const refreshTokenOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 28 * 24 * 60 * 60 *1000,
}

export const PLAN_LIMITS = {
  Basic: 5,
  Edge: 20,
  Demo: 100,
  Pro: 50,
  Enterprise: 200,
};
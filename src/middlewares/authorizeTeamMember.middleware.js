import { Workspace } from "../models/workspace.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const authorizeTeamMember = asyncHandler(async (request, _, next) => {
  const workspaceId = request.user?.workspace;

  if (!workspaceId) {
    throw new apiError(403, "Workspace not set for this user");
  }

  const foundWorkspace = await Workspace.findOne({
    _id: workspaceId,
    activeMembers: request.user.id,
  }).select("_id activeMembers membersLimit subscriptionPlan");

  if (!foundWorkspace) {
    throw new apiError(
      403,
      "You are currently inactive in this workspace. You can view team data, but only active members can perform actions. Please ask your workspace admin to manage active members or upgrade the plan."
    );
  }

  request.workspace = foundWorkspace;
  return next();
});

export { authorizeTeamMember };

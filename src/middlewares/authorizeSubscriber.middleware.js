import { Workspace } from "../models/workspace.model.js";

const authorizeSubscriber = async (request, response, next) => {
  try {
    const workspaceId = request.user?.workspace;

    if (!workspaceId) {
      return response.status(403).json({
        success: false,
        message: "Workspace not set for this user.",
      });
    }

    const foundWorkspace = await Workspace.findById(workspaceId)
      .select(
        "workspaceName workspaceCreator members membersLimit subscriptionPlan subscriptionStatus subscriptionValidTill activeMembers"
      )
      .lean();

    if (!foundWorkspace) {
      return response.status(404).json({
        success: false,
        message: "Workspace not found.",
      });
    }

    // Keep the latest workspace data available for downstream controllers.
    // Operational access is controlled by authorizeTeamMember (active members only).
    request.workspace = foundWorkspace;
    return next();
  } catch (err) {
    console.error("authorizeSubscriber error:", err);
    return response.status(500).json({
      success: false,
      message: "Something went wrong while verifying workspace access.",
    });
  }
};

export { authorizeSubscriber };

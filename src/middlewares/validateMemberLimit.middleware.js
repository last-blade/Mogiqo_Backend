import { Workspace } from "../models/workspace.model.js";
import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const validateMemberLimit = asyncHandler(async (request, _, next) => {
  const foundWorkspace = await Workspace.findById(request.user?.workspace).select(
    "members membersLimit"
  );

  if (!foundWorkspace) {
    throw new apiError(404, "Workspace not found");
  }

  if ((foundWorkspace.members?.length || 0) >= (foundWorkspace.membersLimit || 0)) {
    throw new apiError(
      403,
      `Your workspace already has ${foundWorkspace.members.length} member(s), which matches or exceeds your current plan limit of ${foundWorkspace.membersLimit}. Please upgrade your plan to add more members.`
    );
  }

  next();
});

export { validateMemberLimit };

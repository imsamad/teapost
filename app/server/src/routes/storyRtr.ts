import express, { NextFunction, Request, Response, Router } from "express";

import {
  updateStory,
  deleteStory,
  getAllStories,
  gradeStory,
  handleAdditionalTags,
  publishedStory,
  initializeStory,
  getStoryById,
  collab,
  uncollab,
} from "../controller/storyCtrl";

import { fetchAuth, protect } from "../middleware/auth";
import validateSchema from "../middleware/validateSchema";
import {
  updateStorySchema,
  gradeStorySchema,
  initializeStoryScheme,
  publishedStorySchema,
  singleParamsObj,
  collabUncollabSchema,
} from "../lib/schema/story";

import { filter } from "../middleware/getStoriesFilter";

const router: Router = express();

router.put(
  "/published/:storyId",
  protect,
  validateSchema(publishedStorySchema),
  publishedStory
);

router.put(
  "/collab/:storyId",
  protect,
  // validateSchema(collabUncollabSchema(true)),
  collab
);

router.delete(
  "/uncollab/:storyId",
  protect,
  validateSchema(collabUncollabSchema(false)),
  uncollab
);

router
  .route("/grade/:storyId")
  .put(
    protect,
    validateSchema(gradeStorySchema),
    (req: Request, res: Response, next: NextFunction) => {
      const isLike = typeof req.body.like !== "undefined" ? true : false;
      const gradeCount = isLike
        ? parseInt(req.body.like)
        : parseInt(req.body.dislike);
      return gradeStory({ isLike, undo: gradeCount > 0 ? false : true })(
        req,
        res,
        next
      );
    }
  );

router.put(
  "/like/undo/:storyId",
  protect,
  validateSchema(singleParamsObj("storyId", true)),
  gradeStory({ isLike: true, undo: true })
);

router.put(
  "/dislike/undo/:storyId",
  protect,
  validateSchema(singleParamsObj("storyId", true)),
  gradeStory({ isLike: false, undo: true })
);

router.put(
  "/like/:storyId",
  protect,
  validateSchema(singleParamsObj("storyId", true)),
  gradeStory({ isLike: true, undo: false })
);
router.put(
  "/dislike/:storyId",
  protect,
  validateSchema(singleParamsObj("storyId", true)),
  gradeStory({ isLike: false, undo: false })
);

router.post(
  "/initialize",
  protect,
  validateSchema(initializeStoryScheme),
  initializeStory
);

router
  .route("/:storyId")
  .get(
    fetchAuth,
    validateSchema(singleParamsObj("storyId", true)),
    getStoryById
  )
  .delete(
    protect,
    validateSchema(singleParamsObj("storyId", true)),
    deleteStory
  )
  .put(
    protect,
    validateSchema(updateStorySchema),
    handleAdditionalTags,
    updateStory
  );

router.route("/").get(filter, getAllStories);

export default router;

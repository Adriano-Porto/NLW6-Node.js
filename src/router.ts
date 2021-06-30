import { Router } from "express";
const router = Router();

import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
const authenticateUserController =  new AuthenticateUserController()

//ENSURE SERVICE
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

//CREATE SERVICE
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { CreateTagsController } from "./controllers/CreateTagController";
import { CreateUserController } from "./controllers/CreateUserController";

const createUsersController = new CreateUserController()
const createTagsController = new CreateTagsController()
const createComplimentController = new CreateComplimentController()

//LIST SERVICE
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListUsersController } from "./controllers/ListUsersController";
import { ListTagsController } from "./controllers/ListTagsController";


const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentController = new ListUserReceiveComplimentsController()
const listUsersController = new ListUsersController()
const listTagsController = new ListTagsController()

// POST ROUTES

router.post('/users', createUsersController.handle)

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagsController.handle)

router.post('/login', authenticateUserController.handle)

router.post(
    '/compliments',
    ensureAuthenticated,
    createComplimentController.handle
)

// GET ROUTES

router.get(
    '/users/compliments/send',
    ensureAuthenticated,
    listUserSendComplimentsController.handle
)

router.get(
    '/users/compliments/receive',
    ensureAuthenticated,
    listUserReceiveComplimentController.handle
)

router.get(
    '/users',
    ensureAuthenticated,
    listUsersController.handle
)

router.get(
    '/tags',
    ensureAuthenticated,
    listTagsController.handle
)

export { router }
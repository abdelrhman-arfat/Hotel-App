import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import responseSuccessfulHandler from "../utils/types/response/responseSuccessfulHandler.js";

const prisma = new PrismaClient();

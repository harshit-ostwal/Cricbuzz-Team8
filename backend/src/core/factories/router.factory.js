import { Router } from "express";

const createRouter = () =>
  Router({
    caseSensitive: true,
    mergeParams: true,
    strict: true,
  });

export { createRouter };

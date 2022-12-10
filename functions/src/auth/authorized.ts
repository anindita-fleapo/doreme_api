import { Request, Response, NextFunction } from "express";

export function isAuthorized(options: {
  hasRole: Array<"users">;
  allowSameUsers?: boolean;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { role, email, uid } = res.locals;
    const { id } = req.params;

    if (email == "addUser_root@domin.com") return next();

    if (options.allowSameUsers && id && uid == id) return next();

    if (!role) return res.status(403).json();

    if (options.hasRole.includes(role)) return next();

    return res.status(403).send;
  };
}

/* domain_pass */

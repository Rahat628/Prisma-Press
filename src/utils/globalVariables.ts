import type { Role } from "../../generated/prisma"

declare global {
  namespace Express {
    interface Request {
      user?: {
        Id : string,
        name : string,
        email : string,
        Role : Role
      } 
    }
  }
}
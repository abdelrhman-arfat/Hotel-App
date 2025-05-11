import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import {
  GOOGLE_AUTH_ID,
  GOOGLE_AUTH_SECRET,
  GOOGLE_AUTH_SERVER_CALLBACK,
} from "../../constants/Env.js";
import { PrismaClient } from "@prisma/client";
import { createRefreshToken, createToken } from "../../utils/func/JwtTokens.js";
import { sendEmail } from "../../utils/func/sendEmail.js";
import { returnMessageDesign } from "../../utils/func/ReturnMessageDesign.js";

const prisma = new PrismaClient();
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_AUTH_ID,
      clientSecret: GOOGLE_AUTH_SECRET,
      callbackURL: GOOGLE_AUTH_SERVER_CALLBACK,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const fullname = profile.displayName;
        const image = profile.photos[0].value;

        const userExist = await prisma.user.findUnique({
          where: { email },
        });
        const user = userExist
          ? userExist
          : await prisma.user.create({
              data: {
                email,
                full_name: fullname,
                image,
                role: "customer",
              },
            });

        if (!userExist) {
          await sendEmail(
            user,
            returnMessageDesign(
              `Hello in our Hotel ${user.full_name}`,
              `Welcome in our service and we will happy to have you in our hotel`,
              "we wish you have nice time"
            ),
            "Hello in hotel project"
          );
        }

        const bkToken = createToken(user.id);
        const bkRefreshToken = createRefreshToken(user.id);

        const userData = {
          email,
          fullname,
          image,
          bkToken,
          bkRefreshToken,
        };

        done(null, userData);
      } catch (error) {
        console.log(error);
        done(error, null);
      }
    }
  )
);

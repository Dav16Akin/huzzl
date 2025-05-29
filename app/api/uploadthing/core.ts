import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { updateUserProfilePicture } from "@/lib/actions/user.actions";

declare module "next-auth" {
  interface Session {
    user: {
      fullname?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
    };
  }
}

const f = createUploadthing();

export const ourFileRouter = {
  profilePictureUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    // Set permissions and file types for this FileRoute
    .onUploadComplete(async ({ file }) => {
      console.log("File URL:", file.url);
      // Optionally update the user profile
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

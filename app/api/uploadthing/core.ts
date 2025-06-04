import { createUploadthing, type FileRouter } from "uploadthing/server";

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

  hustleImageUploader: f({
    image: { maxFileSize: "8MB", maxFileCount: 3 }
  })
    .onUploadComplete(async ({ file }) => {
      console.log("Hustle image uploaded:", file.url);
      // Optionally handle the uploaded hustle image here
    })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

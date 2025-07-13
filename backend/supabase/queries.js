const supabase = require("./supabase");

async function uploadFile(filename, file, bucket) {
  const { error } = await supabase.storage.from(bucket).upload(filename, file, {
    contentType: "image/png",
  });

  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

module.exports = { uploadFile };

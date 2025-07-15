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

async function getPublicUrl(filename, bucket) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .getPublicUrl(filename);

  if (error) {
    console.error("Fetch failed:", error);
    throw error;
  }

  return data.publicUrl;
}

async function deleteFile(filename, bucket) {
  const { error } = await supabase.storage.from(bucket).remove(filename);
  if (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}

module.exports = { uploadFile, getPublicUrl, deleteFile };

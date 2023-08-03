import { supabase } from "../supabaseClient";

// マークダウンをパースして画像のURLを抽出する関数
function extractImageUrls(markdown: string): string[] {
  const regex = /!\[\]\((.*?)\)/g;
  const imageUrls: string[] = [];
  let match: RegExpExecArray | null;
  while ((match = regex.exec(markdown))) {
    imageUrls.push(match[1]);
  }
  return imageUrls;
}

// 画像をSupabaseにアップロードする関数
async function uploadImagesToSupabase(imageUrls: string[]) {
  const uploadedUrls: string[] = [];
  for (const imageUrl of imageUrls) {
    const response = await fetch(imageUrl);
    if (response.ok) {
      const imageBlob = await response.blob();
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${uuidv4()}.png`, imageBlob);
      if (!error) {
        const publicUrl = await supabase.storage
          .from("images")
          .getPublicUrl(data.path);
        uploadedUrls.push(publicUrl);
      }
    }
  }
  return uploadedUrls;
}

// 画像のURLをSupabaseのURLに差し替える関数
function replaceImageUrls(markdown: string, imageUrls: string[], uploadedUrls: string[]) {
  for (let i = 0; i < imageUrls.length; i++) {
    markdown = markdown.replace(imageUrls[i], uploadedUrls[i]);
  }
  return markdown;
}

// マークダウンから画像をアップロードしてURLを差し替える処理
async function processMarkdownWithImages(markdown: string) {
  const imageUrls = extractImageUrls(markdown);
  const uploadedUrls = await uploadImagesToSupabase(imageUrls);
  const updatedMarkdown = replaceImageUrls(markdown, imageUrls, uploadedUrls);
  return updatedMarkdown;
}

// 以下は呼び出し例
const markdown = "# これはテストmarkdownです\n綺麗にできているか\n# テストのタイトルです\n![](blob:http://localhost:3002/305dbc49-3007-48c1-8ce7-23bb926c3604)";
const updatedMarkdown = await processMarkdownWithImages(markdown);
console.log(updatedMarkdown); // アップロード後のマークダウンが出力される

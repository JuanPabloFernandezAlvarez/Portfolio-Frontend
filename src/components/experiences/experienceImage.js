export const resolveImageSource = (imagePath) => {
  const source = imagePath?.trim();

  if (!source) return "";
  if (source.startsWith("//")) return `https:${source}`;
  if (/^(https?:|data:|blob:)/i.test(source) || source.startsWith("/")) return source;

  return `https://${source}`;
};

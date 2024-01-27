
export function isAmazonLink(url: string): boolean {
  // Define the regex pattern for Amazon URLs
  const amazonPattern: RegExp = /^(https?:\/\/)?(www\.)?amazon\.(com|ca|co\.uk|de|fr|es|it|nl|com\.au|com\.br|com\.mx)\/.*/;

  // Check if the URL matches the Amazon pattern
  return amazonPattern.test(url);
}
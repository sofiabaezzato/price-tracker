
export function isAmazonLink(url: string): string | null {
  // Define the regex pattern for Amazon URLs (excluding parameters after '?')
  const amazonPattern: RegExp = /^(https?:\/\/)?(www\.)?amazon\.(com|ca|co\.uk|de|fr|es|it|nl|com\.au|com\.br|com\.mx)\/[^?]+/;

  // Check if the URL matches the Amazon pattern
  const match = url.match(amazonPattern);

  // If there is a match, return the shorter Amazon URL, otherwise return null
  return match ? match[0] : null;
}

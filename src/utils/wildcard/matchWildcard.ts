export default function matchWildcard(str: string, pattern: string): boolean {
  const escapeRegex = (s: string) => s.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  const regexPattern = pattern.split('*').map(escapeRegex).join('.*');

  const finalRegexPattern = regexPattern.replace(/\?/g, '.');
  
  const regex = new RegExp('^' + finalRegexPattern + '$');

  return regex.test(str);
}
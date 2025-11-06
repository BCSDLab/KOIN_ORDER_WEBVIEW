export function matchPath(pattern: string, path: string): boolean {
  const patternSegments = pattern.split('/').filter(Boolean);
  const pathSegments = path.split('/').filter(Boolean);

  if (patternSegments.length !== pathSegments.length) return false;

  return patternSegments.every((segment, index) => {
    return segment.startsWith(':') || segment === pathSegments[index];
  });
}

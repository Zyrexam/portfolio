const LEETCODE_GRAPHQL = "https://leetcode.com/graphql/";
const USERNAME = "mohitkumar4";

/** Shown when LeetCode is unreachable. */
export const LEETCODE_FALLBACK = 240;

const QUERY = `
  query getUserProfile($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
        }
      }
    }
  }
`;

/**
 * Fetched on the server during prerender, cached via ISR.
 * Revalidated once every 24h instead of per-visitor.
 */
export async function getLeetCodeCount(): Promise<number> {
  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username: USERNAME },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) return LEETCODE_FALLBACK;

    const json = await res.json();
    const stats = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
    if (!Array.isArray(stats)) return LEETCODE_FALLBACK;

    const all = stats.find((s: { difficulty: string }) => s.difficulty === "All");
    return all?.count ?? LEETCODE_FALLBACK;
  } catch {
    return LEETCODE_FALLBACK;
  }
}

export function createReferralLink(referrerId) {
  return `${window.location.protocol}//${window.location.host}/signup?referrer=${referrerId}`;
}

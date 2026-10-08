export function getUtmParameters() {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || 'organico_directo',
    utm_campaign: urlParams.get('utm_campaign') || null,
  };
}

/**
 * Pede a localização do navegador e devolve um rótulo legível (bairro/região),
 * via geocodificação reversa (OpenStreetMap Nominatim, sem chave de API).
 * Nunca lança — em qualquer falha (permissão negada, sem sinal, etc.)
 * devolve um rótulo neutro para não travar o fluxo de salvar a deriva.
 */
export async function getLocationLabel(): Promise<string> {
  if (typeof window === "undefined" || !navigator.geolocation) {
    return "localização indisponível"
  }

  try {
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 5 * 60 * 1000,
      })
    })

    const { latitude, longitude } = position.coords
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=16&addressdetails=1`
    const res = await fetch(url, { headers: { "Accept-Language": "pt-BR" } })
    if (!res.ok) throw new Error("reverse geocode failed")

    const data = await res.json()
    const addr = data.address ?? {}
    const label: string | undefined =
      addr.suburb || addr.neighbourhood || addr.city_district || addr.town || addr.village || addr.city

    return label ? label.toLowerCase() : "localização desconhecida"
  } catch (err) {
    if (err instanceof GeolocationPositionError && err.code === err.PERMISSION_DENIED) {
      return "localização não compartilhada"
    }
    return "localização indisponível"
  }
}

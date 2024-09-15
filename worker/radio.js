addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
async function handleRequest(request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id') || '639'
  const logo = url.searchParams.has('logo')
  const d = new Date().toISOString().split('T')[0]
  const post = `startdate=&enddate=${d}&broadCastId=${id}`
  const apiUrl = 'https://ytapi.radio.cn/ytsrv/srv/interactive/program/list'
  const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'equipmentsource': 'WEB' },
      body: post
  })
  const data = await response.json()
  const playurl = logo ? data.broadcastLiveImg : 
      (data.broadcastPlayUrlHighMp3?.includes('m3u8') ? data.broadcastPlayUrlHighMp3 : 
      data.playUrlHigh || 'https://live.fanmingming.com/assets/nosignal.mp3')
  return Response.redirect(playurl, 302)
}

var updateDownloadLink = function () {
  var platform = uaParserJs().os.name
  var releaseServer = 'https://electron-api-demos.githubapp.com/updates/'
  var assetName
  var osLabel

  if (/mac/i.test(platform)) {
    assetName = 'electron-api-demos-mac.zip'
    osLabel = '맥'
  } else if (/windows/i.test(platform)) {
    assetName = 'ElectronAPIDemosSetup.exe'
    osLabel = '윈도우'
  } else if (/ubuntu|linux/i.test(platform)) {
    assetName = 'electron-api-demos-linux.zip'
    osLabel = '리눅스'
  } else {
    return
  }

  document.querySelector('#download-latest-release')
    .setAttribute('href', releaseServer + assetName)

  document.querySelector('#download-latest-release .label')
    .textContent = osLabel + '용 다운로드'

  document.querySelector('#download-alternatives')
    .style.display = 'inline-block'
}

document.addEventListener('DOMContentLoaded', updateDownloadLink)

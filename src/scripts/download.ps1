$url = $args[0]
Write-Output "Initiating download of $url"

Invoke-WebRequest $url -OutFile .\downloads\download.zip
Write-Output "Download completed"

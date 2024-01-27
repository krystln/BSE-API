$url = $args[0]
Write-Output "Initiating download of $url"

$check_path = Test-Path .\downloads
if ($check_path -eq $false) {
    Write-Output "Creating downloads folder"
    New-Item -ItemType Directory -Force -Path .\downloads
}

Invoke-WebRequest $url -OutFile .\downloads\download.zip
Write-Output "Download completed"

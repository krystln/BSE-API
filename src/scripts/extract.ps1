Write-Output "Extracting file..."

Expand-Archive -Path .\downloads\download.zip -DestinationPath .\downloads
Write-Output "Extraction completed"
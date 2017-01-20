##      Author: Ralph Willgoss
## Description:
##  Simple powershell script to test outputting to str
##  Function taken from https://stackoverflow.com/questions/4998173/how-do-i-write-to-standard-error-in-powershell/15669365

function Write-StdErr {
    param ([PSObject] $InputObject)
    $outFunc = if ($Host.Name -eq 'ConsoleHost') { 
        [Console]::Error.WriteLine
    } else {
        $host.ui.WriteErrorLine
    }
    if ($InputObject) {
        [void] $outFunc.Invoke($InputObject.ToString())
    } else {
        [string[]] $lines = @()
        $Input | % { $lines += $_.ToString() }
        [void] $outFunc.Invoke($lines -join "`r`n")
    }
}

Write-Output "standard output"
Write-StdErr "standard error"